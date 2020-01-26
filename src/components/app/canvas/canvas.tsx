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
import useSelectedElement from 'hooks/useSelectedElement';
import usePreviousMousePosition from 'hooks/usePreviousMousePosition';
import { addNewRelationship, addNewRelationshipSegment, clearNewRelationship } from '@store/actions/classDiagram.action';

const Canvas = () => {
    const dispatch = useDispatch();
    const classDiagram = useSelector((state: IStoreState) => state.classDiagram);
    const canvasZoom = useSelector((state: IStoreState) => state.ribbon.canvasZoom);
    const newRelationship = useSelector((state: IStoreState) => state.classDiagram.newRelationship);
    const canvasOperationState = useSelector((state: IStoreState) => state.canvas.canvasOperation);
    const { previousMousePosition, setPreviousMousePosition } = usePreviousMousePosition();
    const { canvasOperation } = useSelectedElement();
    const { onMouseMove } = useCanvasMouseMove(classDiagram, canvasOperation);
    const { addNewElementToCanvas } = useCanvasAddNewElement();

    const CanvasOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const resetCanvasOperation = () => {
        switch (canvasOperationState.type) {
            case CanvasOperationEnum.DRAWING_NEW_RELATION:
                dispatch(addNewRelationship(newRelationship.relationship));
                newRelationship.relationshipSegments.forEach((segment) => {
                    dispatch(addNewRelationshipSegment(segment));
                });
                dispatch(clearNewRelationship());
                break;
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
            onMouseUp={() => resetCanvasOperation()}
            onMouseMove={(ev) => onCanvasMouseMove(ev)}
            onDragOver={(ev) => CanvasOnDragOver(ev)}
            onDrop={(ev) => addNewElementToCanvas(ev)}
        >
            <svg viewBox='0 0 1500 1000' transform={`scale(${canvasZoom/100})`}  id='svg-canvas' width='100%' height='100%'>
                <ClassDiagram classDiagram={classDiagram}/>
            </svg>
        </div>
    );
};

export default Canvas;

