import React from 'react';
import ReactDOM from 'react-dom';
import ICoordinates from '@interfaces/ICoordinates';
import { useDispatch, useSelector } from 'react-redux';
import { addNewNewRelationship, clearNewRelationship, addNewRelationship, addNewRelationshipSegment, updateRelationshipSegment } from '@store/actions/classDiagram.action';
import { newCanvasOperation } from '@store/actions/canvas.action';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import { createNewRelationship, updateRelationshipHelper, updateRelationshipEndingHelper } from '@utils/elements/relationship';
import useCanvasDefaultRelationshipType from 'hooks/useCanvasDefaultRelationshipType';
import IStoreState from '@interfaces/IStoreState';
import SegmentDirection from '@enums/segmentDirection';

const Joint = (props: ICoordinates & { radius: number, fromElementId: string }) => {
    const dispatch = useDispatch();
    const canvasOperationState = useSelector((state: IStoreState) => state.canvas.canvasOperation);
    const newRelationship = useSelector((state: IStoreState) => state.classDiagram.newRelationship);
    const { canvasDefaultRelationshipType } = useCanvasDefaultRelationshipType();

    const startDrawingNewRelationship = (event: React.MouseEvent) => {
        event.persist();
        let circleElement = event.target as SVGCircleElement;
        const cx = parseInt(circleElement.getAttribute('cx'));
        const cy = parseInt(circleElement.getAttribute('cy'));
        const { relationship, relationshipSegments } = createNewRelationship(canvasDefaultRelationshipType, { x1: cx, y1: cy, x2: cx, y2: cy }, props.fromElementId);
        dispatch(newCanvasOperation({ type: CanvasOperationEnum.DRAWING_NEW_RELATION , elementId: relationship.id }));
        dispatch(addNewNewRelationship({ relationship, relationshipSegments }));
    };

    const stopDrawingNewRelationship = () => {
        if (canvasOperationState.type === CanvasOperationEnum.DRAWING_NEW_RELATION) {
            newRelationship.relationship.toElementId = props.fromElementId;
            newRelationship.relationship.head.x = props.x;
            newRelationship.relationship.head.y = props.y;
            const movingRelationshipSegment = newRelationship.relationshipSegments.filter((segment) => segment.isEnd)[0];
            const dependentSegments = newRelationship.relationshipSegments.filter((segment) => {
                return segment.id === movingRelationshipSegment.toSegmentId || segment.id === movingRelationshipSegment.fromSegmentId;
            });

            const { relationship, relationshipSegments } = updateRelationshipEndingHelper(
                { x: props.x, y: props.y },
                newRelationship.relationship,
                movingRelationshipSegment,
                dependentSegments
            );
            
            dispatch(addNewRelationship(relationship));
            [
                ...relationshipSegments,
                ...newRelationship.relationshipSegments.filter((segment) => relationshipSegments.findIndex((s) => s.id === segment.id) === -1)
            ].forEach((segment) => {
                dispatch(addNewRelationshipSegment(segment));
            });
            dispatch(clearNewRelationship());
        }
    };

    return (
        <circle
            cx={props.x}
            cy={props.y}
            r={props.radius}
            onMouseUp={() => stopDrawingNewRelationship()}
            onMouseDown={(ev) => startDrawingNewRelationship(ev)}
        />
    );
};

export default Joint;