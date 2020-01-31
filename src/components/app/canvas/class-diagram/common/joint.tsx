import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ICoordinates from '@interfaces/ICoordinates';
import { useDispatch, useSelector } from 'react-redux';
import { addNewNewRelationship, clearNewRelationship, addNewRelationship, addNewRelationshipSegment, updateRelationshipSegment } from '@store/actions/classDiagram.action';
import { newCanvasOperation } from '@store/actions/canvas.action';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import { createNewRelationship, updateRelationshipHelper } from '@utils/elements/relationship';
import useCanvasDefaultRelationshipType from 'hooks/useCanvasDefaultRelationshipType';
import IStoreState from '@interfaces/IStoreState';

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
            const movingRelationshipSegment = newRelationship.relationshipSegments[newRelationship.relationshipSegments.length - 1];
            const dependentSegments = newRelationship.relationshipSegments.filter((segment) => {
                return segment.id === movingRelationshipSegment.toSegmentId || segment.id === movingRelationshipSegment.fromSegmentId;
            });

            
            
            dispatch(addNewRelationship(newRelationship.relationship));
            newRelationship.relationshipSegments.forEach((segment) => {
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