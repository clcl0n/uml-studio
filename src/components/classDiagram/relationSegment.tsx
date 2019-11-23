import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IRelationSegment from '@interfaces/elements/IRelationSegment';

function RelationSegment(props: IRelationSegment) {
    return (
        <path stroke='black' d={`M ${props.x} ${props.y} l ${props.lineToX} ${props.lineToY}`}/>
    )
}

export default RelationSegment;