import * as React from 'react';
import * as ReactDOM from 'react-dom';

function ClassProperty(props: {x: number, y: number, width: number, height: number, textX: number}) {
    return (
        <g>
            <rect
                onClick={() => console.warn('rect')}
                className='test'
                fill='none'
                x={props.x}
                y={props.y}
                width={props.width}
                height={props.height}
            />
            <text onClick={() => console.warn('text')} className='umlClassName' x={props.textX} y={props.y + 12}>{'test'}</text>
        </g>
    );
}

export default ClassProperty;