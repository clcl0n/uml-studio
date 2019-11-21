import * as React from 'react';
import * as ReactDOM from 'react-dom';

function Joint(props: { x: number, y: number, radius: number, onJointClick: any}) {
    return (
        <circle onClick={(ev) => props.onJointClick(ev)} key={1} cx={props.x} cy={props.y} r={props.radius}/>
    );
}

export default Joint;