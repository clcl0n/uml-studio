import { useDispatch, useSelector } from 'react-redux';
import ICoordinates from '@interfaces/ICoordinates';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import resizeElementHelper from 'utils/classDiagramHelper/resizeElementHelper';
import { updateClass, updateUtility, updatePrimitiveType, updateInterface, updateEnumeration, updateDataType, updateObject, updateNewRelationship, updateRelationshipSegment, addNewRelationshipSegment, updateRelationship } from '@store/actions/classDiagram';
import Direction from '@enums/direction';
import moveClassHelper from 'utils/classDiagramHelper/class/moveClassHelper';
import moveUtilityHelper from 'utils/classDiagramHelper/utility/moveUtilityHelper';
import movePrimitiveTypeHelper from 'utils/classDiagramHelper/primitive-type/movePrimitiveTypeHelper';
import moveInterfaceHelper from 'utils/classDiagramHelper/interface/moveInterfaceHelper';
import moveEnumerationHelper from 'utils/classDiagramHelper/enumeration/moveEnumerationHelper';
import moveDataTypeHelper from 'utils/classDiagramHelper/dataType/moveDataTypeHelper';
import moveObjectHelper from 'utils/classDiagramHelper/object/moveObjectHelper';
import IObject from '@interfaces/class-diagram/object/IObject';
import IClass from '@interfaces/class-diagram/class/IClass';
import IUtility from '@interfaces/class-diagram/utility/IUtility';
import IPrimitiveType from '@interfaces/class-diagram/primitive-type/IPrimitiveType';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import IEnumeration from '@interfaces/class-diagram/enumeration/IEnumeration';
import IDataType from '@interfaces/class-diagram/data-type/IDataType';
import { isMouseDown } from '@store/actions/canvas';
import createNewRelationship from 'utils/classDiagramHelper/createNewRelationship';
import { updateRelationshipEndingHelper, updateRelationshipHelper } from 'utils/classDiagramHelper/relationship';
import IStoreState from '@interfaces/IStoreState';
import IClassDiagramState from '@interfaces/class-diagram/IClassDiagramState';
import IBaseElement from '@interfaces/class-diagram/common/IBaseElement';
import ICanvasOperation from '@interfaces/ICanvasOperation';

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
        if (selectedElement) {
            switch(canvasOperation.type) {
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
                            dispatch(updateClass(moveClassHelper(selectedElement as IClass, coordinates, previousMousePosition)));
                            break;
                        case ClassDiagramElementsEnum.UTILITY:
                            dispatch(updateUtility(moveUtilityHelper(selectedElement as IUtility, coordinates, previousMousePosition)));
                            break;
                        case ClassDiagramElementsEnum.PRIMITIVE_TYPE:
                            dispatch(updatePrimitiveType(movePrimitiveTypeHelper(selectedElement as IPrimitiveType, coordinates, previousMousePosition)));
                            break;
                        case ClassDiagramElementsEnum.INTERFACE:
                            dispatch(updateInterface(moveInterfaceHelper(selectedElement as IInterface, coordinates, previousMousePosition)));
                            break;
                        case ClassDiagramElementsEnum.ENUMERATION:
                            dispatch(updateEnumeration(moveEnumerationHelper(selectedElement as IEnumeration, coordinates, previousMousePosition)));
                            break;
                        case ClassDiagramElementsEnum.DATA_TYPE:
                            dispatch(updateDataType(moveDataTypeHelper(selectedElement as IDataType, coordinates, previousMousePosition)));
                            break;
                        case ClassDiagramElementsEnum.OBJECT:
                            dispatch(updateObject(moveObjectHelper(selectedElement as IObject, coordinates, previousMousePosition)));
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