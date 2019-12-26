import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IClassRowProps from '@interfaces/class-diagram/class/IClassRowProps';

const ClassRow = (props: IClassRowProps) => {
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
                className='umlClassName'
                x={props.xCenter}
                y={(props.y + (props.index * props.rowHeight) + props.fontPixelSize)}
            >
                {props.name}
            </text>
        </g>
    );
}

export default ClassRow;