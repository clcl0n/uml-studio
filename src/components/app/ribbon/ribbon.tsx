import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './ribbon.scss';
import NavTools from './nav-tools';
import RibbonOperationEnum from '@enums/ribbonOperationEnum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import { canvasZoomIn, canvasZoomOut } from '@store/actions/ribbon.action';
import Options from '../common/options';
import Aggregation from '../canvas/diagrams/class-diagram/relationship-heads/aggregation';
import Composition from '../canvas/diagrams/class-diagram/relationship-heads/composition';
import Extension from '../canvas/diagrams/class-diagram/relationship-heads/extension';
import Direction from '@enums/direction';
import Association from '../canvas/diagrams/class-diagram/relationship-heads/association';
import ClassDiagramRelationshipTypesEnum from '@enums/classDiagramRelationshipTypesEnum';
import useCanvasDefaultRelationshipType from 'hooks/useCanvasDefaultRelationshipType';
import ClassElements from './class-elements/classElements';
import useDiagram from 'hooks/useDiagram';
import DiagramTypeEnum from '@enums/diagramTypeEnum';
import StateElements from './state-elements/stateElements';
import { serializeCCXML } from '@utils/serializeCCXML';
import { saveAs } from 'file-saver';
import { serializeSCXML } from '@utils/serializeSCXML';
import { parseStringPromise } from 'xml2js';
import { parseStateDiagram } from '@utils/scxmlParser';
import { addNewStateElement, addNewFinalStateElement, addNewInitialStateElement, clearFinalStateElements, clearInitialStateElements, clearStateElements } from '@store/actions/stateDiagram.action';
import { addNewRelationshipSegment, addNewRelationship, addNewElementEntry, addNewElement, clearRelationshipSegments, clearRelationships, clearElementEntries, clearElements } from '@store/actions/classDiagram.action';
import { setDiagramType } from '@store/actions/canvas.action';
import { parseClassDiagram } from '@utils/ccxmlParser';

