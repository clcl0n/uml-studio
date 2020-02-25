import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDiagramType } from '@store/actions/canvas.action';
import DiagramTypeEnum from '@enums/diagramTypeEnum';
import { diagramTypeReducer } from '@store/reducers/canvas.reducers';
import  { parseString } from 'xml2js';
import ISCXMLState from '@interfaces/scxml/ISCXMLState';
import ISCXML from '@interfaces/scxml/ISCXML';
import { addNewStateElement, addNewFinalStateElement, addNewInitialStateElement } from '@store/actions/stateDiagram.action';
import { createNewStateElementFromSCXML } from '@utils/elements/stateElement';
import IStoreState from '@interfaces/IStoreState';
import ICoordinates from '@interfaces/ICoordinates';
import { parseStateDiagram } from '@utils/scxmlParser';
import { addNewRelationship, addNewRelationshipSegment } from '@store/actions/classDiagram.action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputFileSystem } from 'webpack';

const DiagramChooserModal = () => {
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(true);
    const { x: canvasWidth, y: canvasHeight } = useSelector((store: IStoreState) => store.canvas.canvasDimensions);

    const createNewClassDiagram = () => {
        dispatch(setDiagramType(DiagramTypeEnum.CLASS));
        setIsActive(false);
    };

    const createNewStateDiagram = () => {
        dispatch(setDiagramType(DiagramTypeEnum.STATE));
        setIsActive(false);
    };

    const createTargetState = () => {

    };

    const openExistingDiagram = async (xml: string) => {
        const {
            newStateElements,
            newFinalStateElements,
            newRelationShipSegments,
            newRelationShips,
            newInitialStateElement,
            isValid,
            error,
            warning
        } = await parseStateDiagram(xml, { x: canvasWidth, y: canvasHeight });
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
            dispatch(addNewInitialStateElement(newInitialStateElement));
            dispatch(setDiagramType(DiagramTypeEnum.STATE));
            setIsActive(false);
        } else {
            error !== '' ? alert(error) : alert(warning);
        }
    };

    const onFileUpload = (event: React.FormEvent<HTMLInputElement>) => {
        event.persist();
        const file = (event.target as any).files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            openExistingDiagram(e.target.result.toString());
        };
        reader.readAsText(file);
    };
    
    const clearFileInput = (ev: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        (ev.target as any).value = null;
    };

    return (
        <div className={'modal' + (isActive ? ' is-active' : '')}>
            <div className='modal-background'/>
            <div className='modal-card'>
                <section className='modal-card-body'>
                    <a
                        className='button'
                        onClick={() => createNewClassDiagram()} 
                    >
                        Create New Class Diagram
                    </a>
                    <a
                        className='button'
                        onClick={() => createNewStateDiagram()}
                    >
                        Create New State Diagram
                    </a>
                    <div className='file'>
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
                </section>
            </div>
            <button className='modal-close is-large' aria-label='close'/>
        </div>
    );
};

export default DiagramChooserModal;