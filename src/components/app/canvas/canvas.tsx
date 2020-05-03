import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './canvas.scss';
import { useDispatch, useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import { isMouseDown, newCanvasOperation } from '@store/actions/canvas.action';
import useCanvasMouseMove from 'hooks/useCanvasMouseMove';
import useCanvasAddNewElement from 'hooks/useCanvasAddNewElement';
import useCanvasOperation from 'hooks/useCanvasOperation';
import usePreviousMousePosition from 'hooks/usePreviousMousePosition';
import { clearNewRelationship, updateRelationship } from '@store/actions/classDiagram.action';
import RibbonOperationEnum from '@enums/ribbonOperationEnum';
import Diagram from './diagrams/diagram';
import useSelectedElement from 'hooks/useSelectedElement';

const Canvas = () => {
    const dispatch = useDispatch();
    const classDiagram = useSelector((state: IStoreState) => state.classDiagram);
    const stateDiagram = useSelector((state: IStoreState) => state.stateDiagram);
    const canvasZoom = useSelector((state: IStoreState) => state.ribbon.canvasZoom);
    const canvasOperationState = useSelector((state: IStoreState) => state.canvas.canvasOperation);
    const { selectedRelationship, selectedRelationshipSegments } = useSelectedElement();
    const canvasRef = useRef(null);

    useEffect(() => {
        const current = canvasRef.current as HTMLDivElement;
        current.scrollTop = (current.scrollHeight - current.clientHeight) / 2;
        current.scrollLeft = (current.scrollWidth - current.clientWidth) / 2;
    }, []);

    const { x: paperWidth, y: paperHeight} = useSelector((state: IStoreState) => state.canvas.canvasDimensions);
    const [canvasDimensions, setCanvasDimensions] = useState({
        canvasWidth: paperWidth,
        canvasHeight: paperHeight
    });
    const { previousMousePosition, setPreviousMousePosition } = usePreviousMousePosition();
    const { canvasOperation } = useCanvasOperation();
    const { onMouseMove } = useCanvasMouseMove(classDiagram, stateDiagram, canvasOperation);
    const { addNewElementToCanvas } = useCanvasAddNewElement();

    const CanvasOnDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const resetCanvasOperation = (event: React.MouseEvent) => {
        event.persist();
        if (canvasOperationState.type === CanvasOperationEnum.MOVE_RELATIONSHIP_HEAD && (event.nativeEvent.target as any).tagName === 'svg') {
            selectedRelationship.toElementId = '';
            dispatch(updateRelationship(selectedRelationship));
        } else if (canvasOperationState.type === CanvasOperationEnum.MOVE_RELATIONSHIP_TAIL && (event.nativeEvent.target as any).tagName === 'svg') {
            selectedRelationship.fromElementId = '';
            dispatch(updateRelationship(selectedRelationship));
        }
        dispatch(isMouseDown(false));
        dispatch(clearNewRelationship());
        dispatch(newCanvasOperation({
            type: CanvasOperationEnum.NONE,
            elementId: ''
        }));
    };

    const onCanvasMouseMove = (event: React.MouseEvent) => {
        event.preventDefault();
        let x = event.nativeEvent.offsetX;
        let y = event.nativeEvent.offsetY;
        // let x = Math.trunc(event.nativeEvent.offsetX) % 5 === 0 ? event.nativeEvent.offsetX : previousMousePosition.x;
        // let y = Math.trunc(event.nativeEvent.offsetY) % 5 === 0 ? event.nativeEvent.offsetY : previousMousePosition.y;
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
        <div ref={canvasRef} id='canvas'>
            <div style={{width: 400 + (canvasDimensions.canvasWidth * (canvasZoom/100)), height: 400 + (canvasDimensions.canvasHeight * (canvasZoom/100))}} className='canvas-wrapper'>
                <svg
                    id='svg-canvas'
                    onMouseUp={(ev) => resetCanvasOperation(ev)}
                    onDragOver={(ev) => CanvasOnDragOver(ev)}
                    onDrop={(ev) => onCanvasDrop(ev)}
                    onMouseMove={(ev) => onCanvasMouseMove(ev)}
                    viewBox={`0 0 ${canvasDimensions.canvasWidth} ${canvasDimensions.canvasHeight}`}
                    transform={`scale(${canvasZoom/100})`}  
                    width={canvasDimensions.canvasWidth}
                    height={canvasDimensions.canvasHeight}
                >
                    <Diagram/>
                </svg>
            </div>
        </div>
    );
};

export default Canvas;

