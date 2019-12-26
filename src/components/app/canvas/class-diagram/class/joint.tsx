import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ICoordinates from '@interfaces/ICoordinates';

const Joint = (props: ICoordinates & { radius: number, onJointClick: any }) => {
    return (
        <circle
            cx={props.x}
            cy={props.y}
            r={props.radius}
            onClick={(ev) => props.onJointClick(ev)}
        />
    );
};

export default Joint;