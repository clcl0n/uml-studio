import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './canvas.scss';
import { useSelector, useDispatch } from 'react-redux';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import { drawNewElement } from 'store/actions/canvas';

import IBaseElement from '@interfaces/elements/IBaseElement';
import Class from '@components/classDiagram/class';
import IClassElement from '@interfaces/elements/IClassElement';
import IStoreState from '@interfaces/IStoreState';
import CanvasEnum from '@enums/storeActions/canvasEnum';
import IRelationElement from '@interfaces/elements/IRelationElement';

function createElements(elementsProps: Array<IBaseElement>) {
    return elementsProps.map((elementProps: IBaseElement, index: number) => {
        switch(elementProps.elementData.type) {
            case ClassDiagramElementsEnum.TABLE:
                return <Class key={index} {...(elementProps as IClassElement)}/>;
            case ClassDiagramElementsEnum.ASSOCIATION:
                const el = elementProps as IRelationElement;
                return (
                    <line
                        key={index}
                        x1={el.elementGraphicData.x1}
                        y1={el.elementGraphicData.y1}
                        x2={el.elementGraphicData.x2}
                        y2={el.elementGraphicData.y2}
                        stroke={'black'}
                    />
                );
        }
    });
}

function Canvas() {
    const dispatch = useDispatch();
    const currentlyDrawingRelationship = useSelector((state: IStoreState) => state.canvas.currentlyDrawingRelationship);
    const elements = useSelector((state: IStoreState) => state.canvas.elements);
    const [canvasElements, setCanvasElements] = React.useState(createElements(elements));
    const updateCanvasElements = () => setCanvasElements(createElements(elements));


    const addNewElement = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.persist();
        const type = event.dataTransfer.getData('elementType') as CanvasEnum;
        dispatch(drawNewElement(type, event));
        updateCanvasElements();
    };

    const editRelationShip = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.persist();
        dispatch(drawNewElement(CanvasEnum.EDIT_CURRENTLY_DRAWING_RELATIONSHIP, event));
    };

    const move = (event: any) => {
        if (currentlyDrawingRelationship) {
            editRelationShip(event);
            updateCanvasElements();
        }
    }

    const up = (event: any) => {
        event.persist();
        dispatch(drawNewElement(CanvasEnum.ADD_NEW_ASSOCIATION, event));
    }
    
    return (
        <div id='canvas' onMouseMove={(event) => move(event)} onMouseUp={(event) => up(event)} onDragOver={(ev) => ev.preventDefault()} onDrop={(event) => addNewElement(event)}>
            <svg id='svg-canvas' width='100%' height='100%'>
                {...canvasElements}
            </svg>
        </div>
    );
}

export default Canvas;