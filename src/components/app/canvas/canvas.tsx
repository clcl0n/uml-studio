import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './canvas.scss';
import { useDispatch, useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import createNewClass from 'utils/classDiagramHelper/class/createNewClass';
import RibbonOperationEnum from '@enums/ribbonOperationEnum';
import { addNewClassMethod, addNewClassProperty, addNewClass, addNewRelationshipSegment, addNewRelationship, updateRelationship, updateRelationshipSegment, addNewInterface, addNewInterfaceMethod, addNewInterfaceProperty, addNewUtilityMethod, addNewUtility, addNewUtilityProperty, addNewEnumeration, addNewEnumerationEntry, addNewDataTypeEntry, addNewDataType, addNewPrimitive, updateClass, updateUtility, updatePrimitiveType, updateInterface, updateEnumeration, updateDataType } from '@store/actions/classDiagram';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import ICoordinates from '@interfaces/ICoordinates';
import createNewRelationship from 'utils/classDiagramHelper/createNewRelationship';
import updateRelationshipHelper from 'utils/classDiagramHelper/updateRelationshipHelper';
import createNewInterfaceHelper from 'utils/classDiagramHelper/interface/createNewInterfaceHelper';
import createNewUtilityHelper from 'utils/classDiagramHelper/utility/createNewUtilityHelper';
import createNewEnumerationHelper from 'utils/classDiagramHelper/enumeration/createNewEnumerationHelper';
import createNewDataTypeHelper from 'utils/classDiagramHelper/dataType/createNewDataTypeHelper';
import createNewPrimitiveType from 'utils/classDiagramHelper/primitive-type/createNewPrimitiveTypeHelper';
import createNewBaseClassHelper from 'utils/classDiagramHelper/class/createNewBaseClassHelper';
import { isMouseDown, newCanvasOperation } from '@store/actions/canvas';
import resizeClassHelper from 'utils/classDiagramHelper/class/resizeClassHelper';
import IClass from '@interfaces/class-diagram/class/IClass';
import Direction from '@enums/direction';
import moveClassHelper from 'utils/classDiagramHelper/class/moveClassHelper';
import ClassDiagram from './class-diagram/classDiagram';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IUtility from '@interfaces/class-diagram/utility/IUtility';
import resizeUtilityHelper from 'utils/classDiagramHelper/utility/resizeUtilityHelper';
import moveUtilityHelper from 'utils/classDiagramHelper/utility/moveUtilityHelper';
import resizePrimitiveTypeHelper from 'utils/classDiagramHelper/primitive-type/resizePrimitiveTypeHelper';
import IPrimitiveType from '@interfaces/class-diagram/primitive-type/IPrimitiveType';
import movePrimitiveTypeHelper from 'utils/classDiagramHelper/primitive-type/movePrimitiveTypeHelper';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import resizeInterfaceHelper from 'utils/classDiagramHelper/interface/resizeInterfaceHelper';
import resizeEnumerationHelper from 'utils/classDiagramHelper/enumeration/resizeEnumerationHelper';
import IEnumeration from '@interfaces/class-diagram/enumeration/IEnumeration';
import resizeDataTypeHelper from 'utils/classDiagramHelper/dataType/resizeDataTypeHelper';
import IDataType from '@interfaces/class-diagram/data-type/IDataType';
import moveInterfaceHelper from 'utils/classDiagramHelper/interface/moveInterfaceHelper';
import moveEnumerationHelper from 'utils/classDiagramHelper/enumeration/moveEnumerationHelper';
import moveDataTypeHelper from 'utils/classDiagramHelper/dataType/moveDataTypeHelper';

const Canvas = () => {
    const dispatch = useDispatch();
    const classDiagram = useSelector((state: IStoreState) => state.umlClassDiagram);
    const canvasZoom = useSelector((state: IStoreState) => state.ribbon.canvasZoom);
    const isMouseDownState = useSelector((state: IStoreState) => state.canvas.isMouseDown);
    const canvasOperationState = useSelector((state: IStoreState) => state.canvas.canvasOperation);
    const selectedElement = useSelector((state: IStoreState) => {
        if (state.umlClassDiagram.classes.byId[canvasOperationState.elementId]) {
            return state.umlClassDiagram.classes.byId[canvasOperationState.elementId];
        } else if (state.umlClassDiagram.interfaces.byId[canvasOperationState.elementId]) {
            return state.umlClassDiagram.interfaces.byId[canvasOperationState.elementId];
        } else if (state.umlClassDiagram.utilities.byId[canvasOperationState.elementId]) {
            return state.umlClassDiagram.utilities.byId[canvasOperationState.elementId];
        } else if (state.umlClassDiagram.enumerations.byId[canvasOperationState.elementId]) {
            return state.umlClassDiagram.enumerations.byId[canvasOperationState.elementId];
        } else if (state.umlClassDiagram.primitiveTypes.byId[canvasOperationState.elementId]) {
            return state.umlClassDiagram.primitiveTypes.byId[canvasOperationState.elementId];
        } else if (state.umlClassDiagram.dataTypes.byId[canvasOperationState.elementId]) {
            return state.umlClassDiagram.dataTypes.byId[canvasOperationState.elementId];
        }
    });
    const [oldCursorPosition, updateOldCursorPosition] = React.useState({ x: 0, y: 0 });
    const [canvasOperation, updateCanvasOperation] = React.useState({type: '', data: {}});
    const [currentlyDrawingRelation, setCurrentlyDrawingRelation] = React.useState({
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    });

    const updateDrawingRelation = (coordinates: ICoordinates) => {
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
        });
    };

    const stopDrawingRelation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.persist();
        let circleElement = event.target as SVGCircleElement;
        if (circleElement.nodeName === 'circle') {
            updateCanvasOperation({
                type: CanvasOperationEnum.NONE,
                data: {}
            });
            const { relationship, relationshipSegments } = createNewRelationship({ 
                x1: currentlyDrawingRelation.x1,
                y1: currentlyDrawingRelation.y1,
                x2: parseInt(circleElement.getAttribute('cx')),
                y2: parseInt(circleElement.getAttribute('cy'))
            });
            relationshipSegments.forEach((relationshipSegment) => dispatch(addNewRelationshipSegment(relationshipSegment)));
            dispatch(addNewRelationship(relationship));
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
        let coordinates: ICoordinates = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
        // coordinates = gridRoundCoordinates(coordinates);
        //new******************
        if (isMouseDown) {
            switch(canvasOperationState.type) {
                case CanvasOperationEnum.RESIZE_ELEMENT_LEFT:
                    switch(selectedElement.type) {
                        case ClassDiagramElementsEnum.CLASS:
                            dispatch(updateClass(resizeClassHelper(selectedElement as IClass, coordinates, Direction.LEFT)));
                            break;
                        case ClassDiagramElementsEnum.UTILITY:
                            dispatch(updateUtility(resizeUtilityHelper(selectedElement as IUtility, coordinates, Direction.LEFT)));
                            break;
                        case ClassDiagramElementsEnum.PRIMITIVE_TYPE:
                            dispatch(updatePrimitiveType(resizePrimitiveTypeHelper(selectedElement as IPrimitiveType, coordinates, Direction.LEFT)));
                            break;
                        case ClassDiagramElementsEnum.INTERFACE:
                            dispatch(updateInterface(resizeInterfaceHelper(selectedElement as IInterface, coordinates, Direction.LEFT)));
                            break;
                        case ClassDiagramElementsEnum.ENUMERATION:
                            dispatch(updateEnumeration(resizeEnumerationHelper(selectedElement as IEnumeration, coordinates, Direction.LEFT)));
                            break;
                        case ClassDiagramElementsEnum.DATA_TYPE:
                            dispatch(updateDataType(resizeDataTypeHelper(selectedElement as IDataType, coordinates, Direction.LEFT)));
                            break;
                    }
                    break;
                case CanvasOperationEnum.RESIZE_ELEMENT_RIGHT:
                    switch(selectedElement.type) {
                        case ClassDiagramElementsEnum.CLASS:
                            dispatch(updateClass(resizeClassHelper(selectedElement as IClass, coordinates, Direction.RIGHT)));
                            break;
                        case ClassDiagramElementsEnum.UTILITY:
                            dispatch(updateUtility(resizeUtilityHelper(selectedElement as IUtility, coordinates, Direction.RIGHT)));
                            break;
                        case ClassDiagramElementsEnum.PRIMITIVE_TYPE:
                            dispatch(updatePrimitiveType(resizePrimitiveTypeHelper(selectedElement as IPrimitiveType, coordinates, Direction.RIGHT)));
                            break;
                        case ClassDiagramElementsEnum.INTERFACE:
                            dispatch(updateInterface(resizeInterfaceHelper(selectedElement as IInterface, coordinates, Direction.RIGHT)));
                            break;
                        case ClassDiagramElementsEnum.ENUMERATION:
                            dispatch(updateEnumeration(resizeEnumerationHelper(selectedElement as IEnumeration, coordinates, Direction.RIGHT)));
                            break;
                        case ClassDiagramElementsEnum.DATA_TYPE:
                            dispatch(updateDataType(resizeDataTypeHelper(selectedElement as IDataType, coordinates, Direction.RIGHT)));
                            break;
                    }
                    break;
                case CanvasOperationEnum.MOVE_ELEMENT:
                    switch(selectedElement.type) {
                        case ClassDiagramElementsEnum.CLASS:
                            dispatch(updateClass(moveClassHelper(selectedElement as IClass, coordinates, oldCursorPosition)));
                            break;
                        case ClassDiagramElementsEnum.UTILITY:
                            dispatch(updateUtility(moveUtilityHelper(selectedElement as IUtility, coordinates, oldCursorPosition)));
                            break;
                        case ClassDiagramElementsEnum.PRIMITIVE_TYPE:
                            dispatch(updatePrimitiveType(movePrimitiveTypeHelper(selectedElement as IPrimitiveType, coordinates, oldCursorPosition)));
                            break;
                        case ClassDiagramElementsEnum.INTERFACE:
                            dispatch(updateInterface(moveInterfaceHelper(selectedElement as IInterface, coordinates, oldCursorPosition)));
                            break;
                        case ClassDiagramElementsEnum.ENUMERATION:
                            dispatch(updateEnumeration(moveEnumerationHelper(selectedElement as IEnumeration, coordinates, oldCursorPosition)));
                            break;
                        case ClassDiagramElementsEnum.DATA_TYPE:
                            dispatch(updateDataType(moveDataTypeHelper(selectedElement as IDataType, coordinates, oldCursorPosition)));
                            break;
                    }
                    break;
            }
        };
        updateOldCursorPosition(coordinates);

        //old to-do refactor
        switch(canvasOperation.type) {
            case CanvasOperationEnum.DRAWING_NEW_RELATION:
                updateDrawingRelation(coordinates);
                break;
            case CanvasOperationEnum.UPDATE_RELATION:
                const { relationship, relationshipSegments } = updateRelationshipHelper(
                    (canvasOperation.data as any).segmentDirection,
                    (canvasOperation.data as any).relationship,
                    (canvasOperation.data as any).relationshipSegments,
                    (canvasOperation.data as any).segmentId,
                    coordinates
                );
                
                relationshipSegments.forEach((relationshipSegment) => {
                    if (classDiagram.relationshipSegments.allIds.includes(relationshipSegment.id)) {
                        dispatch(updateRelationshipSegment(relationshipSegment));
                    } else {
                        dispatch(addNewRelationshipSegment(relationshipSegment));
                    }
                });
                dispatch(updateRelationship(relationship));
                break;
            default:
                break;
        }
    };

    const CanvasOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const CanvasOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.persist();
        const coordinates = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
        switch(event.dataTransfer.getData('elementType') as RibbonOperationEnum) {
            case RibbonOperationEnum.ADD_NEW_CLASS:
                const newClass = createNewClass(coordinates);
                dispatch(addNewClassMethod(newClass.newClassMethod));
                dispatch(addNewClassProperty(newClass.newClassProperty));
                dispatch(addNewClass(newClass.newClass));
                break;
            case RibbonOperationEnum.ADD_NEW_DATA_TYPE:
                const { newDataType, newDataTypeEntry } = createNewDataTypeHelper(coordinates);
                dispatch(addNewDataTypeEntry(newDataTypeEntry));
                dispatch(addNewDataType(newDataType));
                break;
            case RibbonOperationEnum.ADD_NEW_EMPTY_CLASS:
                const { newBaseClass } = createNewBaseClassHelper(coordinates);
                dispatch(addNewClass(newBaseClass));
                break;
            case RibbonOperationEnum.ADD_NEW_ENUMERATION:
                const { newEnumeration, newEntry } = createNewEnumerationHelper(coordinates);
                dispatch(addNewEnumerationEntry(newEntry));
                dispatch(addNewEnumeration(newEnumeration));
                break;
            case RibbonOperationEnum.ADD_NEW_INTERFACE:
                const { newInterface, newInterfaceMethod, newInterfaceProperty } = createNewInterfaceHelper(coordinates);
                dispatch(addNewInterfaceMethod(newInterfaceMethod));
                dispatch(addNewInterfaceProperty(newInterfaceProperty));
                dispatch(addNewInterface(newInterface));
                break;
            case RibbonOperationEnum.ADD_NEW_OBJECT:
                break;
            case RibbonOperationEnum.ADD_NEW_PRIMITIVE_TYPE:
                const { newPrimitiveType } = createNewPrimitiveType(coordinates);
                dispatch(addNewPrimitive(newPrimitiveType));
                break;
            case RibbonOperationEnum.ADD_NEW_UTILITY:
                const { newUtility, newUtilityProperty, newUtilityMethod } = createNewUtilityHelper(coordinates);
                dispatch(addNewUtilityMethod(newUtilityMethod));
                dispatch(addNewUtilityProperty(newUtilityProperty));
                dispatch(addNewUtility(newUtility));
                break;
        }
    };

    const resetCanvasOperation = () => {
        dispatch(isMouseDown(false));
        dispatch(newCanvasOperation({
            type: CanvasOperationEnum.NONE,
            elementId: ''
        }));
    };

    return (
        <div id='canvas' onMouseUp={() => resetCanvasOperation()} onClick={(ev) => canvasMouseClick(ev)} onMouseMove={(ev) => canvasMouseMove(ev)} onDragOver={(ev) => CanvasOnDragOver(ev)} onDrop={(ev) => CanvasOnDrop(ev)}>
            <svg viewBox='0 0 1500 1000' transform={`scale(${canvasZoom/100})`}  id='svg-canvas' width='100%' height='100%'>
                <ClassDiagram
                    classDiagram={classDiagram}
                    updateCanvasOperation={updateCanvasOperation}
                    setCurrentlyDrawingRelation={setCurrentlyDrawingRelation}
                />
                <line stroke='black' x1={currentlyDrawingRelation.x1} x2={currentlyDrawingRelation.x2} y1={currentlyDrawingRelation.y1} y2={currentlyDrawingRelation.y2}/>
            </svg>
        </div>
    );
};

export default Canvas;

