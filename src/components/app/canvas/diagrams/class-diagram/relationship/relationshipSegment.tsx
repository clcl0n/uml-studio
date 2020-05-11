import React from 'react';
import ReactDOM from 'react-dom';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import SegmentDirection from '@enums/segmentDirection';
import { useDispatch, useSelector } from 'react-redux';
import { newCanvasOperation, isMouseDown } from '@store/actions/canvas.action';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import useSelectedElement from 'hooks/useSelectedElement';
import IStoreState from '@interfaces/IStoreState';
import ClassDiagramRelationshipTypesEnum from '@enums/classDiagramRelationshipTypesEnum';
import { getClassHeadOffset } from '@utils/elements/relationship';

const RelationshipSegment = (
    props: { 
        segment: IRelationshipSegment,
        relationId: string,
        type: ClassDiagramRelationshipTypesEnum
    }
) => {
    const dispatch = useDispatch();
    const { segment, relationId, type } = props;
    const { selectedElementId } = useSelectedElement();
    const relationship = useSelector((store: IStoreState) => store.classDiagram.relationships.byId[props.relationId]);
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
        let cx = 0;
        let cy = 0;
        let fixX = getClassHeadOffset(props.type);

        if (segment.isEnd) {
            if (segment.direction === SegmentDirection.HORIZONTAL) {
                cx = segment.x + segment.lineToX + (segment.lineToX > 0 ? fixX : -fixX);
                cy = segment.y + segment.lineToY;
            } else {
                cx = segment.x + segment.lineToX + (segment.x > relationship.head.x ? -fixX : +fixX);
                cy = segment.y + segment.lineToY;
            }
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