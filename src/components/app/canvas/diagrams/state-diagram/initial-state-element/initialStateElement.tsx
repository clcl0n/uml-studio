import React from 'react';
import ReactDOM from 'react-dom';
import IInitialStateElement from '@interfaces/state-diagram/initial-state/IInitialStateElement';

const InitialStateElement = (props: { initialStateElement: IInitialStateElement }) => {
    const { initialStateElement } = props;
    const { graphicData } = initialStateElement;

    return (
        <g>
            <circle
                fill='black'
                x={graphicData.x}
                y={graphicData.y}
                r={graphicData.r}
            />
        </g>
    );
};

export default InitialStateElement;