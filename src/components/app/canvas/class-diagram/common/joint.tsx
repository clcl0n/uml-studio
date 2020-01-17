import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ICoordinates from '@interfaces/ICoordinates';
import { useDispatch } from 'react-redux';
import { addNewNewRelationship } from '@store/actions/classDiagram';
import { newCanvasOperation } from '@store/actions/canvas';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import { createNewRelationship } from '@utils/elements/relationship';

const Joint = (props: ICoordinates & { radius: number, fromElementId: string }) => {
    const dispatch = useDispatch();

    const startDrawingNewRelationship = (event: React.MouseEvent) => {
        event.persist();
        let circleElement = event.target as SVGCircleElement;
        const cx = parseInt(circleElement.getAttribute('cx'));
        const cy = parseInt(circleElement.getAttribute('cy'));
        const { relationship, relationshipSegments } = createNewRelationship({ x1: cx, y1: cy, x2: cx, y2: cy }, props.fromElementId);
        dispatch(newCanvasOperation({ type: CanvasOperationEnum.DRAWING_NEW_RELATION , elementId: relationship.id }));
        dispatch(addNewNewRelationship({ relationship, relationshipSegments }));
    };

    return (
        <circle
            cx={props.x}
            cy={props.y}
            r={props.radius}
            onMouseDown={(ev) => startDrawingNewRelationship(ev)}
        />
    );
};

export default Joint;