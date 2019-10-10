import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './canvas.scss';
import { useSelector, useDispatch } from 'react-redux';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import { drawNewElement } from 'store/actions/canvas';

import ICanvasElement from '@interfaces/ICanvasElement';
import Class from '@components/classDiagram/class';
import { IUMLClassElementProps } from '@interfaces/IUMLClassElementProps';
import IStoreState from '@interfaces/IStoreState';

function createElements(elementsProps: Array<ICanvasElement>) {
    return elementsProps.map((elementProps: ICanvasElement, index: number) => {
        switch(elementProps.type) {
            case ClassDiagramElementsEnum.TABLE:
                return <Class key={index} {...(elementProps as IUMLClassElementProps)}/>
        }
    });
}

function Canvas() {
    const dispatch = useDispatch();
    const elements = useSelector((state: IStoreState) => state.canvas.elements);
    const [canvasElements, setCanvasElements] = React.useState(createElements(elements));
    const updateCanvasElements = () => setCanvasElements(createElements(elements));


    const draw = (element: ClassDiagramElementsEnum, event: React.MouseEvent<SVGElement, MouseEvent>) => {
        event.persist();
        dispatch(drawNewElement(element, event));
        updateCanvasElements();
    };
    
    return (
        <div id='canvas'>
            <svg onClick={(event) => draw(ClassDiagramElementsEnum.TABLE, event)} id='svg-canvas' width='100%' height='100%'>
                {...canvasElements}
            </svg>
        </div>
    );
}

export default Canvas;