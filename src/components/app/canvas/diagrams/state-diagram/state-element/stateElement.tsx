import React from 'react';
import ReactDOM from 'react-dom';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';

const StateElement = (props: { stateElement: IStateElement }) => {
    const { stateElement } = props;
    const { graphicData } = stateElement;

    return (
        <rect
            fill='transparent'
            stroke='black'
            x={graphicData.x}
            y={graphicData.y}
            width={graphicData.width}
            height={graphicData.height}
            rx='20'
        />
    );
};

export default StateElement;