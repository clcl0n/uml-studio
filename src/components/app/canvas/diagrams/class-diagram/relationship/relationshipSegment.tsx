import React from 'react';
import ReactDOM from 'react-dom';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import SegmentDirection from '@enums/segmentDirection';
import { useDispatch, useSelector } from 'react-redux';
import { newCanvasOperation, isMouseDown } from '@store/actions/canvas.action';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import useSelectedElement from 'hooks/useSelectedElement';
import IStoreState from '@interfaces/IStoreState';

const RelationshipSegment = (props: { segment: IRelationshipSegment, relationId: string }) => {
    const dispatch = useDispatch();
    const { segment, relationId } = props;
    const { selectedElementId } = useSelectedElement();
    const isCanvasMouseDown = useSelector((state: IStoreState) => state.canvas.isMouseDown);

    const moveSegment = () => {
        dispatch(isMouseDown(true));
        dispatch(newCanvasOperation({
            type: CanvasOperationEnum.MOVE_RELATIONSHIP_SEGMENT,
            elementId: segment.id
        }));
    };

    const moveHead = () => {
        dispatch(isMouseDown(true));
        dispatch(newCanvasOperation({
            type: CanvasOperationEnum.MOVE_RELATIONSHIP_HEAD,
            elementId: segment.id
        }));
    };

    const moveTail = () => {
        dispatch(isMouseDown(true));
        dispatch(newCanvasOperation({
            type: CanvasOperationEnum.MOVE_RELATIONSHIP_TAIL,
            elementId: segment.id
        }));
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

        return (segment.isEnd || segment.isStart) && selectedElementId === relationId && !isCanvasMouseDown ? (
            <g cursor='pointer' onMouseDown={() => { segment.isStart ? moveTail() : moveHead();}}>
                <circle stroke='black' cx={cx} cy={cy} r='5'/>
            </g>
        ) : <g/>;
    };

    return (
        <g>
            {segmentJoint()}
            <g
                cursor={segment.direction === SegmentDirection.HORIZONTAL ? 'ns-resize' : 'ew-resize'}
                onMouseDown={(ev) => moveSegment()}
                pointerEvents='stroke'
            >
                <path
                    stroke='transparent'
                    strokeWidth='20'
                    d={`M ${segment.x} ${segment.y} l ${segment.lineToX} ${segment.lineToY}`}
                />
                <path
                    stroke='black'
                    d={`M ${segment.x} ${segment.y} l ${segment.lineToX} ${segment.lineToY}`}
                />
            </g>
        </g>
    );
};

export default RelationshipSegment;