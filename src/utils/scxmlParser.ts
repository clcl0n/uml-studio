import { parseStringPromise } from 'xml2js';
import ICoordinates from '@interfaces/ICoordinates';
import IStoreState from '@interfaces/IStoreState';
import ISCXML from '@interfaces/scxml/ISCXML';
import ISCXMLState from '@interfaces/scxml/ISCXMLState';
import { createNewStateElementFromSCXML, createNewParallelStateElementFromSCXML, createNewFinalStateElement } from './elements/stateElement';
import { addNewStateElement } from '@store/actions/stateDiagram.action';
import ISCXMLTransition from '@interfaces/scxml/ISCXMLTransition';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import { initial } from 'lodash-es';
import ISCXMLParallel from '@interfaces/scxml/ISCXMLParallel';
import ICSXMLFinal from '@interfaces/scxml/ICSXMLFinal';
import IFinalStateElement from '@interfaces/state-diagram/final-state/IFinalStateElement';
import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';

export const parseStateDiagram = async (xml: string, canvasDimensions: ICoordinates) => {
    const newStateElements: Array<IStateElement> = [];
    const newFinalStateElements: Array<IFinalStateElement> = [];
    const scxmlExistingStates: Array<string> = [];

    const scxml: ISCXML = (await parseStringPromise(xml)).scxml;

    const canvasMiddle: ICoordinates = { x: canvasDimensions.x / 2, y: canvasDimensions.y / 2 };
    const coordinates: ICoordinates = { x: canvasMiddle.x, y: canvasMiddle.y };

    const layerDistance = 200;
    const elementDistance = 200;

    if (scxml) {
        const scxmlStates = scxml.state ?? [];
        const scxmlParallels = scxml.parallel ?? [];
        const scxmlFinals = scxml.final ?? [];
        if (scxmlStates || scxmlParallels) {
            const { scxmlInitialState, newInitialStateElement } = createInitialDiagramState(scxml, coordinates);
            if(newInitialStateElement.type === StateDiagramElementsEnum.STATE) {
                newStateElements.push(newInitialStateElement as IStateElement);
                scxmlExistingStates.push(scxmlInitialState.$.id);
            } else if (newInitialStateElement.type === StateDiagramElementsEnum.FINAL_STATE) {
                newFinalStateElements.push(newInitialStateElement as IFinalStateElement);
                scxmlExistingStates.push(scxmlInitialState.$.id);
            }

            if (scxmlStates) {
                let elementsToAdd = [
                    ...scxmlStates.filter((scxmlState) => scxmlExistingStates.indexOf(scxmlState.$.id) === -1),
                    ...scxmlParallels.filter((scxmlParallel) => scxmlExistingStates.indexOf(scxmlParallel.$.id) === -1),
                    ...scxmlFinals.filter((scxmlFinal) => scxmlExistingStates.indexOf(scxmlFinal.$.id) === -1)
                ];
                let previousLayer: Array<ISCXMLState> = [scxmlInitialState];
                let currentLayer: Array<ISCXMLState> = [];
                while (elementsToAdd.length > 0) {
                    currentLayer = [];
                    coordinates.x += layerDistance;
                    let toAdd: Array<ISCXMLTransition> = [];
                    previousLayer.forEach((scxmlState) => {
                        if (scxmlState.transition && scxmlState.transition.length > 0) {
                            const stateToAdd = scxmlState.transition.filter((transition) => elementsToAdd.findIndex((t) => t.$.id === transition.$.target) !== -1);
                            toAdd.push(...stateToAdd);
                            scxmlExistingStates.push(...stateToAdd.map((t) => t.$.target));
                            elementsToAdd = [
                                ...scxmlStates.filter((scxmlState) => scxmlExistingStates.indexOf(scxmlState.$.id) === -1),
                                ...scxmlParallels.filter((scxmlParallel) => scxmlExistingStates.indexOf(scxmlParallel.$.id) === -1),
                                ...scxmlFinals.filter((scxmlFinal) => scxmlExistingStates.indexOf(scxmlFinal.$.id) === -1)
                            ];
                        }
                    });
    
                    if (toAdd.length % 2 === 0) {
                        coordinates.y -= elementDistance * (toAdd.length / 2);
                    } else if (toAdd.length > 1) {
                        coordinates.y -= elementDistance * ((toAdd.length - 1) / 2);
                    }
    
                    toAdd.forEach((transition) => {
                        const { newState, scxmlState, newFinal } = createTargetedState(scxmlStates, scxmlParallels, scxmlFinals, transition, coordinates);
                        if (newState) {
                            newStateElements.push(newState);
                            coordinates.y += elementDistance + newState.graphicData.frame.height;
                        }
                        if (newFinal) {
                            newFinalStateElements.push(newFinal);
                            coordinates.y += elementDistance;
                        }
                        currentLayer.push(scxmlState);
                    });
                    coordinates.y = canvasMiddle.y;
                    previousLayer = currentLayer;
                }
            }
        }
    }

    return { 
        newStateElements,
        newFinalStateElements
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
    let newInitialStateElement;
    if (scxml.state) {
        if (scxml.$.initial) {
            scxmlInitialState = scxml.state.find((state) => state.$.id === scxml.$.initial);
        } else {
            scxmlInitialState = scxml.state[0];
        }
        newInitialStateElement = createNewStateElementFromSCXML(scxmlInitialState, coordinates);
    } else {
        let finalState;
        if (scxml.$.initial) {
            finalState = scxml.final.find((state) => state.$.id === scxml.$.initial);
        } else {
            finalState = scxml.final[0];
        }
        newInitialStateElement = createNewFinalStateElement(coordinates).finalStateElement;
        scxmlInitialState = {
            $: {
                id: finalState.$.id
            },
            transition: []
        };
    }
    
    return {
        newInitialStateElement,
        scxmlInitialState
    };
};

const createTargetedState = (scxmlStates: Array<ISCXMLState>, scxmlParallels: Array<ISCXMLParallel>, scxmlFinal: Array<ICSXMLFinal>, scxmlTransitions: ISCXMLTransition, coordinates: ICoordinates) => {
    let targetedState = scxmlStates.find((state) => state.$.id === scxmlTransitions.$.target);
    let newState;
    let newFinal;
    if (targetedState) {
        newState = createNewStateElementFromSCXML(targetedState, coordinates);
    } else {
        let parallel = scxmlParallels.find((state) => state.$.id === scxmlTransitions.$.target);
        if (parallel) {
            // drawParallelRow(parallel, coordinates);
            // newState = createNewParallelStateElementFromSCXML(parallel, coordinates);
            // targetedState = {
            //     $: {
            //         id: parallel.$.id
            //     },
            //     transition: parallel.transition ? parallel.transition : []
            // };
        } else {
            let final = scxmlFinal.find((final) => final.$.id === scxmlTransitions.$.target);
            const { finalStateElement } = createNewFinalStateElement(coordinates);
            newFinal = finalStateElement;
            targetedState = {
                $: {
                    id: final.$.id
                },
                transition: []
            };
        }
    }
    return {
        newState,
        scxmlState: targetedState,
        newFinal,
    };
};

const drawParallelRow = (csxmlParallel: ISCXMLParallel, coordinates: ICoordinates) => {
    const height = 0;
    const width = 0;

    const csxmlStates = csxmlParallel.state;
    const csxmlParallels = csxmlParallel.parallel;

    const { newInitialStateElement, scxmlInitialState } = createInitialDiagramState(
        {
            $: {},
            parallel: csxmlParallels,
            state: csxmlStates,
            final: []
        },
        coordinates
    );
    const result = drawDepending(csxmlStates.map((s) => s.$.id),scxmlInitialState,csxmlStates);
    return result;
};

const drawDepending = (toAdd: Array<string>, scxmlInitialState: ISCXMLState, scxmlStates: Array<ISCXMLState>) => {
    const scxmlExistingStates: Array<string> = [];
    let previousLayer: Array<ISCXMLState> = [scxmlInitialState];
    let currentLayer: Array<ISCXMLState> = [];
    while (toAdd.length > 0) {
        currentLayer = [];
        let addElements: Array<ISCXMLTransition> = [];

        previousLayer.forEach((scxmlState) => {
            if (scxmlState.transition && scxmlState.transition.length > 0) {
                const stateToAdd = scxmlState.transition.filter((transition) => toAdd.indexOf(transition.$.target) !== -1);
                addElements.push(...stateToAdd);
                scxmlExistingStates.push(...stateToAdd.map((t) => t.$.target));
                toAdd = scxmlStates.filter((scxmlState) => scxmlExistingStates.indexOf(scxmlState.$.id) === -1).map((s) => s.$.id);
            }
        });
        console.warn(toAdd);

        previousLayer = currentLayer;
    }
};