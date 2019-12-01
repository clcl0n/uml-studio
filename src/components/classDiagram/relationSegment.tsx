import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ISegmentGraphicDat from '@interfaces/elements/segment/ISegmentGraphicData';

function RelationSegment(props: ISegmentGraphicDat) {
    return (
        <path stroke='black' d={`M ${props.x} ${props.y} l ${props.lineToX} ${props.lineToY}`}/>
    )
}

export default RelationSegment;