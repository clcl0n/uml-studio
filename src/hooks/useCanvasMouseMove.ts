import { useDispatch, useSelector } from 'react-redux';
import ICoordinates from '@interfaces/ICoordinates';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import Direction from '@enums/direction';
import IObject from '@interfaces/class-diagram/object/IObject';
import IUtility from '@interfaces/class-diagram/utility/IUtility';
import IPrimitiveType from '@interfaces/class-diagram/primitive-type/IPrimitiveType';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import IEnumeration from '@interfaces/class-diagram/enumeration/IEnumeration';
import IDataType from '@interfaces/class-diagram/data-type/IDataType';
import { isMouseDown } from '@store/actions/canvas.action';
import { updateRelationshipEndingHelper, updateRelationshipHelper, createNewRelationship, updateRelationshipStartingHelper, getClassHeadOffset } from '@utils/elements/relationship';
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
import { updateElement, updateNewRelationship, updateRelationshipSegment, addNewRelationshipSegment, updateRelationship } from '@store/actions/classDiagram.action';
import useCanvasOperation from './useCanvasOperation';
import useCanvasDefaultRelationshipType from './useCanvasDefaultRelationshipType';
import IStateDiagramState from '@interfaces/state-diagram/IStateDiagramState';
import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';
import { updateStateElement, updateInitialStateElement, updateFinalStateElement } from '@store/actions/stateDiagram.action';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import { moveStateElement, moveInitialStateElement, moveFinalStateElement } from '@utils/elements/stateElement';
import ClassDiagramRelationshipTypesEnum from '@enums/classDiagramRelationshipTypesEnum';
import IInitialStateElement from '@interfaces/state-diagram/initial-state/IInitialStateElement';
import IFinalStateElement from '@interfaces/state-diagram/final-state/IFinalStateElement';
import SegmentDirection from '@enums/segmentDirection';
import IBaseElementGraphicData from '@interfaces/class-diagram/common/IBaseElementGraphicData';

