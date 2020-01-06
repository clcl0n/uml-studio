import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IClassDiagramState from '@interfaces/class-diagram/IClassDiagramState';
import IClassProps from '@interfaces/class-diagram/class/IClassProps';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import SegmentDirection from '@enums/segmentDirection';
import IInterfaceProps from '@interfaces/class-diagram/interface/IInterfaceProps';
import IUtilityProps from '@interfaces/class-diagram/utility/IUtilityProps';
import IEnumerationProps from '@interfaces/class-diagram/enumeration/IEnumerationProps';
import IDataTypeProps from '@interfaces/class-diagram/data-type/IDataTypeProps';
import IPrimitiveTypeProps from '@interfaces/class-diagram/primitive-type/IPrimitiveTypeProps';
import Association from './relationships/association/association';
import Interface from './interface/interface';
import Utility from './utility/utility';
import Enumeration from './enumeration/enumeration';
import DataType from './data-type/dataType';
import PrimitiveType from './primitive-type/primitiveType';
import Class from './class/class';
import IObjectProps from '@interfaces/class-diagram/object/IObjectProps';
import ObjectElement from './object/objectElement';

const ClassDiagram = (props: {
    classDiagram: IClassDiagramState,
    updateCanvasOperation: React.Dispatch<React.SetStateAction<{type: CanvasOperationEnum, data: any}>>,
    setCurrentlyDrawingRelation: React.Dispatch<React.SetStateAction<{ x1: number, y1: number, x2: number, y2: number}>>,
}) => {
    const { classDiagram, updateCanvasOperation, setCurrentlyDrawingRelation } = props;
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
        }),
        ...classDiagram.dataTypes.allIds.map((id) => {
            const dataTypeElement = classDiagram.dataTypes.byId[id];
            const dataTypeEntries = dataTypeElement.data.dataTypeEntryIds.map((id) => classDiagram.dataTypeEntries.byId[id]);
            
            const props: IDataTypeProps = {
                dataType: dataTypeElement,
                entries: dataTypeEntries,
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
                <DataType key={id} {...props}/>
            );
        }),
        ...classDiagram.primitiveTypes.allIds.map((id) => {
            const primitiveTypeElement = classDiagram.primitiveTypes.byId[id];
            
            const props: IPrimitiveTypeProps = {
                primitive: primitiveTypeElement,
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
                <PrimitiveType key={id} {...props}/>
            );
        }),
        ...classDiagram.objects.allIds.map((id) => {
            const objectElement = classDiagram.objects.byId[id];
            const objectSlots = objectElement.data.slotIds.map((id) => classDiagram.objectSlots.byId[id]);
            
            const objectProps: IObjectProps = {
                object: objectElement,
                slots: objectSlots,
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
                <ObjectElement key={id} {...objectProps}/>
            );
        }),
    );

    return (
        <g>
            {...elements}
        </g>
    );
};

export default ClassDiagram;