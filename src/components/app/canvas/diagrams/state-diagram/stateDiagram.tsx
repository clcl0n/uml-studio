import React from 'react';
import ReactDOM from 'react-dom';
import StateElement from './state-element/stateElement';
import IStateDiagramState from '@interfaces/state-diagram/IStateDiagramState';
import InitialStateElement from './initial-state-element/initialStateElement';
import FinalStateElement from './final-state-element/finalStateElement';
import ForkElement from './fork-element/forkElement';
import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';
import JoinElement from './join-element/joinElement';
import ChoiceElement from './choice-element/choiceElement';
import Relationship from '../class-diagram/relationship/relationship';
import IClassDiagramState from '@interfaces/class-diagram/IClassDiagramState';

const StateDiagram = (props: { stateDiagram: IStateDiagramState, classDiagram: IClassDiagramState }) => {
    const { stateDiagram, classDiagram } = props;
    let elements: Array<JSX.Element> = [];

    stateDiagram.elements.allIds.forEach((elementId) => {
        const element = stateDiagram.elements.byId[elementId];
        elements.push(
            <StateElement key={elementId} stateElement={element}/>
        );
    });

    stateDiagram.initialStateElements.allIds.forEach((elementId) => {
        const initialStateElement = stateDiagram.initialStateElements.byId[elementId];
        elements.push(
            <InitialStateElement key={elementId} initialStateElement={initialStateElement}/>
        );
    });

    stateDiagram.finalStateElements.allIds.forEach((elementId) => {
        const finalStateElement = stateDiagram.finalStateElements.byId[elementId];
        elements.push(
            <FinalStateElement key={elementId} finalStateElement={finalStateElement}/>
        );
    });

    classDiagram.relationships.allIds.forEach((relationshipId) => {
        const relationship = classDiagram.relationships.byId[relationshipId];
        const relationshipSegments = relationship.segmentIds.map((segmentId) => classDiagram.relationshipSegments.byId[segmentId]);
        elements.push(
            <Relationship
                key={relationshipId}
                relationship={relationship}
                relationshipSegments={relationshipSegments}
            />
        );
    });

    if (classDiagram.newRelationship.relationship !== null) {
        elements.push(
            <Relationship
                key={elements.length + 1}
                relationship={classDiagram.newRelationship.relationship}
                relationshipSegments={classDiagram.newRelationship.relationshipSegments}
            />
        );
    }

    return (
        <g>
            {...elements}
        </g>
    );
};

export default StateDiagram;