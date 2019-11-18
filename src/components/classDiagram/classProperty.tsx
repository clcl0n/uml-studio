import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IClassPropertyElementProps from '@interfaces/elements/class/IClassPropertyElementProps';

function ClassProperty(props: IClassPropertyElementProps) {
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