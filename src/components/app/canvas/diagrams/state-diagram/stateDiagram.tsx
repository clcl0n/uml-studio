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

const StateDiagram = (props: { stateDiagram: IStateDiagramState }) => {
    const { stateDiagram } = props;
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

    stateDiagram.forkJoinElements.allIds.forEach((elementId) => {
        const forkJoinElement = stateDiagram.forkJoinElements.byId[elementId];
        if (forkJoinElement.type === StateDiagramElementsEnum.FORK) {
            elements.push(
                <ForkElement key={elementId} forkElement={forkJoinElement}/>
            );
        } else {
            elements.push(
                <JoinElement key={elementId} joinElement={forkJoinElement}/>
            );
        }
    });

    stateDiagram.choiceElements.allIds.forEach((elementId) => {
        const choiceElement = stateDiagram.choiceElements.byId[elementId];
        elements.push(
            <ChoiceElement key={elementId} choiceElement={choiceElement}/>
        );
    });

    return (
        <g>
            {...elements}
        </g>
    );
};

export default StateDiagram;