const Ribbon = () => {  
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(true);
    const { x: canvasWidth, y: canvasHeight } = useSelector((store: IStoreState) => store.canvas.canvasDimensions);
    const canvasZoom: number = useSelector((state: IStoreState) => state.ribbon.canvasZoom);
    const { canvasDefaultRelationshipType, setCanvasDefaultRelationshipType } = useCanvasDefaultRelationshipType();
    const { diagramType, classDiagram, stateDiagram } = useDiagram();

    const relationshipTypes = [ 
        ClassDiagramRelationshipTypesEnum.AGGREGATION,
        ClassDiagramRelationshipTypesEnum.ASSOCIATION,
        ClassDiagramRelationshipTypesEnum.COMPOSITION,
        ClassDiagramRelationshipTypesEnum.EXTENSION 
    ];
    const relationshipOptions = () => {
        return relationshipTypes.map((relationshipType, index) => {
            switch (relationshipType) {
                case ClassDiagramRelationshipTypesEnum.AGGREGATION:
                return (
                    <svg key={index} height='20' width='30'>
                        <Aggregation direction={Direction.RIGHT} coordinates={{ x: 0, y: 10 }}/>
                    </svg>
                );
            case ClassDiagramRelationshipTypesEnum.COMPOSITION:
                return (
                    <svg key={index} height='20' width='30'>
                        <Composition direction={Direction.RIGHT} coordinates={{ x: 0, y: 10 }}/>;
                    </svg>
                );
            case ClassDiagramRelationshipTypesEnum.EXTENSION:
                return (
                    <svg key={index} height='20' width='30'>
                        <Extension direction={Direction.RIGHT} coordinates={{ x: 0, y: 10 }}/>;
                    </svg>
                );
            case ClassDiagramRelationshipTypesEnum.ASSOCIATION:
                return (
                    <svg key={index} height='20' width='30'>
                        <Association direction={Direction.RIGHT} coordinates={{ x: 10, y: 10 }}/>;
                    </svg>
                );
            }
        });
    };
    const onRelationshipHeadSelect = (index: number) => {
        setCanvasDefaultRelationshipType(relationshipTypes[index]);
    };
    const zoomStep = 5;

    const getDiagramElements = () => {
        if (diagramType === DiagramTypeEnum.NONE) {
            return <div/>;
        } else {
            return diagramType === DiagramTypeEnum.CLASS ? (
                <ClassElements/>
            ) : (
                <StateElements/>
            );
        }
    };

    const getRelationsipOptions = () => {
        return diagramType === DiagramTypeEnum.CLASS ? (
            <Options
                defaultSelectedOptionIndex={relationshipTypes.findIndex((type) => type === canvasDefaultRelationshipType)}
                onSelectNewOption={(optionIndex) => onRelationshipHeadSelect(optionIndex)}
            >
                {relationshipOptions()}
            </Options>
        ) : <div/>;
    };

    const save = () => {
        if (diagramType === DiagramTypeEnum.CLASS) {
            const xml = serializeCCXML(classDiagram);
            const xmlBlob = new Blob([xml], {
                type: 'text/plain;charset=utf-8'
            });
            saveAs(xmlBlob, 'ccxml.xml');
        } else {
            const xml = serializeSCXML(stateDiagram, classDiagram);
            const xmlBlob = new Blob([xml], {
                type: 'text/plain;charset=utf-8'
            });
            saveAs(xmlBlob, 'scxml.xml');
        }
    };

    const load = async (xml: string) => {
        dispatch(clearFinalStateElements());
        dispatch(clearInitialStateElements());
        dispatch(clearStateElements());
        dispatch(clearRelationships());
        dispatch(clearRelationshipSegments());
        dispatch(clearElements());
        dispatch(clearElementEntries());
        const parsedXml = (await parseStringPromise(xml));

        if (parsedXml.scxml) {
            const {
                newStateElements,
                newFinalStateElements,
                newRelationShipSegments,
                newRelationShips,
                newInitialStateElement,
                newInitialStateElements,
                isValid,
                error,
                warning
            } = await parseStateDiagram(parsedXml.scxml, { x: canvasWidth, y: canvasHeight });
            if (isValid) {
                newStateElements.forEach((newStateElement) => {
                    dispatch(addNewStateElement(newStateElement));
                });
                newFinalStateElements.forEach((newFinalStateElement) => {
                    dispatch(addNewFinalStateElement(newFinalStateElement));
                });
                newRelationShipSegments.forEach((segment) => {
                    dispatch(addNewRelationshipSegment(segment));
                });
                newRelationShips.forEach((relationship) => {
                    dispatch(addNewRelationship(relationship));
                });
                if (newInitialStateElement) {
                    dispatch(addNewInitialStateElement(newInitialStateElement));
                }
                newInitialStateElements.forEach(e => {
                    dispatch(addNewInitialStateElement(e));
                });
                dispatch(setDiagramType(DiagramTypeEnum.STATE));
                setIsActive(false);
            } else {
                error !== '' ? alert(error) : alert(warning);
            }
        } else if (parsedXml.ccxml) {
            const {
                newElements,
                newRelationShipSegments,
                newRelationShips,
                newEntries
            } = await parseClassDiagram(parsedXml.ccxml, { x: canvasWidth, y: canvasHeight });
            newEntries.forEach((newEntry) => {
                dispatch(addNewElementEntry(newEntry));
            });
            newElements.forEach((newElement) => {
                dispatch(addNewElement(newElement));
            });
            newRelationShipSegments.forEach((newRelationShipSegment) => {
                dispatch(addNewRelationshipSegment(newRelationShipSegment));
            });
            newRelationShips.forEach((newRelationShip) => {
                dispatch(addNewRelationship(newRelationShip));
            });
            dispatch(setDiagramType(DiagramTypeEnum.CLASS));
            setIsActive(false);
        }
    };

    const onFileUpload = (event: React.FormEvent<HTMLInputElement>) => {
        event.persist();
        const file = (event.target as any).files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            load(e.target.result.toString());
        };
        reader.readAsText(file);
    };
    
    const clearFileInput = (ev: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        (ev.target as any).value = null;
    };

    return (
        <div id='ribbon'>
            <NavTools/>
            <div id='controlls'>
                <div id='tools'>
                    <a className='button is-small is-text'>
                        <FontAwesomeIcon size='lg' icon='print'/>
                    </a>  
                    <a onClick={() => save()} className='button is-small is-text'>
                        <FontAwesomeIcon icon='save'/>
                    </a>
                    <a className='button is-small is-text'>
                        <FontAwesomeIcon icon='undo'/>
                    </a>
                    <a className='button is-small is-text'>
                        <FontAwesomeIcon icon='redo'/>
                    </a>
                    <a onClick={(ev) => dispatch(canvasZoomIn(zoomStep))} className='button is-small is-text'>
                        <FontAwesomeIcon icon='search-plus'/>
                    </a>
                    <a className='button is-small is-text'>
                        {`${canvasZoom}%`}
                    </a>
                    <a onClick={(ev) => dispatch(canvasZoomOut(zoomStep))} className='button is-small is-text'>
                        <FontAwesomeIcon icon='search-minus'/>
                    </a>
                    <div className='file is-small'>
                        <label className='file-label'>
                            <input onClick={(ev) => clearFileInput(ev)} onChange={(ev) => onFileUpload(ev)} className='file-input' type='file' name='resume' accept='.xml'/>
                            <span className='file-cta'>
                                <span className='file-icon'>
                                    <FontAwesomeIcon icon='upload'/>
                                </span>
                                <span className='file-label'>Choose a file...</span>
                            </span>
                        </label>
                    </div>  
                    {getRelationsipOptions()}
                </div>
                {getDiagramElements()}
            </div>
        </div>
    );
};

export default Ribbon;