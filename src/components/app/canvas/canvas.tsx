import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './canvas.scss';
import { useDispatch, useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import createNewClass from 'utils/classDiagramHelper/createNewClass';
import RibbonOperationEnum from '@enums/ribbonOperationEnum';
import { addNewClassMethod, addNewClassProperty, addNewClass } from '@store/actions/classDiagram';
import IClassDiagramState from '@interfaces/class-diagram/IClassDiagramState';
import Class from './class-diagram/class';

const createElements = (classDiagram: IClassDiagramState) => {
    return classDiagram.classes.allIds.map((id) => {
        const classElement = classDiagram.classes.byId[id];
        const classProperties = classElement.classPropertyIds.map((id) => classDiagram.classProperties.byId[id]);
        const classMethods = classElement.classMethodIds.map((id) => classDiagram.classMethods.byId[id]);
        
        const props = {
            class: classElement,
            properties: classProperties,
            methods: classMethods
        };

        return (
            <Class key={id} {...props}/>
        );
    });
};

const canvas = () => {
    const dispatch = useDispatch();
    const classDiagram = useSelector((state: IStoreState) => state.umlClassDiagram);
    const [canvasOperation, updateCanvasOperation] = React.useState({type: '', data: {}});
    const [currentlyDrawingRelation, setCurrentlyDrawingRelation] = React.useState({
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    });

    const canvasMouseClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        
    };

    const canvasMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

    };

    const CanvasOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const CanvasOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.persist();
        switch(event.dataTransfer.getData('elementType') as RibbonOperationEnum) {
            case RibbonOperationEnum.ADD_NEW_CLASS:
                const newClass = createNewClass({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
                dispatch(addNewClassMethod(newClass.newClassMethod));
                dispatch(addNewClassProperty(newClass.newClassProperty));
                dispatch(addNewClass(newClass.newClass));
                break;
        }
    };
    return (
        <div id='canvas' onClick={(ev) => canvasMouseClick(ev)} onMouseMove={(ev) => canvasMouseMove(ev)} onDragOver={(ev) => CanvasOnDragOver(ev)} onDrop={(ev) => CanvasOnDrop(ev)}>
            <svg id='svg-canvas' width='100%' height='100%'>
                <g>
                    {...createElements(classDiagram)}
                </g>    
                <line stroke='black' x1={currentlyDrawingRelation.x1} x2={currentlyDrawingRelation.x2} y1={currentlyDrawingRelation.y1} y2={currentlyDrawingRelation.y2}/>
            </svg>
        </div>
    );
};

export default canvas;

