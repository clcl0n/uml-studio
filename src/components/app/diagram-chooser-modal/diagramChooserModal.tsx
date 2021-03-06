import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDiagramType, setCanvasDimensions } from '@store/actions/canvas.action';
import DiagramTypeEnum from '@enums/diagramTypeEnum';
import  { parseStringPromise } from 'xml2js';
import { addNewStateElement, addNewFinalStateElement, addNewInitialStateElement } from '@store/actions/stateDiagram.action';
import IStoreState from '@interfaces/IStoreState';
import { parseStateDiagram } from '@utils/scxmlParser';
import { addNewRelationship, addNewRelationshipSegment, addNewElement, addNewElementEntry } from '@store/actions/classDiagram.action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parseClassDiagram } from '@utils/classxmlParse';
import { browserAlert } from '@utils/browserAlert';

const DiagramChooserModal = () => {
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(true);
    const [filename, setFilename] = useState<string>('');
    const { x: canvasWidth, y: canvasHeight } = useSelector((store: IStoreState) => store.canvas.canvasDimensions);

    const createNewClassDiagram = () => {
        dispatch(setDiagramType(DiagramTypeEnum.CLASS));
        setIsActive(false);
    };

    const createNewStateDiagram = () => {
        dispatch(setDiagramType(DiagramTypeEnum.STATE));
        setIsActive(false);
    };

    const openExistingDiagram = async (xml: string) => {
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
                newCanvasDimensions
            } = await parseStateDiagram(parsedXml.scxml, { x: canvasWidth, y: canvasHeight });
            dispatch(setCanvasDimensions(newCanvasDimensions));
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
                browserAlert(error);
            }
        } else if (parsedXml.classxml) {
            const {
                newElements,
                newRelationShipSegments,
                newRelationShips,
                newEntries,
                isValid,
                error,
                newCanvasDimensions
            } = await parseClassDiagram(parsedXml.classxml, { x: canvasWidth, y: canvasHeight });
            dispatch(setCanvasDimensions(newCanvasDimensions));

            if (isValid) {
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
            } else {
                browserAlert(error);
            }
        } else {
            browserAlert('Nepodporovaný XML formát.');
        }
    };

    const onFileUpload = (event: React.FormEvent<HTMLInputElement>) => {
        event.persist();
        const file = (event.target as any).files[0];
        const reader = new FileReader();
        setFilename(file.name);
        reader.onload = (e) => {
            openExistingDiagram(e.target.result.toString());
        };
        reader.readAsText(file);
    };
    
    const clearFileInput = (ev: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        (ev.target as any).value = null;
        setFilename('');
    };

    return (
        <div className={'modal' + (isActive ? ' is-active' : '')}>
            <div className='modal-background'/>
            <div className='modal-card'>
                <section className='modal-card-body'>
                    <div className="content">
                        <h2>Create new diagram</h2>
                        <div className='buttons is-centered'>
                            <button
                                className='button is-rounded'
                                onClick={() => createNewClassDiagram()} 
                            >
                                Class Diagram
                            </button>
                            <button
                                className='button is-rounded'
                                onClick={() => createNewStateDiagram()}
                            >
                                State Diagram
                            </button>
                        </div>
                        <h2>Load existing diagram</h2>
                        <div className='file is-centered'>
                            <label className='file-label'>
                                <input onClick={(ev) => clearFileInput(ev)} onChange={(ev) => onFileUpload(ev)} className='file-input' type='file' name='resume' accept='.xml'/>
                                <span className='file-cta'>
                                    <span className='file-icon'>
                                        <FontAwesomeIcon icon='upload'/>
                                    </span>
                                    <span className='file-label'>Choose a file...</span>
                                </span>
                                <span className='file-name' style={{ width: '300px' }}>
                                    {filename}
                                </span>
                            </label>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiagramChooserModal;