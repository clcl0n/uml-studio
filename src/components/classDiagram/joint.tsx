import * as React from 'react';
import * as ReactDOM from 'react-dom';

function Joint(props: { x: number, y: number, radius: number}) {
    return (
        <circle onClick={() => console.warn('circle')} key={1} cx={props.x} cy={props.y} r={props.radius}/>
    );
}

export default Joint;