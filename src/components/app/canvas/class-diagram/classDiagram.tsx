import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IClassDiagramState from '@interfaces/class-diagram/IClassDiagramState';
import Class from './class/class';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import IUtilityProperty from '@interfaces/class-diagram/utility/IUtilityProperty';
import IUtilityMethod from '@interfaces/class-diagram/utility/IUtilityMethod';
import EntryTypeEnum from '@enums/EntryTypeEnum';
import Utility from './utility/utility';
import PrimitiveType from './primitive-type/primitiveType';
import ObjectElement from './object/objectElement';
import IObjectSlot from '@interfaces/class-diagram/object/IObjectSlot';
import Interface from './interface/interface';
import IInterfaceProperty from '@interfaces/class-diagram/interface/IInterfaceProperty';
import IInterfaceMethod from '@interfaces/class-diagram/interface/IInterfaceMethod';
import Enumeration from './enumeration/enumeration';
import DataType from './data-type/dataType';
import Relationship from './relationship/relationship';

const ClassDiagram = (props: { classDiagram: IClassDiagramState }) => {
    const { classDiagram } = props;
    let elements: Array<JSX.Element> = [];

    classDiagram.elements.allIds.forEach((id) => {
        const element = classDiagram.elements.byId[id];
        const properties = element.data.entryIds.filter((id) => {
            return classDiagram.elementEntries.byId[id].type === EntryTypeEnum.PROPERTY;
        }).map((id) => classDiagram.elementEntries.byId[id]);
        const methods = element.data.entryIds.filter((id) => {
            return classDiagram.elementEntries.byId[id].type === EntryTypeEnum.METHOD;
        }).map((id) => classDiagram.elementEntries.byId[id]);
        const slots = element.data.entryIds.filter((id) => {
            return classDiagram.elementEntries.byId[id].type === EntryTypeEnum.SLOT;
        }).map((id) => classDiagram.elementEntries.byId[id]);
        const entries = element.data.entryIds.filter((id) => {
            return classDiagram.elementEntries.byId[id].type === EntryTypeEnum.BASE;
        }).map((id) => classDiagram.elementEntries.byId[id]);

        switch(element.type) {
            case ClassDiagramElementsEnum.CLASS: 
                elements.push(
                    <Class
                        key={id}
                        class={element}
                        properties={properties as Array<IClassProperty>}
                        methods={methods as Array<IClassMethod>}
                    />
                );
                break;
            case ClassDiagramElementsEnum.UTILITY:
                elements.push(
                    <Utility 
                        key={id}
                        utility={element}
                        properties={properties as Array<IUtilityProperty>}
                        methods={methods as Array<IUtilityMethod>}
                    />
                );      
                break;
            case ClassDiagramElementsEnum.PRIMITIVE_TYPE:
                elements.push(
                    <PrimitiveType
                        key={id}
                        primitive={element}
                    />
                );
                break;
            case ClassDiagramElementsEnum.OBJECT:
                elements.push(
                    <ObjectElement
                        key={id}
                        object={element}
                        slots={slots as Array<IObjectSlot>}
                    />
                );
                break;
            case ClassDiagramElementsEnum.INTERFACE:
                elements.push(
                    <Interface
                        key={id}
                        interface={element}
                        properties={properties as Array<IInterfaceProperty>}
                        methods={methods as Array<IInterfaceMethod>}
                    />
                );
                break;
            case ClassDiagramElementsEnum.ENUMERATION:
                elements.push(
                    <Enumeration
                        key={id}
                        enumeration={element}
                        entries={entries}
                    />
                );
                break;
            case ClassDiagramElementsEnum.DATA_TYPE:
                elements.push(
                    <DataType
                        key={id}
                        dataType={element}
                        entries={entries}
                    />
                );
                break;
        }
    });

    classDiagram.relationships.allIds.forEach((relationshipId) => {
        const relationship = classDiagram.relationships.byId[relationshipId];
        const relationshipSegments = relationship.segmentIds.map((segmentId) => classDiagram.relationshipSegments.byId[segmentId]);
        elements.push(
            <Relationship
                key={relationshipId}
                relationship={relationship}
                relationshipSegments={relationshipSegments}
            />
        );
    });

    if (classDiagram.newRelationship.relationship !== null) {
        elements.push(
            <Relationship
                key={elements.length + 1}
                relationship={classDiagram.newRelationship.relationship}
                relationshipSegments={classDiagram.newRelationship.relationshipSegments}
            />
        );
    }

    return (
        <g>
            {...elements}
        </g>
    );
};

export default ClassDiagram;