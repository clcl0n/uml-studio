import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './canvas.scss';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import { drawNewElement, updateElement } from 'store/actions/canvas';
import { isEqual } from 'lodash-es';

import IBaseElement from '@interfaces/elements/IBaseElement';
import Class from '@components/classDiagram/class';
import Association from '@components/classDiagram/association';
import IClassElement from '@interfaces/elements/IClassElement';
import IStoreState from '@interfaces/IStoreState';
import CanvasEnum from '@enums/storeActions/canvasEnum';
import IRelationElement from '@interfaces/elements/relation/IRelationElement';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import updateRelation from 'utils/canvasHelper/updateRelation';
import Direction from '@enums/Direction';
import I2DCoordinates from '@interfaces/I2DCoordinates';

function createElements(
        elementsProps: Array<IBaseElement>,
        updateCanvasOperation: React.Dispatch<React.SetStateAction<{type: CanvasOperationEnum, data: any}>>,
        setCurrentlyDrawingRelation: React.Dispatch<React.SetStateAction<{
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        }>>
    ) {

        return elementsProps.map((elementProps: IBaseElement, index: number) => {
        switch(elementProps.elementData.type) {
            case ClassDiagramElementsEnum.TABLE:
                let classElementProps = elementProps as IClassElement;
                classElementProps.elementFunctionality.onJointClick = (event: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
                    event.persist();
                    let circleElement = event.target as SVGCircleElement;
                    const cx = parseInt(circleElement.getAttribute('cx'));
                    const cy = parseInt(circleElement.getAttribute('cy'));
                    updateCanvasOperation({
                        type: CanvasOperationEnum.DRAWING_NEW_RELATION,
                        data: {}
                    });
                    setCurrentlyDrawingRelation({
                        x1: cx,
                        y1: cy,
                        x2: cx,
                        y2: cy
                    })
                    console.log('click');
                };
                classElementProps.elementFunctionality.onClassMouseDown = (event: React.MouseEvent, classId: string) => {
                    event.persist();
                    if ((event.target as SVGCircleElement).nodeName !== 'circle') {
                        updateCanvasOperation({
                            type: CanvasOperationEnum.MOVE_CLASS,
                            data: {
                                classId: classId,
                                coordinates: {
                                    x: event.nativeEvent.offsetX,
                                    y: event.nativeEvent.offsetY
                                }
                            }
                        })
                    }
                }
                classElementProps.elementFunctionality.onClassMouseUp = (event: React.MouseEvent) => {
                    event.persist();
                    console.log('up');
                    if ((event.target as SVGCircleElement).nodeName !== 'circle') {
                        updateCanvasOperation({
                            type: CanvasOperationEnum.NONE,
                            data: {}
                        });
                    }
                }
                return <Class key={index} {...classElementProps}/>;
            case ClassDiagramElementsEnum.ASSOCIATION:
                const el = elementProps as IRelationElement;
                el.elementFunctionality.onSegmentMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, segmentId: string, direction: Direction) => {
                    updateCanvasOperation({
                        type: CanvasOperationEnum.UPDATE_RELATION,
                        data: {
                            relation: el,
                            segmentId: segmentId,
                            direction
                        }
                    });
                };
                return (
                    <Association key={index} {...el}/>
                );
        }
    });
}

const gridRoundCoordinates = (coordinates: I2DCoordinates): I2DCoordinates => {
    let x = coordinates.x;
    let y = coordinates.y;
    if (coordinates.x % 10 === 0) {
        x = coordinates.x;
    } else {
        x += 10 - (Math.round(coordinates.x) % 10);
    }
    if (coordinates.y % 10 === 0) {
        y = coordinates.y;
    } else {
        y += 10 - (Math.round(coordinates.y) % 10);
    }
    return {
        x,
        y
    }
}

