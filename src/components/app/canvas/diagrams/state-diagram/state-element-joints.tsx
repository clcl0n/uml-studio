import React from 'react';
import ReactDOM from 'react-dom';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import Joint from '../class-diagram/common/joint';

const StateElementJoints = (props: { stateElement: IStateElement }) => {
    const { stateElement } = props;
    const { graphicData } = stateElement;
    
    const leftJoints: Array<JSX.Element> = [];
    const rightJoints: Array<JSX.Element> = [];

    leftJoints.push(
        <Joint
            key='1'
            fromElementId={stateElement.id}
            radius={5}
            x={stateElement.graphicData.frame.x}
            y={stateElement.graphicData.frame.y + stateElement.graphicData.rx}
        />
    );

    leftJoints.push(
        <Joint
            key='2'
            fromElementId={stateElement.id}
            radius={5}
            x={graphicData.frame.x}
            y={graphicData.frame.y + graphicData.frame.height - graphicData.rx}
        />
    );

    const jointsOffsetY = (graphicData.frame.height - (graphicData.rx * 2)) / 3;

    leftJoints.push(
        <Joint
            key='3'
            fromElementId={stateElement.id}
            radius={5}
            x={stateElement.graphicData.frame.x}
            y={stateElement.graphicData.frame.y + stateElement.graphicData.rx + jointsOffsetY}
        />
    );

    leftJoints.push(
        <Joint
            key='4'
            fromElementId={stateElement.id}
            radius={5}
            x={stateElement.graphicData.frame.x}
            y={stateElement.graphicData.frame.y + stateElement.graphicData.rx + (jointsOffsetY * 2)}
        />
    );
    
    rightJoints.push(
        <Joint
            key='5'
            fromElementId={stateElement.id}
            radius={5}
            x={stateElement.graphicData.frame.x + graphicData.frame.width}
            y={stateElement.graphicData.frame.y + stateElement.graphicData.rx}
        />
    );

    rightJoints.push(
        <Joint
            key='6'
            fromElementId={stateElement.id}
            radius={5}
            x={graphicData.frame.x + graphicData.frame.width}
            y={graphicData.frame.y + graphicData.frame.height - graphicData.rx}
        />
    );


    rightJoints.push(
        <Joint
            key='7'
            fromElementId={stateElement.id}
            radius={5}
            x={stateElement.graphicData.frame.x + graphicData.frame.width}
            y={stateElement.graphicData.frame.y + stateElement.graphicData.rx + jointsOffsetY}
        />
    );

    rightJoints.push(
        <Joint
            key='8'
            fromElementId={stateElement.id}
            radius={5}
            x={stateElement.graphicData.frame.x + graphicData.frame.width}
            y={stateElement.graphicData.frame.y + stateElement.graphicData.rx + (jointsOffsetY * 2)}
        />
    );

    return (
        <g>
            {...leftJoints}
            {...rightJoints}
        </g>
    );
};

export default StateElementJoints;