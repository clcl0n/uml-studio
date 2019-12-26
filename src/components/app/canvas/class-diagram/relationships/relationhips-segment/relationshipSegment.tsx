import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import SegmentDirection from '@enums/segmentDirection';
import IRelationshipSegmentFunctionality from '@interfaces/class-diagram/relationships/IRelationshipSegmentFunctionality';

const RelationshipSegment = (props: { segment: IRelationshipSegment, functionality: IRelationshipSegmentFunctionality }) => {
    const { segment, functionality } = props;
    
    return (
        <path
            onClick={(ev) => functionality.onSegmentMove(ev, segment.id, segment.direction)}
            cursor={segment.direction === SegmentDirection.HORIZONTAL ? 'ns-resize' : 'ew-resize'}
            stroke='black'
            d={`M ${segment.x} ${segment.y} l ${segment.lineToX} ${segment.lineToY}`}
        />
    );
};

export default RelationshipSegment;