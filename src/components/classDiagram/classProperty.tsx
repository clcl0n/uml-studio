import * as React from 'react';
import * as ReactDOM from 'react-dom';

function ClassProperty(props: {index: number, x: number, y: number, xTest: number, rowHeight: number, width: number, fontPixelSize: number, name: string}) {
    return (
        <g>
            <g>
                <rect
                    className='test'
                    fill='none'
                    x={props.x}
                    y={(props.y + (props.index * props.rowHeight))}
                    width={props.width}
                    height={props.rowHeight}
                />
            </g>
            <text
                onClick={() => console.warn('text')}
                className='umlClassName'
                x={props.xTest}
                y={(props.y + (props.index * props.rowHeight) + props.fontPixelSize)}
            >
                {props.name}
            </text>
        </g>
    );
}

export default ClassProperty;