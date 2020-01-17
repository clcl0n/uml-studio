import { useDispatch, useSelector } from 'react-redux';
import ICoordinates from '@interfaces/ICoordinates';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import { updateClass, updateUtility, updatePrimitiveType, updateInterface, updateEnumeration, updateDataType, updateObject, updateNewRelationship, updateRelationshipSegment, addNewRelationshipSegment, updateRelationship } from '@store/actions/classDiagram';
import Direction from '@enums/direction';
import IObject from '@interfaces/class-diagram/object/IObject';
import IClass from '@interfaces/class-diagram/class/IClass';
import IUtility from '@interfaces/class-diagram/utility/IUtility';
import IPrimitiveType from '@interfaces/class-diagram/primitive-type/IPrimitiveType';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import IEnumeration from '@interfaces/class-diagram/enumeration/IEnumeration';
import IDataType from '@interfaces/class-diagram/data-type/IDataType';
import { isMouseDown } from '@store/actions/canvas';
import { updateRelationshipEndingHelper, updateRelationshipHelper, createNewRelationship } from '@utils/elements/relationship';
import IStoreState from '@interfaces/IStoreState';
import IClassDiagramState from '@interfaces/class-diagram/IClassDiagramState';
import IBaseElement from '@interfaces/class-diagram/common/IBaseElement';
import ICanvasOperation from '@interfaces/ICanvasOperation';
import { resizeFrame } from '@utils/elements/frame';
import { moveClass } from '@utils/elements/class';
import { moveUtility } from '@utils/elements/utility';
import { movePrimitiveType } from '@utils/elements/primitiveType';
import { moveInterface } from '@utils/elements/interface';
import { moveEnumeration } from '@utils/elements/enumeration';
import { moveDataType } from '@utils/elements/dataType';
import { moveObject } from '@utils/elements/object';

