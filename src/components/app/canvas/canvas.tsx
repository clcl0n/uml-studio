import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './canvas.scss';
import { useDispatch, useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import createNewClass from 'utils/classDiagramHelper/class/createNewClass';
import RibbonOperationEnum from '@enums/ribbonOperationEnum';
import { addNewClassMethod, addNewClassProperty, addNewClass, addNewRelationshipSegment, addNewRelationship, updateRelationship, updateRelationshipSegment, addNewInterface, addNewInterfaceMethod, addNewInterfaceProperty, addNewUtilityMethod, addNewUtility, addNewUtilityProperty, addNewEnumeration, addNewEnumerationEntry, addNewDataTypeEntry, addNewDataType, addNewPrimitive, updateClass, updateUtility, updatePrimitiveType, updateInterface, updateEnumeration, updateDataType, addNewObjectSlot, addNewObject, updateObject, clearNewRelationship, updateNewRelationship } from '@store/actions/classDiagram';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import ICoordinates from '@interfaces/ICoordinates';
import createNewRelationship from 'utils/classDiagramHelper/createNewRelationship';
import createNewInterfaceHelper from 'utils/classDiagramHelper/interface/createNewInterfaceHelper';
import createNewUtilityHelper from 'utils/classDiagramHelper/utility/createNewUtilityHelper';
import createNewEnumerationHelper from 'utils/classDiagramHelper/enumeration/createNewEnumerationHelper';
import createNewDataTypeHelper from 'utils/classDiagramHelper/dataType/createNewDataTypeHelper';
import createNewPrimitiveType from 'utils/classDiagramHelper/primitive-type/createNewPrimitiveTypeHelper';
import createNewBaseClassHelper from 'utils/classDiagramHelper/class/createNewBaseClassHelper';
import { isMouseDown, newCanvasOperation } from '@store/actions/canvas';
import IClass from '@interfaces/class-diagram/class/IClass';
import Direction from '@enums/direction';
import moveClassHelper from 'utils/classDiagramHelper/class/moveClassHelper';
import ClassDiagram from './class-diagram/classDiagram';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IUtility from '@interfaces/class-diagram/utility/IUtility';
import moveUtilityHelper from 'utils/classDiagramHelper/utility/moveUtilityHelper';
import IPrimitiveType from '@interfaces/class-diagram/primitive-type/IPrimitiveType';
import movePrimitiveTypeHelper from 'utils/classDiagramHelper/primitive-type/movePrimitiveTypeHelper';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import IEnumeration from '@interfaces/class-diagram/enumeration/IEnumeration';
import IDataType from '@interfaces/class-diagram/data-type/IDataType';
import moveInterfaceHelper from 'utils/classDiagramHelper/interface/moveInterfaceHelper';
import moveEnumerationHelper from 'utils/classDiagramHelper/enumeration/moveEnumerationHelper';
import moveDataTypeHelper from 'utils/classDiagramHelper/dataType/moveDataTypeHelper';
import createNewObjectHelper from 'utils/classDiagramHelper/object/createNewObjectHelper';
import IObject from '@interfaces/class-diagram/object/IObject';
import resizeElementHelper from 'utils/classDiagramHelper/resizeElementHelper';
import moveObjectHelper from 'utils/classDiagramHelper/object/moveObjectHelper';
import updateRelationshipHelper from 'utils/classDiagramHelper/updateRelationshipHelper';

const Canvas = () => {
    const dispatch = useDispatch();
    const classDiagram = useSelector((state: IStoreState) => state.umlClassDiagram);
    const canvasZoom = useSelector((state: IStoreState) => state.ribbon.canvasZoom);
    const newRelationship = useSelector((state: IStoreState) => state.umlClassDiagram.newRelationship);
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
        } else if (state.umlClassDiagram.objects.byId[canvasOperationState.elementId]) {
            return state.umlClassDiagram.objects.byId[canvasOperationState.elementId];
        }
    });
    const movingRelationshipSegment = useSelector((state: IStoreState) => {
        if (canvasOperationState.type === CanvasOperationEnum.MOVE_RELATIONSHIP_SEGMENT) {
            return state.umlClassDiagram.relationshipSegments.byId[canvasOperationState.elementId];
        }
    });
    const movingRelationship = useSelector((state: IStoreState) => {
        if (movingRelationshipSegment) {
            const relationship = state.umlClassDiagram.relationships.byId[movingRelationshipSegment.relationshipId];
            const relationshipSegments = relationship.segmentIds.map((segmentId) => {
                return state.umlClassDiagram.relationshipSegments.byId[segmentId];
            });
            return {
                relationship,
                relationshipSegments
            };
        }
    });

    const [oldCursorPosition, updateOldCursorPosition] = React.useState({ x: 0, y: 0 });

    const canvasMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.persist();
        let coordinates: ICoordinates = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
        if (isMouseDown && selectedElement) {
            switch(canvasOperationState.type) {
                case CanvasOperationEnum.RESIZE_ELEMENT_LEFT:
                    switch(selectedElement.type) {
                        case ClassDiagramElementsEnum.CLASS:
                            dispatch(updateClass(resizeElementHelper(selectedElement, coordinates, Direction.LEFT)));
                            break;
                        case ClassDiagramElementsEnum.UTILITY:
                            dispatch(updateUtility(resizeElementHelper(selectedElement, coordinates, Direction.LEFT)));
                            break;
                        case ClassDiagramElementsEnum.PRIMITIVE_TYPE:
                            dispatch(updatePrimitiveType(resizeElementHelper(selectedElement, coordinates, Direction.LEFT)));
                            break;
                        case ClassDiagramElementsEnum.INTERFACE:
                            dispatch(updateInterface(resizeElementHelper(selectedElement, coordinates, Direction.LEFT)));
                            break;
                        case ClassDiagramElementsEnum.ENUMERATION:
                            dispatch(updateEnumeration(resizeElementHelper(selectedElement, coordinates, Direction.LEFT)));
                            break;
                        case ClassDiagramElementsEnum.DATA_TYPE:
                            dispatch(updateDataType(resizeElementHelper(selectedElement, coordinates, Direction.LEFT)));
                            break;
                        case ClassDiagramElementsEnum.OBJECT:
                            dispatch(updateObject(resizeElementHelper(selectedElement, coordinates, Direction.LEFT)));
                            break;
                    }
                    break;
                case CanvasOperationEnum.RESIZE_ELEMENT_RIGHT:
                    switch(selectedElement.type) {
                        case ClassDiagramElementsEnum.CLASS:
                            dispatch(updateClass(resizeElementHelper(selectedElement, coordinates, Direction.RIGHT)));
                            break;
                        case ClassDiagramElementsEnum.UTILITY:
                            dispatch(updateUtility(resizeElementHelper(selectedElement, coordinates, Direction.RIGHT)));
                            break;
                        case ClassDiagramElementsEnum.PRIMITIVE_TYPE:
                            dispatch(updatePrimitiveType(resizeElementHelper(selectedElement, coordinates, Direction.RIGHT)));
                            break;
                        case ClassDiagramElementsEnum.INTERFACE:
                            dispatch(updateInterface(resizeElementHelper(selectedElement, coordinates, Direction.RIGHT)));
                            break;
                        case ClassDiagramElementsEnum.ENUMERATION:
                            dispatch(updateEnumeration(resizeElementHelper(selectedElement, coordinates, Direction.RIGHT)));
                            break;
                        case ClassDiagramElementsEnum.DATA_TYPE:
                            dispatch(updateDataType(resizeElementHelper(selectedElement, coordinates, Direction.RIGHT)));
                            break;
                        case ClassDiagramElementsEnum.OBJECT:
                            dispatch(updateObject(resizeElementHelper(selectedElement, coordinates, Direction.RIGHT)));
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
                        case ClassDiagramElementsEnum.OBJECT:
                            dispatch(updateObject(moveObjectHelper(selectedElement as IObject, coordinates, oldCursorPosition)));
                            break;
                    }
                    break;
            }
        } else if (isMouseDown) {
            switch (canvasOperationState.type) {
                case CanvasOperationEnum.DRAWING_NEW_RELATION:
                    let fixX = newRelationship.relationship.tail.x > coordinates.x ? -0.5 : 0.5;
                    dispatch(updateNewRelationship(createNewRelationship({
                        x1: newRelationship.relationship.tail.x,
                        y1: newRelationship.relationship.tail.y,
                        x2: coordinates.x - fixX,
                        y2: coordinates.y
                    })));
                    break;
                case CanvasOperationEnum.MOVE_RELATIONSHIP_SEGMENT:
                    if (movingRelationshipSegment) {
                        const { relationship, relationshipSegments } = updateRelationshipHelper(
                            movingRelationshipSegment.direction,
                            movingRelationship.relationship,
                            movingRelationship.relationshipSegments,
                            movingRelationshipSegment.id,
                            coordinates
                        );
                        relationshipSegments.forEach((segment) => {
                            if (classDiagram.relationshipSegments.allIds.includes(segment.id)) {	
                                dispatch(updateRelationshipSegment(segment));	
                            } else {	
                                dispatch(addNewRelationshipSegment(segment));	
                            }
                        });
                        dispatch(updateRelationship(relationship));
                    }
                    break;
            }
        }
        updateOldCursorPosition(coordinates);
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
                const { newObjectSlot, newObject } = createNewObjectHelper(coordinates);
                dispatch(addNewObjectSlot(newObjectSlot));
                dispatch(addNewObject(newObject));
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

    return (
        <div id='canvas' onMouseUp={() => resetCanvasOperation()} onMouseMove={(ev) => canvasMouseMove(ev)} onDragOver={(ev) => CanvasOnDragOver(ev)} onDrop={(ev) => CanvasOnDrop(ev)}>
            <svg viewBox='0 0 1500 1000' transform={`scale(${canvasZoom/100})`}  id='svg-canvas' width='100%' height='100%'>
                <ClassDiagram classDiagram={classDiagram}/>
            </svg>
        </div>
    );
};

export default Canvas;

