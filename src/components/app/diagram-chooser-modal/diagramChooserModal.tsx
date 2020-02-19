import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDiagramType } from '@store/actions/canvas.action';
import DiagramTypeEnum from '@enums/diagramTypeEnum';
import { diagramTypeReducer } from '@store/reducers/canvas.reducers';
import  { parseString } from 'xml2js';
import ISCXMLState from '@interfaces/scxml/ISCXMLState';
import ISCXML from '@interfaces/scxml/ISCXML';
import { addNewStateElement, addNewFinalStateElement } from '@store/actions/stateDiagram.action';
import { createNewStateElementFromSCXML } from '@utils/elements/stateElement';
import IStoreState from '@interfaces/IStoreState';
import ICoordinates from '@interfaces/ICoordinates';
import { parseStateDiagram } from '@utils/scxmlParser';

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

    const openExistingDiagram = async () => {
        var xml = `<scxml name="Scxml" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initialstate="WorkFinished">
        <final id="WorkFinished"/>
    </scxml>`;

        const { newStateElements, newFinalStateElements } = await parseStateDiagram(xml, { x: canvasWidth, y: canvasHeight });
        newStateElements.forEach((newStateElement) => {
            dispatch(addNewStateElement(newStateElement));
        });
        newFinalStateElements.forEach((newFinalStateElement) => {
            dispatch(addNewFinalStateElement(newFinalStateElement));
        });
        dispatch(setDiagramType(DiagramTypeEnum.STATE));
        setIsActive(false);

        // parseString(xml, (err, result) => {
        //     if (result.scxml) {
        //         const scxml: ISCXML = result.scxml;
        //         if (scxml) {
        //             const states = scxml.state;
        //             if (states) {
        //                 let initialState;
        //                 if (scxml.$.initial) {
        //                     initialState = states.find((state) => state.$.id === scxml.$.initial);
        //                 } else {
        //                     initialState = states[0];
        //                 }

        //                 const coordinates: ICoordinates = { x: canvasWidth / 2, y: canvasHeight / 2 };

        //                 const initialStateElement = createNewStateElementFromSCXML(initialState, coordinates);
        //                 dispatch(addNewStateElement(initialStateElement));

        //                 const initialStateTransitionsLength = initialState.transition.length;
        //                 if (initialStateTransitionsLength === 1) {
        //                     coordinates.x += initialStateElement.graphicData.frame.width * 2;
        //                     initialState.transition.forEach((transition) => {
        //                         const targetState = states.find((state) => state.$.id === transition.$.target);
        //                         dispatch(addNewStateElement(createNewStateElementFromSCXML(targetState, coordinates)));
        //                     });
        //                 } else {
        //                     let firstUpLayerLength = 0;
        //                     let firstDownLayerLength = 0;
        //                     if (initialStateTransitionsLength % 2 === 0) {
        //                         firstUpLayerLength = initialStateTransitionsLength / 2;
        //                         firstDownLayerLength = initialStateTransitionsLength / 2;
        //                     } else {
        //                         firstUpLayerLength = (initialStateTransitionsLength - 1) / 2;
        //                         firstDownLayerLength = firstUpLayerLength + 1;
        //                     }
        //                     coordinates.x += initialStateElement.graphicData.frame.width * 2;
        //                     coordinates.y -= initialStateElement.graphicData.frame.height * 2;
        //                     let isDown = false;
        //                     const existingStates: Array<string> = [];
        //                     existingStates.push(initialState.$.id);
        //                     initialState.transition.forEach((transition, index) => {
        //                         if (index + 1 <= firstUpLayerLength) {
        //                             const targetState = states.find((state) => state.$.id === transition.$.target);
        //                             dispatch(addNewStateElement(createNewStateElementFromSCXML(targetState, coordinates)));
        //                             existingStates.push(targetState.$.id);
        //                             coordinates.x -= initialStateElement.graphicData.frame.width * 2;
        //                         } else {
        //                             if (!isDown) {
        //                                 coordinates.y += initialStateElement.graphicData.frame.height * 4;
        //                                 coordinates.x = (canvasWidth / 2) + initialStateElement.graphicData.frame.width * 2;
        //                             }
        //                             const targetState = states.find((state) => state.$.id === transition.$.target);
        //                             dispatch(addNewStateElement(createNewStateElementFromSCXML(targetState, coordinates)));
        //                             existingStates.push(targetState.$.id);
        //                             coordinates.x -= initialStateElement.graphicData.frame.width * 2;
        //                             isDown = true;
        //                         }
        //                     });
                            
        //                     //
        //                     let toDrawStates = states.filter((state) => existingStates.indexOf(state.$.id) === -1);
        //                     while (toDrawStates.length > 0) {
        //                         existingStates.forEach((existingState) => {
        //                             const s = states.find((state) => state.$.id === existingState);
        //                             s.transition.forEach((transition) => {
        //                                 if (existingStates.indexOf(transition.$.target) === -1) {
        //                                     const toDraw = states.find((state) => state.$.id === transition.$.target);
        //                                     dispatch(addNewStateElement(createNewStateElementFromSCXML(toDraw, coordinates)));
        //                                     existingStates.push(toDraw.$.id);
        //                                 }
        //                             });
        //                         });
        //                         toDrawStates = states.filter((state) => existingStates.indexOf(state.$.id) === -1);
        //                     }
        //                     // existingStates.
        //                 }
        //             }
        //         }
        //         dispatch(setDiagramType(DiagramTypeEnum.STATE));
        //         setIsActive(false);
        //     }
        // });
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
                    <a 
                        className='button'
                        onClick={() => openExistingDiagram()}
                    >
                        Open Existing Diagram
                    </a>
                </section>
            </div>
            <button className='modal-close is-large' aria-label='close'/>
        </div>
    );
};

export default DiagramChooserModal;