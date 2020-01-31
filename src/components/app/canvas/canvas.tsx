import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './canvas.scss';
import { useDispatch, useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import { isMouseDown, newCanvasOperation } from '@store/actions/canvas.action';
import ClassDiagram from './class-diagram/classDiagram';
import useCanvasMouseMove from 'hooks/useCanvasMouseMove';
import useCanvasAddNewElement from 'hooks/useCanvasAddNewElement';
import useCanvasOperation from 'hooks/useCanvasOperation';
import usePreviousMousePosition from 'hooks/usePreviousMousePosition';
import { addNewRelationship, addNewRelationshipSegment, clearNewRelationship } from '@store/actions/classDiagram.action';

const Canvas = () => {
    const dispatch = useDispatch();
    const classDiagram = useSelector((state: IStoreState) => state.classDiagram);
    const canvasZoom = useSelector((state: IStoreState) => state.ribbon.canvasZoom);
    const newRelationship = useSelector((state: IStoreState) => state.classDiagram.newRelationship);
    const canvasOperationState = useSelector((state: IStoreState) => state.canvas.canvasOperation);
    const canvasWidth = 826;
    const canvasHeight = 2337;
    const { previousMousePosition, setPreviousMousePosition } = usePreviousMousePosition();
    const { canvasOperation } = useCanvasOperation();
    const { onMouseMove } = useCanvasMouseMove(classDiagram, canvasOperation);
    const { addNewElementToCanvas } = useCanvasAddNewElement();

    const CanvasOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const resetCanvasOperation = (event: React.MouseEvent) => {
        if (canvasOperationState.type === CanvasOperationEnum.DRAWING_NEW_RELATION && (event.target as SVGGElement).tagName !== 'circle') {
            dispatch(addNewRelationship(newRelationship.relationship));
            newRelationship.relationshipSegments.forEach((segment) => {
                dispatch(addNewRelationshipSegment(segment));
            });
            dispatch(clearNewRelationship());
        }
        dispatch(isMouseDown(false));
        dispatch(newCanvasOperation({
            type: CanvasOperationEnum.NONE,
            elementId: ''
        }));
    };

    const onCanvasMouseMove = (event: React.MouseEvent) => {
        event.preventDefault();
        const coordinates = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
        onMouseMove(coordinates, previousMousePosition);
        setPreviousMousePosition(coordinates);
    };

    return (
        <div
            id='canvas'
            onMouseUp={(ev) => resetCanvasOperation(ev)}
            onMouseMove={(ev) => onCanvasMouseMove(ev)}
            onDragOver={(ev) => CanvasOnDragOver(ev)}
            onDrop={(ev) => addNewElementToCanvas(ev)}
        >
            <div style={{width: 400 + (canvasWidth * (canvasZoom/100)), height: 400 + (canvasHeight * (canvasZoom/100))}} className='canvas-wrapper'>
                <svg viewBox={`0 0 ${canvasWidth} ${canvasHeight}`} transform={`scale(${canvasZoom/100})`}  id='svg-canvas' width={canvasWidth} height={canvasHeight}>
                    <ClassDiagram classDiagram={classDiagram}/>
                </svg>
            </div>
        </div>
    );
};

export default Canvas;

