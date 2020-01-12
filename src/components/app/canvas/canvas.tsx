import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './canvas.scss';
import { useDispatch, useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import { addNewRelationshipSegment, addNewRelationship, clearNewRelationship } from '@store/actions/classDiagram';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import { isMouseDown, newCanvasOperation } from '@store/actions/canvas';
import ClassDiagram from './class-diagram/classDiagram';
import useCanvasMouseMove from 'hooks/useCanvasMouseMove';
import useCanvasAddNewElement from 'hooks/useCanvasAddNewElement';
import useCanvasOperation from 'hooks/useCanvasOperation';
import usePreviousMousePosition from 'hooks/usePreviousMousePosition';

const Canvas = () => {
    const dispatch = useDispatch();
    const classDiagram = useSelector((state: IStoreState) => state.umlClassDiagram);
    const canvasZoom = useSelector((state: IStoreState) => state.ribbon.canvasZoom);
    const newRelationship = useSelector((state: IStoreState) => state.umlClassDiagram.newRelationship);
    const canvasOperationState = useSelector((state: IStoreState) => state.canvas.canvasOperation);
    const { previousMousePosition, setPreviousMousePosition } = usePreviousMousePosition();
    const { canvasOperation, selectedElement } = useCanvasOperation();
    const { onMouseMove } = useCanvasMouseMove(classDiagram, selectedElement, canvasOperation);
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

