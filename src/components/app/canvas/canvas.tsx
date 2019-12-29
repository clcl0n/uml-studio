import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './canvas.scss';
import { useDispatch, useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import createNewClass from 'utils/classDiagramHelper/createNewClass';
import RibbonOperationEnum from '@enums/ribbonOperationEnum';
import { addNewClassMethod, addNewClassProperty, addNewClass, addNewRelationshipSegment, addNewRelationship, updateRelationship, updateRelationshipSegment, addNewInterface, addNewInterfaceMethod, addNewInterfaceProperty, addNewUtilityMethod, addNewUtility, addNewUtilityProperty, addNewEnumeration, addNewEnumerationEntry } from '@store/actions/classDiagram';
import IClassDiagramState from '@interfaces/class-diagram/IClassDiagramState';
import Class from './class-diagram/class/class';
import IClassProps from '@interfaces/class-diagram/class/IClassProps';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import ICoordinates from '@interfaces/ICoordinates';
import createNewRelationship from 'utils/classDiagramHelper/createNewRelationship';
import Association from './class-diagram/relationships/association/association';
import SegmentDirection from '@enums/segmentDirection';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import updateRelationshipHelper from 'utils/classDiagramHelper/updateRelationshipHelper';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import createNewInterfaceHelper from 'utils/classDiagramHelper/createNewInterfaceHelper';
import Interface from './class-diagram/interface/interface';
import IInterfaceProps from '@interfaces/class-diagram/interface/IInterfaceProps';
import IUtility from '@interfaces/class-diagram/utility/IUtility';
import createNewUtilityHelper from 'utils/classDiagramHelper/createNewUtilityHelper';
import IUtilityProps from '@interfaces/class-diagram/utility/IUtilityProps';
import Utility from './class-diagram/utility/utility';
import createNewEnumerationHelper from 'utils/classDiagramHelper/createNewEnumerationHelper';
import IEnumerationProps from '@interfaces/class-diagram/enumeration/IEnumerationProps';
import Enumeration from './class-diagram/enumeration/enumeration';

const createElements = (
        classDiagram: IClassDiagramState,
        updateCanvasOperation: React.Dispatch<React.SetStateAction<{type: CanvasOperationEnum, data: any}>>,
        setCurrentlyDrawingRelation: React.Dispatch<React.SetStateAction<{ x1: number, y1: number, x2: number, y2: number}>>
    ) => {
        let elements: Array<JSX.Element> = [];

        elements.push(
            ...classDiagram.classes.allIds.map((id) => {
                const classElement = classDiagram.classes.byId[id];
                const classProperties = classElement.data.classPropertyIds.map((id) => classDiagram.classProperties.byId[id]);
                const classMethods = classElement.data.classMethodIds.map((id) => classDiagram.classMethods.byId[id]);
                
                const props: IClassProps = {
                    class: classElement,
                    properties: classProperties,
                    methods: classMethods,
                    functionality: {
                        onJointClick: (event: React.MouseEvent) => {
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
                            });
                        }
                    }
                };
        
                return (
                    <Class key={id} {...props}/>
                );
            }),
            ...classDiagram.relationships.allIds.map((id) => {
                const relationship = classDiagram.relationships.byId[id];
                const relationshipSegments = relationship.segmentIds.map((segmentId) => classDiagram.relationshipSegments.byId[segmentId]);
                const onSegmentMove = (event: React.MouseEvent, segmentId: string, segmentDirection: SegmentDirection) => {
                    updateCanvasOperation({
                        type: CanvasOperationEnum.UPDATE_RELATION,
                        data: {
                            relationship,
                            relationshipSegments,
                            segmentId,
                            segmentDirection
                        }
                    });
                };
                return (
                    <Association
                        key={id}
                        relationship={relationship}
                        relationshipSegments={relationshipSegments}
                        functionality={{onSegmentMove}}
                    />
                );
            }),
            ...classDiagram.interfaces.allIds.map((id) => {
                const interfaceElement = classDiagram.interfaces.byId[id];
                const interfaceProperties = interfaceElement.data.interfacePropertyIds.map((id) => classDiagram.interfaceProperties.byId[id]);
                const interfaceMethods = interfaceElement.data.interfaceMethodIds.map((id) => classDiagram.interfaceMethods.byId[id]);
                
                const props: IInterfaceProps = {
                    interface: interfaceElement,
                    properties: interfaceProperties,
                    methods: interfaceMethods,
                    functionality: {
                        onJointClick: (event: React.MouseEvent) => {
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
                            });
                        }
                    }
                };

                return (
                    <Interface key={id} {...props}/>
                );
            }),
            ...classDiagram.utilities.allIds.map((id) => {
                const utilityElement = classDiagram.utilities.byId[id];
                const utilityProperties = utilityElement.data.utilityPropertyIds.map((id) => classDiagram.utilityProperties.byId[id]);
                const utilityMethods = utilityElement.data.utilityMethodIds.map((id) => classDiagram.utilityMethods.byId[id]);
                
                const props: IUtilityProps = {
                    utility: utilityElement,
                    properties: utilityProperties,
                    methods: utilityMethods,
                    functionality: {
                        onJointClick: (event: React.MouseEvent) => {
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
                            });
                        }
                    }
                };

                return (
                    <Utility key={id} {...props}/>
                );
            }),
            ...classDiagram.enumerations.allIds.map((id) => {
                const enumerationElement = classDiagram.enumerations.byId[id];
                const enumerationEntries = enumerationElement.data.enumerationEntryIds.map((id) => classDiagram.enumerationEntries.byId[id]);
                
                const props: IEnumerationProps = {
                    enumeration: enumerationElement,
                    entries: enumerationEntries,
                    functionality: {
                        onJointClick: (event: React.MouseEvent) => {
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
                            });
                        }
                    }
                };

                return (
                    <Enumeration key={id} {...props}/>
                );
            })
        );

        return elements;
};

const Canvas = () => {
    const dispatch = useDispatch();
    const classDiagram = useSelector((state: IStoreState) => state.umlClassDiagram);
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
            case CanvasOperationEnum.MOVE_CLASS:
                // const selectedClass = useSelector((state: IStoreState) => state.canvas.elements.find((element) => element.elementData.id === (canvasOperation.data as any).classId));
                // selectedClass.elementGraphicData.
                // dispatch(updateElement(selectedClass));
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
                break;
            case RibbonOperationEnum.ADD_NEW_EMPTY_CLASS:
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
                break;
            case RibbonOperationEnum.ADD_NEW_UTILITY:
                const { newUtility, newUtilityProperty, newUtilityMethod } = createNewUtilityHelper(coordinates);
                dispatch(addNewUtilityMethod(newUtilityMethod));
                dispatch(addNewUtilityProperty(newUtilityProperty));
                dispatch(addNewUtility(newUtility));
                break;
        }
    };
    return (
        <div id='canvas' onClick={(ev) => canvasMouseClick(ev)} onMouseMove={(ev) => canvasMouseMove(ev)} onDragOver={(ev) => CanvasOnDragOver(ev)} onDrop={(ev) => CanvasOnDrop(ev)}>
            <svg id='svg-canvas' width='100%' height='100%'>
                <g>
                    {...createElements(classDiagram, updateCanvasOperation, setCurrentlyDrawingRelation)}
                </g>    
                <line stroke='black' x1={currentlyDrawingRelation.x1} x2={currentlyDrawingRelation.x2} y1={currentlyDrawingRelation.y1} y2={currentlyDrawingRelation.y2}/>
            </svg>
        </div>
    );
};

export default Canvas;

