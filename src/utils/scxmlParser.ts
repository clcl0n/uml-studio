import { parseStringPromise } from 'xml2js';
import ICoordinates from '@interfaces/ICoordinates';
import IStoreState from '@interfaces/IStoreState';
import ISCXML from '@interfaces/scxml/ISCXML';
import ISCXMLState from '@interfaces/scxml/ISCXMLState';
import { createNewStateElementFromSCXML } from './elements/stateElement';
import { addNewStateElement } from '@store/actions/stateDiagram.action';
import ISCXMLTransition from '@interfaces/scxml/ISCXMLTransition';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import { initial } from 'lodash-es';

export const parseStateDiagram = async (xml: string, canvasDimensions: ICoordinates) => {
    const newStateElements: Array<IStateElement> = [];
    const scxmlExistingStates: Array<string> = [];

    const scxml: ISCXML = (await parseStringPromise(xml)).scxml;

    const canvasMiddle: ICoordinates = { x: canvasDimensions.x / 2, y: canvasDimensions.y / 2 };
    const coordinates: ICoordinates = { x: canvasMiddle.x, y: canvasMiddle.y };

    const layerDistance = 200;
    const elementDistance = 200;

    if (scxml) {
        const scxmlStates = scxml.state;
        if (scxmlStates) {
            const { scxmlInitialState, newInitialStateElement } = createInitialDiagramState(scxml, coordinates);
            newStateElements.push(newInitialStateElement);
            scxmlExistingStates.push(scxmlInitialState.$.id);

            let elementsToAdd = scxmlStates.filter((scxmlState) => scxmlExistingStates.indexOf(scxmlState.$.id) === -1);
            let previousLayer: Array<ISCXMLState> = [scxmlInitialState];
            let currentLayer: Array<ISCXMLState> = [];
            while (elementsToAdd.length > 0) {
                currentLayer = [];
                coordinates.x += layerDistance;
                let toAdd: Array<ISCXMLTransition> = [];
                previousLayer.forEach((scxmlState) => {
                    if (scxmlState.transition && scxmlState.transition.length > 0) {
                        const tmp = scxmlState.transition.filter((transition) => elementsToAdd.findIndex((t) => t.$.id === transition.$.target) !== -1);
                        toAdd.push(...tmp);
                        scxmlExistingStates.push(...tmp.map((t) => t.$.target));
                        elementsToAdd = scxmlStates.filter((scxmlState) => scxmlExistingStates.indexOf(scxmlState.$.id) === -1);
                    }
                });

                if (toAdd.length % 2 === 0) {
                    coordinates.y -= elementDistance * (toAdd.length / 2);
                } else if (toAdd.length > 1) {
                    coordinates.y -= elementDistance * ((toAdd.length - 1) / 2);
                }

                toAdd.forEach((transition) => {
                    const { newState, scxmlState } = createTargetedState(scxmlStates, transition, coordinates);
                    newStateElements.push(newState);
                    currentLayer.push(scxmlState);
                    coordinates.y += elementDistance;
                });
                coordinates.y = canvasMiddle.y;
                previousLayer = currentLayer;
            }
        }
    }

    return { 
        newStateElements
    };
};

// const createTargetedStates = (scxmlStates: Array<ISCXMLState>, scxmlTransitions: Array<ISCXMLTransition>, coordinates: ICoordinates) => {
//     const newTargetedStates: Array<IStateElement> = [];

//     scxmlTransitions.forEach((transition) => {
//         newTargetedStates.push(createTargetedState(scxmlStates, transition, coordinates));
//     });

//     return newTargetedStates;
// };

const createInitialDiagramState = (scxml: ISCXML, coordinates: ICoordinates) => {
    let scxmlInitialState: ISCXMLState;
    if (scxml.$.initial) {
        scxmlInitialState = scxml.state.find((state) => state.$.id === scxml.$.initial);
    } else {
        scxmlInitialState = scxml.state[0];
    }
    
    return {
        newInitialStateElement: createNewStateElementFromSCXML(scxmlInitialState, coordinates),
        scxmlInitialState
    };
};

const createTargetedState = (scxmlStates: Array<ISCXMLState>, scxmlTransitions: ISCXMLTransition, coordinates: ICoordinates) => {
    const targetedState = scxmlStates.find((state) => state.$.id === scxmlTransitions.$.target);
    return {
        newState: createNewStateElementFromSCXML(targetedState, coordinates),
        scxmlState: targetedState
    }
};