const useCanvasMouseMove = (
    classDiagram: IClassDiagramState,
    selectedElement: IBaseElement<any, any>,
    canvasOperation: ICanvasOperation
) => {
    const dispatch = useDispatch();

    const movingRelationshipSegment = useSelector((state: IStoreState) => {
        if (canvasOperation.type === CanvasOperationEnum.MOVE_RELATIONSHIP_SEGMENT ||
            canvasOperation.type === CanvasOperationEnum.MOVE_RELATIONSHIP_HEAD ||
            canvasOperation.type === CanvasOperationEnum.MOVE_RELATIONSHIP_TAIL
            ) {
            return state.umlClassDiagram.relationshipSegments.byId[canvasOperation.elementId];
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
    const newRelationship = useSelector((state: IStoreState) => state.umlClassDiagram.newRelationship);

    const onMouseMove = (coordinates: ICoordinates, previousMousePosition: ICoordinates) => {
        let updatedElement: IBaseElement<any, any>;
        if (selectedElement) {
            switch(canvasOperation.type) {
                case CanvasOperationEnum.RESIZE_ELEMENT_LEFT:
                    updatedElement = resizeFrame(selectedElement, coordinates, Direction.LEFT);
                    switch(selectedElement.type) {
                        case ClassDiagramElementsEnum.CLASS:
                            dispatch(updateClass(updatedElement));
                            break;
                        case ClassDiagramElementsEnum.UTILITY:
                            dispatch(updateUtility(updatedElement));
                            break;
                        case ClassDiagramElementsEnum.PRIMITIVE_TYPE:
                            dispatch(updatePrimitiveType(updatedElement));
                            break;
                        case ClassDiagramElementsEnum.INTERFACE:
                            dispatch(updateInterface(updatedElement));
                            break;
                        case ClassDiagramElementsEnum.ENUMERATION:
                            dispatch(updateEnumeration(updatedElement));
                            break;
                        case ClassDiagramElementsEnum.DATA_TYPE:
                            dispatch(updateDataType(updatedElement));
                            break;
                        case ClassDiagramElementsEnum.OBJECT:
                            dispatch(updateObject(updatedElement));
                            break;
                    }
                    break;
                case CanvasOperationEnum.RESIZE_ELEMENT_RIGHT:
                    updatedElement = resizeFrame(selectedElement, coordinates, Direction.RIGHT);
                    switch(selectedElement.type) {
                        case ClassDiagramElementsEnum.CLASS:
                            dispatch(updateClass(updatedElement));
                            break;
                        case ClassDiagramElementsEnum.UTILITY:
                            dispatch(updateUtility(updatedElement));
                            break;
                        case ClassDiagramElementsEnum.PRIMITIVE_TYPE:
                            dispatch(updatePrimitiveType(updatedElement));
                            break;
                        case ClassDiagramElementsEnum.INTERFACE:
                            dispatch(updateInterface(updatedElement));
                            break;
                        case ClassDiagramElementsEnum.ENUMERATION:
                            dispatch(updateEnumeration(updatedElement));
                            break;
                        case ClassDiagramElementsEnum.DATA_TYPE:
                            dispatch(updateDataType(updatedElement));
                            break;
                        case ClassDiagramElementsEnum.OBJECT:
                            dispatch(updateObject(updatedElement));
                            break;
                    }
                    break;
                case CanvasOperationEnum.MOVE_ELEMENT:
                    switch(selectedElement.type) {
                        case ClassDiagramElementsEnum.CLASS:
                            dispatch(updateClass(moveClass(selectedElement as IClass, coordinates, previousMousePosition)));
                            break;
                        case ClassDiagramElementsEnum.UTILITY:
                            dispatch(updateUtility(moveUtility(selectedElement as IUtility, coordinates, previousMousePosition)));
                            break;
                        case ClassDiagramElementsEnum.PRIMITIVE_TYPE:
                            dispatch(updatePrimitiveType(movePrimitiveType(selectedElement as IPrimitiveType, coordinates, previousMousePosition)));
                            break;
                        case ClassDiagramElementsEnum.INTERFACE:
                            dispatch(updateInterface(moveInterface(selectedElement as IInterface, coordinates, previousMousePosition)));
                            break;
                        case ClassDiagramElementsEnum.ENUMERATION:
                            dispatch(updateEnumeration(moveEnumeration(selectedElement as IEnumeration, coordinates, previousMousePosition)));
                            break;
                        case ClassDiagramElementsEnum.DATA_TYPE:
                            dispatch(updateDataType(moveDataType(selectedElement as IDataType, coordinates, previousMousePosition)));
                            break;
                        case ClassDiagramElementsEnum.OBJECT:
                            dispatch(updateObject(moveObject(selectedElement as IObject, coordinates, previousMousePosition)));
                            break;
                    }
                    break;
            }
        } else if (isMouseDown) {
            switch (canvasOperation.type) {
                case CanvasOperationEnum.DRAWING_NEW_RELATION:
                    let fixX = newRelationship.relationship.tail.x > coordinates.x ? -0.5 : 0.5;
                    const updatedRelationship = createNewRelationship({
                        x1: newRelationship.relationship.tail.x,
                        y1: newRelationship.relationship.tail.y,
                        x2: coordinates.x - fixX,
                        y2: coordinates.y
                    });
                    dispatch(updateNewRelationship({
                        ...updatedRelationship,
                        relationship: {
                            ...updatedRelationship.relationship,
                            fromElementId: newRelationship.relationship.fromElementId,
                            toElementId: newRelationship.relationship.toElementId
                        }
                    }));
                    break;
                case CanvasOperationEnum.MOVE_RELATIONSHIP_HEAD:
                    const dependentSegments = movingRelationship.relationshipSegments.filter((segment) => {
                        return segment.id === movingRelationshipSegment.toSegmentId || segment.id === movingRelationshipSegment.fromSegmentId;
                    });
                    const { relationship, relationshipSegments } = updateRelationshipEndingHelper(
                        coordinates,
                        movingRelationship.relationship,
                        movingRelationshipSegment,
                        dependentSegments
                    );
                    relationship.fromElementId = movingRelationship.relationship.fromElementId;
                    relationship.toElementId = movingRelationship.relationship.toElementId;
                    relationshipSegments.forEach((segment) => {
                        if (classDiagram.relationshipSegments.allIds.includes(segment.id)) {	
                            dispatch(updateRelationshipSegment(segment));	
                        } else {	
                            dispatch(addNewRelationshipSegment(segment));	
                        }
                    });
                    dispatch(updateRelationship(relationship));
                    break;
                case CanvasOperationEnum.MOVE_RELATIONSHIP_TAIL:
                    break;
                case CanvasOperationEnum.MOVE_RELATIONSHIP_SEGMENT:
                    if (movingRelationshipSegment) {
                        // const { relationship, relationshipSegments } = updateRelationshipHelper(
                        //     movingRelationshipSegment.direction,
                        //     movingRelationship.relationship,
                        //     movingRelationship.relationshipSegments,
                        //     movingRelationshipSegment.id,
                        //     coordinates
                        // );
                        const dependentSegments = movingRelationship.relationshipSegments.filter((segment) => {
                            return segment.id === movingRelationshipSegment.toSegmentId || segment.id === movingRelationshipSegment.fromSegmentId;
                        });
                        const { relationship, relationshipSegments } = updateRelationshipHelper(
                            coordinates,
                            movingRelationship.relationship,
                            movingRelationshipSegment,
                            dependentSegments
                        );
                        relationship.fromElementId = movingRelationship.relationship.fromElementId;
                        relationship.toElementId = movingRelationship.relationship.toElementId;
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
    };

    return { onMouseMove };
};

export default useCanvasMouseMove;