const useCanvasMouseMove = (
    classDiagram: IClassDiagramState,
    stateDiagram: IStateDiagramState,
    canvasOperation: ICanvasOperation
) => {
    const dispatch = useDispatch();
    const { canvasDefaultRelationshipType } = useCanvasDefaultRelationshipType();
    const { selectedElement, selectedProperties } = useCanvasOperation();

    const movingRelationshipSegment = useSelector((state: IStoreState) => {
        if (canvasOperation.type === CanvasOperationEnum.MOVE_RELATIONSHIP_SEGMENT ||
            canvasOperation.type === CanvasOperationEnum.MOVE_RELATIONSHIP_HEAD ||
            canvasOperation.type === CanvasOperationEnum.MOVE_RELATIONSHIP_TAIL
            ) {
            return state.classDiagram.relationshipSegments.byId[canvasOperation.elementId];
        }
    });
    const movingRelationship = useSelector((state: IStoreState) => {
        if (movingRelationshipSegment) {
            const relationship = state.classDiagram.relationships.byId[movingRelationshipSegment.relationshipId];
            const relationshipSegments = relationship.segmentIds.map((segmentId) => {
                return state.classDiagram.relationshipSegments.byId[segmentId];
            });
            return {
                relationship,
                relationshipSegments
            };
        }
    });
    const newRelationship = useSelector((state: IStoreState) => state.classDiagram.newRelationship);

    
    const onMouseMove = (coordinates: ICoordinates, previousMousePosition: ICoordinates) => {
        const updateRelationshipsAfterResizeElementHorizont = (xShift: number, direction: Direction, resized: IBaseElement<IBaseElementGraphicData<any>> | IStateElement) => {
            const toElementRelationshipsIds = classDiagram.relationships.allIds.filter((id) => classDiagram.relationships.byId[id].toElementId === selectedElement.id);
            const toElementRelationships = toElementRelationshipsIds.map((id) => classDiagram.relationships.byId[id]);
            toElementRelationships.forEach((toRelationship) => {
                const segments = toRelationship.segmentIds.map((id) => classDiagram.relationshipSegments.byId[id]);
                const endingSegment = segments.filter((segment) => segment.isEnd)[0];
                if (direction === Direction.RIGHT) {
                    if (resized.graphicData.frame.x < endingSegment.x + endingSegment.lineToX) {
                        // idu z prava do elementu
                        toRelationship.head.x += xShift;
                        if (endingSegment.direction === SegmentDirection.VERTICAL) {
                            endingSegment.x += xShift;
                            const dependent = segments.find(s => s.toSegmentId === endingSegment.id);
                            dependent.lineToX += xShift;
                        } else {
                            endingSegment.lineToX += xShift;
                        }
                    }
                } else if (direction === Direction.LEFT) {
                    if (resized.graphicData.frame.x + resized.graphicData.frame.width !== endingSegment.x + endingSegment.lineToX) {
                        // ide z lava
                        toRelationship.head.x -= xShift; 
                        if (endingSegment.direction === SegmentDirection.VERTICAL) {
                            endingSegment.x -= xShift;
                            const dependent = segments.find(s => s.toSegmentId === endingSegment.id);
                            dependent.lineToX -= xShift;
                        } else {
                            endingSegment.lineToX -= xShift;
                        }
                    }
                }
                dispatch(updateRelationship(toRelationship));
                [...segments.filter((segment) => segment.toSegmentId === endingSegment.id), endingSegment].forEach((segment) => dispatch(updateRelationshipSegment(segment)));
            });
            const fromElementRelationshipsIds = classDiagram.relationships.allIds.filter(id =>  classDiagram.relationships.byId[id].fromElementId === selectedElement.id);
            const fromElementRelationships = fromElementRelationshipsIds.map((id) => classDiagram.relationships.byId[id]);
            fromElementRelationships.forEach(fromRelationship => {
                const segments = fromRelationship.segmentIds.map((id) => classDiagram.relationshipSegments.byId[id]);
                const startingSegment = segments.filter((segment) => segment.isStart)[0];
                if (direction === Direction.RIGHT) {
                    if (resized.graphicData.frame.x < startingSegment.x) {
                        // idu z prava do elementu
                        startingSegment.x += xShift;
                        if (startingSegment.direction === SegmentDirection.VERTICAL) {
                            fromRelationship.tail.x += xShift;
                            const dependent = segments.find(s => s.fromSegmentId === startingSegment.id);
                            dependent.lineToX -= xShift;
                            dependent.x += xShift;
                        } else {
                            startingSegment.lineToX -= xShift;
                        }
                    }
                } else if (direction === Direction.LEFT) {
                    if (resized.graphicData.frame.x + resized.graphicData.frame.width !== startingSegment.x) {
                        // ide z lava
                        fromRelationship.tail.x -= xShift; 
                        startingSegment.x -= xShift;
                        if (startingSegment.direction === SegmentDirection.VERTICAL) {
                            const dependent = segments.find(s => s.fromSegmentId === startingSegment.id);
                            dependent.lineToX += xShift;
                            dependent.x -= xShift;
                        } else {
                            startingSegment.lineToX += xShift;
                        }
                    }
                }
                dispatch(updateRelationship(fromRelationship));
                [...segments.filter((segment) => segment.toSegmentId === startingSegment.id), startingSegment].forEach((segment) => dispatch(updateRelationshipSegment(segment)));
            });
        }
        const moveDependingRelationships = () => {
            const toElementRelationshipsIds = classDiagram.relationships.allIds.filter((id) => classDiagram.relationships.byId[id].toElementId === selectedElement.id);
            const toElementRelationships = toElementRelationshipsIds.map((id) => classDiagram.relationships.byId[id]);
            toElementRelationships.forEach((toRelationship) => {
                const xShift = toRelationship.head.x - previousMousePosition.x;
                const yShift = toRelationship.head.y - previousMousePosition.y;
                const segments = toRelationship.segmentIds.map((id) => classDiagram.relationshipSegments.byId[id]);
                const endingSegment = segments.filter((segment) => segment.isEnd)[0];
                // if (toRelationship.type === ClassDiagramRelationshipTypesEnum.AGGREGATION) {
                    //     fixX = endingSegment.lineToX < 0 ? 30 : 0;
                    // }
                const { relationship, relationshipSegments } = updateRelationshipEndingHelper(
                    { x: coordinates.x + xShift, y: coordinates.y + yShift },
                    toRelationship,
                    segments.filter((segment) => segment.toSegmentId === endingSegment.id),
                    endingSegment
                );
                dispatch(updateRelationship(relationship));
                relationshipSegments.forEach((segment) => dispatch(updateRelationshipSegment(segment)));
            });
            const fromElementRelationshipsIds = classDiagram.relationships.allIds.filter((id) => classDiagram.relationships.byId[id].fromElementId === selectedElement.id);
            const fromElementRelationships = fromElementRelationshipsIds.map((id) => classDiagram.relationships.byId[id]);
            fromElementRelationships.forEach((fromRelationship) => {
                const xShift = fromRelationship.tail.x - previousMousePosition.x;
                const yShift = fromRelationship.tail.y - previousMousePosition.y;
                const segments = fromRelationship.segmentIds.map((id) => classDiagram.relationshipSegments.byId[id]);
                const startingSegment = segments.filter((segment) => segment.isStart)[0];
                const { relationship, relationshipSegments } = updateRelationshipStartingHelper(
                    { x: coordinates.x + xShift, y: coordinates.y + yShift },
                    fromRelationship,
                    startingSegment,
                    segments.filter((segment) => segment.fromSegmentId === startingSegment.id)
                );
                updateRelationship(relationship);
                relationshipSegments.forEach((segment) => updateRelationshipSegment(segment));
            });
        };
        if (selectedElement) {
            switch(canvasOperation.type) {
                case CanvasOperationEnum.RESIZE_ELEMENT_UP:
                    if (selectedElement.type === StateDiagramElementsEnum.STATE) {
                        const resized = resizeFrame(selectedElement as IStateElement, coordinates, Direction.UP) as IStateElement;
                        dispatch(updateStateElement(resized));
                    } else {
                        dispatch(updateElement(resizeFrame(selectedElement as IStateElement, coordinates, Direction.UP) as IBaseElement<any>));
                    }
                    break;
                case CanvasOperationEnum.RESIZE_ELEMENT_DOWN:
                    if (selectedElement.type === StateDiagramElementsEnum.STATE) {
                        const resized = resizeFrame(selectedElement as IStateElement, coordinates, Direction.DOWN) as IStateElement;
                        dispatch(updateStateElement(resized));
                    } else {
                        dispatch(updateElement(resizeFrame(selectedElement as IStateElement, coordinates, Direction.DOWN) as IBaseElement<any>));
                    }
                    break;
                case CanvasOperationEnum.RESIZE_ELEMENT_LEFT:
                    if (selectedElement.type === StateDiagramElementsEnum.STATE) {
                        const lastWidth = (selectedElement as IStateElement).graphicData.frame.width;
                        const resized = resizeFrame(selectedElement as IStateElement, coordinates, Direction.LEFT) as IStateElement;
                        updateRelationshipsAfterResizeElementHorizont(resized.graphicData.frame.width - lastWidth, Direction.LEFT, resized);
                        dispatch(updateStateElement(resized));
                    } else {
                        const lastWidth = (selectedElement as IBaseElement<IBaseElementGraphicData<any>>).graphicData.frame.width;
                        const resized = resizeFrame(selectedElement as IStateElement, coordinates, Direction.LEFT) as IBaseElement<IBaseElementGraphicData<any>>;
                        updateRelationshipsAfterResizeElementHorizont(resized.graphicData.frame.width - lastWidth, Direction.LEFT, resized);
                        dispatch(updateElement(resized));
                    }
                    break;
                case CanvasOperationEnum.RESIZE_ELEMENT_RIGHT:
                    if (selectedElement.type === StateDiagramElementsEnum.STATE) {
                        const lastWidth = (selectedElement as IStateElement).graphicData.frame.width;
                        const resized = resizeFrame(selectedElement as IStateElement, coordinates, Direction.RIGHT) as IStateElement;
                        updateRelationshipsAfterResizeElementHorizont(resized.graphicData.frame.width - lastWidth, Direction.RIGHT, resized);
                        dispatch(updateStateElement(resized));
                    } else {
                        const lastWidth = (selectedElement as IBaseElement<IBaseElementGraphicData<any>>).graphicData.frame.width;
                        const resized = resizeFrame(selectedElement as IStateElement, coordinates, Direction.RIGHT) as IBaseElement<IBaseElementGraphicData<any>>;
                        updateRelationshipsAfterResizeElementHorizont(resized.graphicData.frame.width - lastWidth, Direction.RIGHT, resized);
                        dispatch(updateElement(resized));
                    }
                    break;
                case CanvasOperationEnum.MOVE_ELEMENT:
                    switch(selectedElement.type) {
                        case ClassDiagramElementsEnum.CLASS:
                            moveDependingRelationships();
                            dispatch(updateElement(moveClass(selectedElement, coordinates, previousMousePosition, selectedProperties.length)));
                            break;
                        case ClassDiagramElementsEnum.UTILITY:
                            moveDependingRelationships();
                            dispatch(updateElement(moveUtility(selectedElement as IUtility, coordinates, previousMousePosition, selectedProperties.length)));
                            break;
                        case ClassDiagramElementsEnum.PRIMITIVE_TYPE:
                            moveDependingRelationships();
                            dispatch(updateElement(movePrimitiveType(selectedElement as IPrimitiveType, coordinates, previousMousePosition)));
                            break;
                        case ClassDiagramElementsEnum.INTERFACE:
                            moveDependingRelationships();
                            dispatch(updateElement(moveInterface(selectedElement as IInterface, coordinates, previousMousePosition, selectedProperties.length)));
                            break;
                        case ClassDiagramElementsEnum.ENUMERATION:
                            moveDependingRelationships();
                            dispatch(updateElement(moveEnumeration(selectedElement as IEnumeration, coordinates, previousMousePosition)));
                            break;
                        case ClassDiagramElementsEnum.DATA_TYPE:
                            moveDependingRelationships();
                            dispatch(updateElement(moveDataType(selectedElement as IDataType, coordinates, previousMousePosition)));
                            break;
                        case ClassDiagramElementsEnum.OBJECT:
                            moveDependingRelationships();
                            dispatch(updateElement(moveObject(selectedElement as IObject, coordinates, previousMousePosition)));
                            break;
                        case StateDiagramElementsEnum.STATE:
                            moveDependingRelationships();
                            dispatch(updateStateElement(moveStateElement(selectedElement as IStateElement, coordinates, previousMousePosition)));
                            break;
                        case StateDiagramElementsEnum.INITIAL_STATE:
                            moveDependingRelationships();
                            dispatch(updateInitialStateElement(moveInitialStateElement(selectedElement as IInitialStateElement, coordinates, previousMousePosition)));  
                            break;
                        case StateDiagramElementsEnum.FINAL_STATE:
                            moveDependingRelationships();
                            dispatch(updateFinalStateElement(moveFinalStateElement(selectedElement as IFinalStateElement, coordinates, previousMousePosition)));
                            break;
                    }
                    break;
            }
        } else if (isMouseDown) {
            switch (canvasOperation.type) {
                case CanvasOperationEnum.DRAWING_NEW_RELATION:
                    let fixX = newRelationship.relationship.tail.x > coordinates.x ? -1 : 1;
                    if (
                        newRelationship.relationship.type === ClassDiagramRelationshipTypesEnum.AGGREGATION ||
                        newRelationship.relationship.type === ClassDiagramRelationshipTypesEnum.COMPOSITION
                    ) {
                        fixX += newRelationship.relationship.tail.x > coordinates.x ? -30 : 30;
                    } else if (
                        newRelationship.relationship.type === ClassDiagramRelationshipTypesEnum.EXTENSION
                    ) {
                        fixX += newRelationship.relationship.tail.x > coordinates.x ? -20 : 20;
                    }
                    const updatedRelationship = createNewRelationship(
                        canvasDefaultRelationshipType,
                        {
                            x1: newRelationship.relationship.tail.x,
                            y1: newRelationship.relationship.tail.y,
                            x2: coordinates.x - fixX,
                            y2: coordinates.y
                        }
                    );
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
                    const endSegment = movingRelationship.relationshipSegments.find((segment) => segment.isEnd);
                    const dependentEndSegments = movingRelationship.relationshipSegments.find(segment => segment.toSegmentId === endSegment.id);
                    let direction = movingRelationship.relationship.direction;
                    if (endSegment.y < movingRelationship.relationship.head.y) {
                        direction = Direction.DOWN;
                        coordinates.y -= 5;
                    } else if (endSegment.y > movingRelationship.relationship.head.y) {
                        direction = Direction.UP;
                        coordinates.y -= -5;
                    } else if (endSegment.x > movingRelationship.relationship.head.x) {
                        direction = Direction.LEFT;
                        coordinates.x -= -5;
                    } else {
                        coordinates.x -= 5;
                    }
                    let fixXx = getClassHeadOffset(movingRelationship.relationship.type);

                    const dependentSegments = movingRelationship.relationshipSegments.filter((segment) => {
                        return segment.id === movingRelationshipSegment.toSegmentId || segment.id === movingRelationshipSegment.fromSegmentId;
                    });
                    const { relationship, relationshipSegments } = updateRelationshipEndingHelper(
                        {
                            x: coordinates.x + (endSegment.lineToX > 0 ? -fixXx : fixXx),
                            y: coordinates.y
                        },
                        movingRelationship.relationship,
                        dependentSegments,
                        movingRelationshipSegment
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
                    const fixVal = 5;
                    const dependent = movingRelationship.relationshipSegments.find(rs => rs.fromSegmentId === movingRelationship.relationshipSegments.find(s => s.isStart).id);
                    if (dependent.direction === SegmentDirection.VERTICAL) {
                        coordinates.x -= dependent.x > coordinates.x ? -fixVal : fixVal;
                    } else {
                        coordinates.y -= dependent.y > coordinates.y ? -fixVal : fixVal;
                    }
                    const tailDependentSegments = movingRelationship.relationshipSegments.filter((segment) => {
                        return segment.id === movingRelationshipSegment.toSegmentId || segment.id === movingRelationshipSegment.fromSegmentId;
                    });
                    const { relationship: startingRelationships, relationshipSegments: startingRelationshipSegments } = updateRelationshipStartingHelper(
                        coordinates,
                        movingRelationship.relationship,
                        movingRelationshipSegment,
                        tailDependentSegments
                    );
                    startingRelationships.fromElementId = movingRelationship.relationship.fromElementId;
                    startingRelationships.toElementId = movingRelationship.relationship.toElementId;
                    startingRelationshipSegments.forEach((segment) => {
                        if (classDiagram.relationshipSegments.allIds.includes(segment.id)) {	
                            dispatch(updateRelationshipSegment(segment));	
                        } else {	
                            dispatch(addNewRelationshipSegment(segment));	
                        }
                    });
                    dispatch(updateRelationship(startingRelationships));
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