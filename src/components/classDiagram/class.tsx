import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IClassProps } from '@interfaces/IClassProps';

function Class(props: IClassProps) {
    return (
        <g>
            <rect
                className='umlClassFrame'
                x={props.umlClassFrame.x}
                y={props.umlClassFrame.y}
                height={props.umlClassFrame.height}
                width={props.umlClassFrame.width}
            >
                <text className='umlClassName' x={props.umlClassName.x} y={props.umlClassName.y}>{props.umlClassName.text}</text>
                <line
                    className='nameAttrSeparator'
                    x1={props.separators.nameAttrSeparator.x1}
                    y1={props.separators.nameAttrSeparator.y1}
                    x2={props.separators.nameAttrSeparator.x2}
                    y2={props.separators.nameAttrSeparator.y2}
                />
            </rect>
        </g>
    );
}

export default Class;