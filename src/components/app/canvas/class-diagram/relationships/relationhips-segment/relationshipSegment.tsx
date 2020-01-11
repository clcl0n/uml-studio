import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import SegmentDirection from '@enums/segmentDirection';
import { useDispatch } from 'react-redux';
import { newCanvasOperation } from '@store/actions/canvas';
import CanvasOperationEnum from '@enums/canvasOperationEnum';

const RelationshipSegment = (props: { segment: IRelationshipSegment, relationId: string }) => {
    const dispatch = useDispatch();
    const { segment, relationId } = props;

    const moveSegment = () => {
        dispatch(newCanvasOperation({
            type: CanvasOperationEnum.MOVE_RELATIONSHIP_SEGMENT,
            elementId: segment.id
        }));
    };

    const moveHead = () => {
        console.log('move head');
    };

    const moveTail = () => {
        console.log('move tail');
    };

    const segmentJoint = () => {
        let cx, cy = 0;
        if (segment.isEnd) {
            cx = segment.x + segment.lineToX;
            cy = segment.y + segment.lineToY;
        } else if (segment.isStart) {
            cx = segment.x;
            cy = segment.y;
        }

        return segment.isEnd || segment.isStart ? (
            <g cursor='pointer' onMouseDown={() => { segment.isStart ? moveTail() : moveHead();}}>
                <circle stroke='transparent' cx={cx} cy={cy} r='6'/>
                <circle stroke='black' cx={cx} cy={cy} r='3'/>
            </g>
        ) : <g/>;
    };

    return (
        <g>
            {segmentJoint()}
            <path
                onMouseDown={(ev) => moveSegment()}
                cursor={segment.direction === SegmentDirection.HORIZONTAL ? 'ns-resize' : 'ew-resize'}
                stroke='black'
                d={`M ${segment.x} ${segment.y} l ${segment.lineToX} ${segment.lineToY}`}
            />
        </g>
    );
};

export default RelationshipSegment;