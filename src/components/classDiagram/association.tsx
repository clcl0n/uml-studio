import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IRelationElement from '@interfaces/elements/IRelationElement';

function Association(props: IRelationElement) {
    let segments = {};
    let height = 0;
    let width = 0;
    if (props.elementGraphicData.y1 < props.elementGraphicData.y2) {
        height = props.elementGraphicData.y2 - props.elementGraphicData.y1;
        width = props.elementGraphicData.x1 - props.elementGraphicData.x2;
        segments = 
            <g> 
                <path stroke='black' d={`M ${props.elementGraphicData.x1} ${props.elementGraphicData.y1} l ${-1 * width/2} ${0}`}/>
                <path stroke='black' d={`M ${props.elementGraphicData.x1 + -1 * (width / 2)} ${props.elementGraphicData.y1} l ${0} ${height}`}/>
                <path stroke='black' d={`M ${props.elementGraphicData.x1 + -1 * (width / 2)} ${props.elementGraphicData.y1 + height} l ${-1 * width/2} ${0}`}/>
            </g>;
    } else {
        height = props.elementGraphicData.y1 - props.elementGraphicData.y2;
        width = props.elementGraphicData.x1 - props.elementGraphicData.x2;
        segments = 
            <g>
                <path stroke='black' d={`M ${props.elementGraphicData.x1} ${props.elementGraphicData.y1} l ${-1 * width/2} ${0}`}/>
                <path stroke='black' d={`M ${props.elementGraphicData.x1 + -1 * (width / 2)} ${props.elementGraphicData.y1} l ${0} ${-height}`}/>
                <path stroke='black' d={`M ${props.elementGraphicData.x1 + -1 * (width / 2)} ${props.elementGraphicData.y1 + (-height)} l ${-1 * width/2} ${0}`}/>
            </g>;
    }

    return (
        <g>
             {segments}
        </g>
    );
}

export default Association;