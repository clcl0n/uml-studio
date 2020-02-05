import React from 'react';
import ReactDOM from 'react-dom';
import StateElement from './state-element/stateElement';
import IStateDiagramState from '@interfaces/state-diagram/IStateDiagramState';

const StateDiagram = (props: { stateDiagram: IStateDiagramState }) => {
    const { stateDiagram } = props;
    let elements: Array<JSX.Element> = [];

    stateDiagram.elements.allIds.forEach((elementId) => {
        const element = stateDiagram.elements.byId[elementId];
        elements.push(
            <StateElement key={elementId} stateElement={element}/>
        );
    });

    return (
        <g>
            {...elements}
        </g>
    );
};

export default StateDiagram;