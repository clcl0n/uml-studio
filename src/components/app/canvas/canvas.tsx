import React from 'react';
import ReactDOM from 'react-dom';
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
import { clearNewRelationship } from '@store/actions/classDiagram.action';
import RibbonOperationEnum from '@enums/ribbonOperationEnum';

const Canvas = () => {
    const dispatch = useDispatch();
    const classDiagram = useSelector((state: IStoreState) => state.classDiagram);
    const canvasZoom = useSelector((state: IStoreState) => state.ribbon.canvasZoom);
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
        dispatch(isMouseDown(false));
        dispatch(clearNewRelationship());
        dispatch(newCanvasOperation({
            type: CanvasOperationEnum.NONE,
            elementId: ''
        }));
    };

    const onCanvasMouseMove = (event: React.MouseEvent) => {
        event.preventDefault();
        let x = Math.trunc(event.nativeEvent.offsetX) % 5 === 0 ? event.nativeEvent.offsetX : previousMousePosition.x;
        let y = Math.trunc(event.nativeEvent.offsetY) % 5 === 0 ? event.nativeEvent.offsetY : previousMousePosition.y;
        const coordinates = {x, y};
        onMouseMove(coordinates, previousMousePosition);
        setPreviousMousePosition(coordinates);
    };

    const onCanvasDrop = (event: React.DragEvent) => {
        event.preventDefault();
        event.persist();
        const coordinates = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY};
        addNewElementToCanvas(coordinates, event.dataTransfer.getData('elementType') as RibbonOperationEnum);
    };

    return (
        <div
            id='canvas'
            onMouseUp={(ev) => resetCanvasOperation(ev)}
            onMouseMove={(ev) => onCanvasMouseMove(ev)}
            onDragOver={(ev) => CanvasOnDragOver(ev)}
            onDrop={(ev) => onCanvasDrop(ev)}
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

