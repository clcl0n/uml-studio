import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ISegmentGraphicDat from '@interfaces/elements/segment/ISegmentGraphicData';
import Direction from '@enums/Direction';
import IElementFunctionality from '@interfaces/elements/IElementFunctionality';

function RelationSegment(props: { graphicData: ISegmentGraphicDat, functionality: IElementFunctionality}) {
    return (
        <path onClick={(ev) => props.functionality.onSegmentMove(ev, props.graphicData.id, props.graphicData.direction)} cursor={props.graphicData.direction === Direction.HORIZONTAL ? 'ns-resize' : 'ew-resize'} stroke='black' d={`M ${props.graphicData.x} ${props.graphicData.y} l ${props.graphicData.lineToX} ${props.graphicData.lineToY}`}/>
    )
}

export default RelationSegment;