function Canvas() {
    const dispatch = useDispatch(); 
    const elements = useSelector((state: IStoreState) => state.canvas.elements, (left, right) => {
        return !isEqual(left, right);
    });
    
    const [canvasOperation, updateCanvasOperation] = React.useState({type: '', data: {}});
    const [currentlyDrawingRelation, setCurrentlyDrawingRelation] = React.useState({
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    });
    
    const addNewElement = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.persist();
        const type = event.dataTransfer.getData('elementType') as CanvasEnum;
        dispatch(drawNewElement(type, { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY }));
    };

    const updateDrawingRelation = (coordinates: I2DCoordinates) => {
        let fixX = -0.5;
        let fixY = 0.5;
        if (currentlyDrawingRelation.y1 > coordinates.y) {
            fixY = -0.5;
        }
        if (currentlyDrawingRelation.x1 > coordinates.x) {
            let fixX = 0.5;
        }

        setCurrentlyDrawingRelation({
            x1: currentlyDrawingRelation.x1,
            y1: currentlyDrawingRelation.y1,
            x2: coordinates.x - fixX,
            y2: coordinates.y - fixY
        })
    }

    const stopDrawingRelation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.persist();
        let circleElement = event.target as SVGCircleElement;
        if (circleElement.nodeName === 'circle') {
            console.warn(circleElement.getAttribute('cx'));
            updateCanvasOperation({
                type: CanvasOperationEnum.NONE,
                data: {}
            });
            dispatch(drawNewElement(CanvasEnum.ADD_NEW_ASSOCIATION, {
                x1: currentlyDrawingRelation.x1,
                y1: currentlyDrawingRelation.y1,
                x2: parseInt(circleElement.getAttribute('cx')),
                y2: parseInt(circleElement.getAttribute('cy'))
            }));
            setCurrentlyDrawingRelation({
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0
            });
        }
    }

    const canvasMouseClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        switch(canvasOperation.type) {
            case CanvasOperationEnum.DRAWING_NEW_RELATION:
                stopDrawingRelation(event);
                break;
            case CanvasOperationEnum.UPDATE_RELATION:
                //stop
                updateCanvasOperation({
                    type: CanvasOperationEnum.NONE,
                    data: {}
                });
                break;
            default:
                break;
        }
    };

    const canvasMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.persist();
        let coordinates: I2DCoordinates = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
        // coordinates = gridRoundCoordinates(coordinates);
        switch(canvasOperation.type) {
            case CanvasOperationEnum.DRAWING_NEW_RELATION:
                updateDrawingRelation(coordinates);
                break;
            case CanvasOperationEnum.UPDATE_RELATION:
                const t = updateRelation((canvasOperation.data as any).direction, (canvasOperation.data as any).relation, (canvasOperation.data as any).segmentId, coordinates);
                dispatch(updateElement(t));
                break;
            case CanvasOperationEnum.MOVE_CLASS:
                // const selectedClass = useSelector((state: IStoreState) => state.canvas.elements.find((element) => element.elementData.id === (canvasOperation.data as any).classId));
                // selectedClass.elementGraphicData.
                // dispatch(updateElement(selectedClass));
                break;
            default:
                break;
        }
    };

    const CanvasOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.persist();
        addNewElement(event);
    }

    const CanvasOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }; 

    return (
        <div id='canvas' onClick={(ev) => canvasMouseClick(ev)} onMouseMove={(ev) => canvasMouseMove(ev)} onDragOver={(ev) => CanvasOnDragOver(ev)} onDrop={(ev) => CanvasOnDrop(ev)}>
            <svg id='svg-canvas' width='100%' height='100%'>
                <g>
                    {...createElements(elements, updateCanvasOperation, setCurrentlyDrawingRelation)}
                </g>    
                <line stroke='black' x1={currentlyDrawingRelation.x1} x2={currentlyDrawingRelation.x2} y1={currentlyDrawingRelation.y1} y2={currentlyDrawingRelation.y2}/>
            </svg>
        </div>
    );
}

export default Canvas;