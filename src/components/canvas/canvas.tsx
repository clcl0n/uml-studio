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
import ICLassElementData from '@interfaces/elements/class/IClassElementData';
import Joint from '@components/classDiagram/joint';
import IClassElementGraphicData from '@interfaces/elements/class/IClassElementGraphicData';

function createJoints(elementData: ICLassElementData, elementGraphicData: IClassElementGraphicData) {
    // let joints = new Array(3).map((_, index) => {
    //     return <Joint key={index} radius={5} x={100} y={100} />;
    // });

    // joints.push(...new Array(3).map((_, index) => {
    //     return <Joint key={index} radius={5} x={100} y={100} />;
    // }));
}

function createElements(elementsProps: Array<IBaseElement>, setJoints: any) {
    // to-do
    const t = 'test string';
    return elementsProps.map((elementProps: IBaseElement, index: number) => {
        switch(elementProps.elementData.type) {
            case ClassDiagramElementsEnum.TABLE:
                let classElementProps = elementProps as IClassElement;
                classElementProps.elementFunctionality.onFrameOver = () => {
                    setJoints([createJoints(classElementProps.elementData, classElementProps.elementGraphicData)]);
                };
                classElementProps.elementFunctionality.onFrameLeave = () => {
                    setJoints([]);
                };

                return <Class key={index} {...classElementProps}/>;
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
    const elements = useSelector((state: IStoreState) => state.canvas.elements);
    const [joints, setJoints] = React.useState([]);
    const [canvasElements, setCanvasElements] = React.useState(createElements(elements, setJoints));
    const updateCanvasElements = () => setCanvasElements(createElements(elements, setJoints));

    const addNewElement = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.persist();
        const type = event.dataTransfer.getData('elementType') as CanvasEnum;
        dispatch(drawNewElement(type, event));
        updateCanvasElements();
    };
    
    return (
        <div id='canvas' onDragOver={(ev) => ev.preventDefault()} onDrop={(event) => addNewElement(event)}>
            <svg id='svg-canvas' width='100%' height='100%'>
                <g>
                    {...canvasElements}
                </g>
                <g>
                    {...joints}
                </g>
            </svg>
        </div>
    );
}

export default Canvas;