import { parseStringPromise } from 'xml2js';
import ICoordinates from '@interfaces/ICoordinates';
import ISCXML from '@interfaces/scxml/ISCXML';
import ISCXMLState from '@interfaces/scxml/ISCXMLState';
import { createNewStateElementFromSCXML, createNewFinalStateElement, createNewInitialStateElement } from './elements/stateElement';
import ISCXMLTransition from '@interfaces/scxml/ISCXMLTransition';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import ISCXMLParallel from '@interfaces/scxml/ISCXMLParallel';
import ICSXMLFinal from '@interfaces/scxml/ICSXMLFinal';
import IFinalStateElement from '@interfaces/state-diagram/final-state/IFinalStateElement';
import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';
import { createNewRelationship, createNewRelationshipSameLayerSCXML } from './elements/relationship';
import ClassDiagramRelationshipTypesEnum from '@enums/classDiagramRelationshipTypesEnum';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import Direction from '@enums/direction';
import IInitialStateElement from '@interfaces/state-diagram/initial-state/IInitialStateElement';
import { v4 } from 'uuid';
import SegmentDirection from '@enums/segmentDirection';
import ICSXMLInitial from '@interfaces/scxml/ICSXMLInitial';

export const parseStateDiagram =  async (scxml: ISCXML, canvasDimensions: ICoordinates) => {
    const newStateElements: Array<IStateElement> = [];
    const newFinalStateElements: Array<IFinalStateElement> = [];
    const newRelationShips: Array<IRelationship> = [];
    const newRelationShipSegments: Array<IRelationshipSegment> = [];
    const newInitialStateElements: Array<IInitialStateElement> = [];
    let newInitialStateElement: IInitialStateElement;
    const scxmlExistingStates: Array<string> = [];

    const canvasMiddle: ICoordinates = { x: canvasDimensions.x / 2, y: canvasDimensions.y / 2 };
    const coordinates: ICoordinates = { x: canvasMiddle.x, y: canvasMiddle.y };

    const layerDistance = 300;
    const elementDistance = 120;

    const { isValid, warning, error } = isSCXMLValid(scxml);

    try {
        if (scxml && isValid && !scxml.$.coordinates) {
            const scxmlStates = scxml.state ?? [];
            const scxmlParallels = scxml.parallel ?? [];
            const scxmlFinals = scxml.final ?? [];
            if (scxmlStates || scxmlParallels) {
                const { scxmlInitialState, newInitialStateElement: initialState } = createInitialDiagramState(scxml, coordinates);
                newInitialStateElement = createNewInitialStateElement({
                    x: coordinates.x - (layerDistance / 2),
                    y: coordinates.y
                }, 'initial').initialStateElement;
                const { relationship, relationshipSegments } = createNewRelationship(
                    ClassDiagramRelationshipTypesEnum.ASSOCIATION,
                    {
                        x1: coordinates.x - (layerDistance / 2) + newInitialStateElement.graphicData.r,
                        y1: newInitialStateElement.graphicData.y,
                        x2: initialState.type === StateDiagramElementsEnum.STATE ? 
                            (initialState as IStateElement).graphicData.frame.x : 
                            (initialState as IFinalStateElement).graphicData.x,
                        y2:  initialState.type === StateDiagramElementsEnum.STATE ? 
                        (initialState as IStateElement).graphicData.frame.y + (initialState as IStateElement).graphicData.rx : 
                        (initialState as IFinalStateElement).graphicData.y
                    },
                    newInitialStateElement.id,
                    initialState.id
                );
                newRelationShips.push(relationship);
                newRelationShipSegments.push(...relationshipSegments);
                if(initialState.type === StateDiagramElementsEnum.STATE) {
                    newStateElements.push(initialState as IStateElement);
                    scxmlExistingStates.push(scxmlInitialState.$.id);
                } else if (initialState.type === StateDiagramElementsEnum.FINAL_STATE) {
                    newFinalStateElements.push(initialState as IFinalStateElement);
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
                    const maxIterations = 3000000;
                    let i = 0;
                    while (elementsToAdd.length > 0) {
                        i++;
                        if (maxIterations === i) {
                            throw 'Timeout';
                        }
                        currentLayer = [];
                        coordinates.x += layerDistance;
                        let toAdd: Array<ISCXMLTransition> = [];
                        let transitionToAdd: Array<{
                            transition: ISCXMLTransition,
                            from: string;
                        }> = [];
                        previousLayer.forEach((scxmlState) => {
                            if (scxmlState.transition && scxmlState.transition.length > 0) {
                                const statesToAdd = scxmlState.transition.filter((transition) => elementsToAdd.findIndex((t) => t.$.id === transition.$.target) !== -1);
                                toAdd.push(...statesToAdd);
                                transitionToAdd.push(
                                    ...scxmlState.transition.map((s) => {
                                        return {
                                            transition: s,
                                            from: scxmlState.$.id
                                        };
                                    })
                                );
                                scxmlExistingStates.push(...statesToAdd.map((t) => t.$.target));
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
    
                    const existingStates = scxmlStates.map((scxmlState) => {
                        return {
                            name: scxmlState.$.id,
                            upOffset: 0,
                            downOffset: 0
                        };
                    });
                    scxmlStates.forEach((scxmlState) => {
                        let relationshipCenterOffsetUp = 0;
                        let relationshipCenterOffsetDown = 0;
                        const fromState = newStateElements.find((stateElement) => stateElement.data.name === scxmlState.$.id);
                        const { graphicData } = fromState;
                        const scxmlTransitions = scxmlState.transition;
                        const jointsOffsetY = (fromState.graphicData.frame.height - (fromState.graphicData.rx * 2)) / 3;
                        const out_1: ICoordinates = {
                            x: graphicData.frame.x + graphicData.frame.width,
                            y: graphicData.frame.y + graphicData.rx
                        };
                        const out_2: ICoordinates = {
                            x: graphicData.frame.x + graphicData.frame.width,
                            y: graphicData.frame.y + graphicData.frame.height - graphicData.rx
                        };
                        if (scxmlTransitions && scxmlTransitions.length > 0) {
                            scxmlTransitions.forEach((scxmlTransition) => {
                                let toStateElementPosition: Direction;
                                let toStateElementPositionY: Direction;
                                let toStateX = 0;
                                let fromStateX = 0;
                                let offsetJoin = 0;
                                const toStateElement = newStateElements.find((stateElement) => stateElement.data.name === scxmlTransition.$.target);
                                const toFinalStateElement = newFinalStateElements.find((finalStateElement) => finalStateElement.name === scxmlTransition.$.target);
                                if (toStateElement) {
                                    toStateX = toStateElement.graphicData.frame.x;
                                    fromStateX = fromState.graphicData.frame.x;
                                    toStateElementPositionY = fromState.graphicData.frame.y >= toStateElement.graphicData.frame.y ? Direction.UP : Direction.DOWN;
                                    toStateElementPosition = fromState.graphicData.frame.x > toStateElement.graphicData.frame.x ? Direction.LEFT : Direction.RIGHT;
                                } else {
                                    toStateX = toFinalStateElement.graphicData.x;
                                    fromStateX = fromState.graphicData.frame.x;
                                    toStateElementPositionY = fromState.graphicData.frame.y >= toFinalStateElement.graphicData.y ? Direction.UP : Direction.DOWN;
                                    toStateElementPosition = fromState.graphicData.frame.x > toFinalStateElement.graphicData.x ? Direction.LEFT : Direction.RIGHT;
                                }
                                let offsetRelation = 0;
                                if (toStateElementPositionY === Direction.UP) {
                                    if (toStateElementPosition === Direction.RIGHT) {
                                        if (relationshipCenterOffsetUp > -80) {
                                            relationshipCenterOffsetUp -= 15;
                                        }
                                        offsetRelation = relationshipCenterOffsetUp;
                                    } else {
                                        let t = existingStates.find((s) => s.name === scxmlTransition.$.target);
                                        if (t.upOffset < 80) {
                                            t.upOffset += 15;
                                        }
                                        offsetRelation = t.upOffset;
                                    }
                                } else {
                                    if (toStateElementPosition === Direction.RIGHT) {
                                        if (relationshipCenterOffsetDown > -80) {
                                            relationshipCenterOffsetDown -= 15;
                                        }
                                        offsetRelation = relationshipCenterOffsetDown;
                                    } else {
                                        let t = existingStates.find((s) => s.name === scxmlTransition.$.target);
                                        if (t.downOffset < 80) {
                                            t.downOffset += 15;
                                        }
                                        offsetRelation = t.downOffset;
                                    }
                                }
                                const snapPoint: ICoordinates = {
                                    x: toStateElement ? toStateElement.graphicData.frame.x : toFinalStateElement.graphicData.x - toFinalStateElement.graphicData.r2,
                                    y: 0
                                };
    
                                if (toStateElement) {
                                    offsetJoin = (toStateElement.graphicData.frame.height - (toStateElement.graphicData.rx * 2)) / 3;
                                    snapPoint.y = toStateElement.graphicData.frame.y + toStateElement.graphicData.rx;
                                } else if (toFinalStateElement) {
                                    snapPoint.y = toFinalStateElement.graphicData.y;
                                }
    
    
    
    
                                if (toStateX === fromStateX) {
                                    const { relationship, relationshipSegments } = createNewRelationship(
                                        ClassDiagramRelationshipTypesEnum.ASSOCIATION,
                                        {
                                            x1: toStateElementPosition === Direction.LEFT ? graphicData.frame.x : out_1.x,
                                            y1: toStateElementPosition === Direction.LEFT ? out_1.y + offsetJoin : 
                                                toStateElementPositionY === Direction.UP ? out_1.y : out_2.y,
                                            x2: toStateElement ? toStateX + toStateElement.graphicData.frame.width : toStateX + toFinalStateElement.graphicData.r2,
                                            y2: toStateElementPositionY === Direction.UP ? snapPoint.y + (offsetJoin * 3) : snapPoint.y
                                        },
                                        fromState.id,
                                        toStateElement ? toStateElement.id : toFinalStateElement.id,
                                        20
                                    );
                                    newRelationShips.push(relationship);
                                    newRelationShipSegments.push(...relationshipSegments);
                                } else {
                                    const { relationship, relationshipSegments } = createNewRelationship(
                                        ClassDiagramRelationshipTypesEnum.ASSOCIATION,
                                        {
                                            x1: toStateElementPosition === Direction.LEFT ? graphicData.frame.x : out_1.x,
                                            y1: toStateElementPosition === Direction.LEFT ? out_1.y + offsetJoin : 
                                                toStateElementPositionY === Direction.UP ? out_1.y : out_2.y,
                                            x2: toStateElementPosition === Direction.LEFT ? toStateElement ? toStateX + toStateElement.graphicData.frame.width : toStateX + toFinalStateElement.graphicData.r2 : snapPoint.x,
                                            y2: toStateElementPosition === Direction.LEFT ?
                                                toStateElementPositionY === Direction.UP ? snapPoint.y + (offsetJoin * 2) : snapPoint.y + offsetJoin : snapPoint.y
                                        },
                                        fromState.id,
                                        toStateElement ? toStateElement.id : toFinalStateElement.id,
                                        offsetRelation,
                                        scxmlTransition.$.event
                                    );
                                    newRelationShips.push(relationship);
                                    newRelationShipSegments.push(...relationshipSegments);
                                }
                            });
                        }
                    });
    
                }
            }
        } else if (scxml.$.coordinates === 'true') {
            scxml?.state?.forEach(e => {
                const stateElement = createNewStateElementFromSCXML(e, { x: Number.parseFloat(e.$.x), y: Number.parseFloat(e.$.y) });
                newStateElements.push(stateElement);
            });
            scxml?.final?.forEach(e => {
                const { finalStateElement } = createNewFinalStateElement({ x: Number.parseFloat(e.$.x), y: Number.parseFloat(e.$.y) }, e.$.id);
               newFinalStateElements.push(finalStateElement); 
            });
    
            const createRelationships = (element: ISCXMLState | ICSXMLInitial) => {
                element?.transition?.forEach(t => {
                    const fromElement = newStateElements.find(e => e.data.name === element.$.id)?.id ?? newInitialStateElements.find(e => e.name === element.$.id).id;
                    const toElement = newStateElements.find(e => e.data.name === t.$.target);
                    const toFinalElement = newFinalStateElements.find(e => e.name === t.$.target);
                    const relationshipId = v4();
                    const headCoord: ICoordinates = { x: Number.parseFloat(t.$.headCoord.split(':')[0]), y: Number.parseFloat(t.$.headCoord.split(':')[1]) }; 
                    const tailCoord: ICoordinates = { x: Number.parseFloat(t.$.tailCoord.split(':')[0]), y: Number.parseFloat(t.$.tailCoord.split(':')[1]) };
                    const relationshipSegmentIds: Array<string> = [];
                    
                    const segments = t.$.segments.split(';');
    
                    segments.forEach((segment) => {
                        const segmentSplit = segment.split(':');
                        const x = Number.parseFloat(segmentSplit[0]);
                        const y = Number.parseFloat(segmentSplit[1]);
                        const lineToX = Number.parseFloat(segmentSplit[2]);
                        const lineToY = Number.parseFloat(segmentSplit[3]);
                        const isStart = segmentSplit[4] === 'true';
                        const isEnd = segmentSplit[5] === 'true';
                        const direction = segmentSplit[6].toUpperCase() as SegmentDirection;
                        const newId = segmentSplit[7];
                        const fromElementId = segmentSplit[8];
                        const toElementId = segmentSplit[9];
                        newRelationShipSegments.push({
                            id: newId,
                            x,
                            y,
                            lineToX,
                            lineToY,
                            isEnd,
                            isStart,
                            direction,
                            relationshipId,
                            fromSegmentId: fromElementId,
                            toSegmentId: toElementId
                        });
                        relationshipSegmentIds.push(newId);
                    });
    
    
                    newRelationShips.push({
                        id: relationshipId,
                        fromElementId: fromElement,
                        toElementId: toElement ? toElement.id : toFinalElement.id,
                        direction: t.$.direction.toUpperCase() as Direction,
                        headValue: '',
                        tailValue: '',
                        relationshipValue: t.$.event,
                        segmentIds: relationshipSegmentIds,
                        type: t.$.type.toUpperCase() as ClassDiagramRelationshipTypesEnum,
                        head: headCoord,
                        tail: tailCoord
                    });
                });
            };
    
            scxml?.initial?.forEach(e => {
                const { initialStateElement } = createNewInitialStateElement({
                    x: Number.parseFloat(e.$.x),
                    y: Number.parseFloat(e.$.y)
                }, e.$.id);
    
                newInitialStateElements.push(initialStateElement);
            });
    
            scxml?.state?.forEach(e => createRelationships(e));
            scxml?.initial?.forEach(e => createRelationships(e));
    
        } else {
            error !== '' ? console.error(error) : console.warn(warning);
        }
    } catch (ex) {
        return { 
            newStateElements,
            newFinalStateElements,
            newRelationShips,
            newRelationShipSegments,
            newInitialStateElements,
            newInitialStateElement,
            isValid: false,
            error: ex === 'Timeout' ? ex : 'Chyba v schéme XML súboru.',
        };
    }

    return { 
        newStateElements,
        newFinalStateElements,
        newRelationShips,
        newRelationShipSegments,
        newInitialStateElements,
        newInitialStateElement,
        isValid: true,
        error
    };
};

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
        newInitialStateElement = createNewFinalStateElement(coordinates, finalState.$.id).finalStateElement;
        scxmlInitialState = {
            $: {
                id: finalState.$.id,
                x: finalState.$.x,
                y: finalState.$.y
            },
            transition: [],
            invoke: [],
            onentry: [],
            onexit: []
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
        let final = scxmlFinal.find((final) => final.$.id === scxmlTransitions.$.target);
        const { finalStateElement } = createNewFinalStateElement(coordinates, final.$.id);
        newFinal = finalStateElement;
        targetedState = {
            $: {
                id: final.$.id,
                x: final.$.x,
                y: final.$.y
            },
            transition: [],
            invoke: [],
            onentry: [],
            onexit: []
        };
    }
    return {
        newState,
        scxmlState: targetedState,
        newFinal,
    };
};

const isSCXMLValid = (scxml: ISCXML) => {
    let error = '';
    let warning = '';
    let isValid = true;
    if (scxml.final) {
        if (scxml.final.some((final) => (final as any).transition)) {
            error = 'Final state cannot contain transition.';
            isValid = false;
        }
    } else {
        warning = 'SCXML have no final state.';
    }

    return {
        isValid,
        error,
        warning
    };
};