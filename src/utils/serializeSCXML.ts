import IStateDiagramState from '@interfaces/state-diagram/IStateDiagramState';
import IClassDiagramState from '@interfaces/class-diagram/IClassDiagramState';
import ISCXMLState from '@interfaces/scxml/ISCXMLState';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import ISCXMLTransition from '@interfaces/scxml/ISCXMLTransition';
import ICSXMLFinal from '@interfaces/scxml/ICSXMLFinal';
import IFinalStateElement from '@interfaces/state-diagram/final-state/IFinalStateElement';
import ISCXML from '@interfaces/scxml/ISCXML';
import { Builder } from 'xml2js';
import ICSXMLInitial from '@interfaces/scxml/ICSXMLInitial';
import IInitialStateElement from '@interfaces/state-diagram/initial-state/IInitialStateElement';

const getInitialStateElements = (stateDiagram: IStateDiagramState): Array<IInitialStateElement> => {
    return stateDiagram.initialStateElements.allIds.map(id => stateDiagram.initialStateElements.byId[id]);
};

const getStateElements = (stateDiagram: IStateDiagramState): Array<IStateElement> => {
    return stateDiagram.elements.allIds.map(id => stateDiagram.elements.byId[id]);
};

const getFinalStateElements = (stateDiagram: IStateDiagramState): Array<IFinalStateElement> => {
    return stateDiagram.finalStateElements.allIds.map(id => stateDiagram.finalStateElements.byId[id]);
};

const getElementName = (stateDiagram: IStateDiagramState, id: string) => {
    if(stateDiagram.elements.allIds.includes(id)) {
        return stateDiagram.elements.byId[id].data.name;
    } else if (stateDiagram.finalStateElements.allIds.includes(id)) {
        return stateDiagram.finalStateElements.byId[id].name;
    } 
    // else if (stateDiagram.initialStateElements.allIds.includes(id)) {
    //     return stateDiagram.initialStateElements.byId[id].;
    // }
};

const getStateTransitions = (classDiagram: IClassDiagramState, stateDiagram: IStateDiagramState, elementId: string): Array<ISCXMLTransition> => {
    return classDiagram.relationships.allIds
        .filter(id => classDiagram.relationships.byId[id].fromElementId === elementId)
        .map(id => classDiagram.relationships.byId[id])
        .map((relationship): ISCXMLTransition => {
            const segmentsCoord = relationship.segmentIds.map((segmentId) => {
                const segment = classDiagram.relationshipSegments.byId[segmentId];

                return `${segment.x}:${segment.y}:${segment.lineToX}:${segment.lineToY}:${segment.isStart}:${segment.isEnd}:${segment.direction.toLowerCase()}:${segment.id}:${segment.fromSegmentId}:${segment.toSegmentId}`;
            });

            return {
                $: {
                    target: getElementName(stateDiagram, relationship.toElementId),
                    event: relationship.relationshipValue,
                    type: relationship.type.toLocaleLowerCase(),
                    direction: relationship.direction.toLocaleLowerCase(),
                    headCoord: `${relationship.head.x}:${relationship.head.y}`,
                    tailCoord: `${relationship.tail.x}:${relationship.tail.y}`,
                    segments: segmentsCoord.join(';')
                }
            };
        });
};

export const serializeSCXML = (stateDiagram: IStateDiagramState, classDiagram: IClassDiagramState) => {
    const scxmlStates: Array<ISCXMLState> = getStateElements(stateDiagram).map((state): ISCXMLState => {
        return {
            $: {
                id: state.data.name,
                x: state.graphicData.frame.xCenter.toString(),
                y: state.graphicData.frame.yCenter.toString()
            },
            invoke: [],
            onentry: [],
            onexit: [],
            transition: getStateTransitions(classDiagram, stateDiagram, state.id)
        };
    });
    const scxmlFinalStates: Array<ICSXMLFinal> = getFinalStateElements(stateDiagram).map((finalState): ICSXMLFinal => {
        return {
            $: {
                id: finalState.name,
                x: finalState.graphicData.x.toString(),
                y: finalState.graphicData.y.toString()
            },
            donedata: [],
            onentry: [],
            onexit: []
        };
    });
    const scxmlInitialStates: Array<ICSXMLInitial> = getInitialStateElements(stateDiagram).map((initialState): ICSXMLInitial => {
        return {
            $: {
                id: initialState.name,
                x: initialState.graphicData.x.toString(),
                y: initialState.graphicData.y.toString()
            },
            donedata: [],
            onentry: [],
            onexit: [],
            transition: getStateTransitions(classDiagram, stateDiagram, initialState.id)
        };
    });

    const initialElement = stateDiagram.initialStateElements.byId[stateDiagram.initialStateElements.allIds[0]];

    const newSCXML: ISCXML = {
        $: {
            initial: initialElement ? initialElement.name : '',
            name: 'Scxml',
            version: '1.0',
            xmlns: 'http://www.w3.org/2005/07/scxml',
            coordinates: 'true'
        },
        parallel: [],
        final: scxmlFinalStates,
        state: scxmlStates,
        initial: scxmlInitialStates
    };

    const builder = new Builder({
        rootName: 'scxml'
    });
    return builder.buildObject(newSCXML);
};