import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ICoordinates from '@interfaces/ICoordinates';
import { useDispatch } from 'react-redux';
import { addNewNewRelationship } from '@store/actions/classDiagram';
import createNewRelationship from 'utils/classDiagramHelper/createNewRelationship';
import { newCanvasOperation } from '@store/actions/canvas';
import CanvasOperationEnum from '@enums/canvasOperationEnum';

const Joint = (props: ICoordinates & { radius: number, onJointClick: any }) => {
    const dispatch = useDispatch();

    const startDrawingNewRelationship = (event: React.MouseEvent) => {
        event.persist();
        let circleElement = event.target as SVGCircleElement;
        const cx = parseInt(circleElement.getAttribute('cx'));
        const cy = parseInt(circleElement.getAttribute('cy'));
        const { relationship, relationshipSegments } = createNewRelationship({ x1: cx, y1: cy, x2: cx, y2: cy });
        dispatch(newCanvasOperation({ type: CanvasOperationEnum.DRAWING_NEW_RELATION , elementId: '' }));
        dispatch(addNewNewRelationship({ relationship, relationshipSegments }));
    };

    return (
        <circle
            cx={props.x}
            cy={props.y}
            r={props.radius}
            onMouseDown={(ev) => startDrawingNewRelationship(ev)}
            onClick={(ev) => props.onJointClick(ev)}
        />
    );
};

export default Joint;