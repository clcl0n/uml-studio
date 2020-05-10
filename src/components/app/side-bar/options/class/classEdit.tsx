import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as log from 'loglevel';
import IClass from '@interfaces/class-diagram/class/IClass';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import { v4 } from 'uuid';
import IStoreState from '@interfaces/IStoreState';
import AccessModifierEnum from '@enums/accessModifierEnum';
import './class-edit.scss';
import FrameEdit from '../common/frameEdit';
import ClassAttributeRow from './classAttributeRow';
import { updateClassGraphicData } from '@utils/elements/class';
import { addNewElementEntry, updateElement, removeElementEntry, updateElementEntry, updateRelationshipSegment, updateRelationship } from '@store/actions/classDiagram.action';
import EntryTypeEnum from '@enums/EntryTypeEnum';
import ClassPropertyEdit from './classPropertyEdit';
import ClassMethodEdit from './classMethodEdit';
import { update } from 'lodash-es';
import SegmentDirection from '@enums/segmentDirection';

const ClassEditOptions = (props: { class: IClass, properties: Array<IClassProperty>, methods: Array<IClassMethod> }) => {
    const dispatch = useDispatch();
    const { data } = props.class;
    const { methods, properties } = props;
    const relationships = useSelector((store: IStoreState) => store.classDiagram.relationships);
    const relationshipsSegments = useSelector((store: IStoreState) => store.classDiagram.relationshipSegments);

    const updateGraphic = (classElement: IClass, propertiesLength: number, methodsLength: number): IClass =>  {
        return updateClassGraphicData(classElement, propertiesLength, methodsLength);
    };

    const removeEntry = (classEntry: IClassProperty | IClassMethod) => {
        const updatedClass = {...props.class};
        let propertiesLength = properties.length;
        let methodsLength = methods.length;
        classEntry.type === EntryTypeEnum.PROPERTY ? propertiesLength-- : methodsLength--;
        updatedClass.data.entryIds.splice(updatedClass.data.entryIds.indexOf(classEntry.id), 1);

        const updatedElement = updateGraphic(updatedClass, propertiesLength, methodsLength);
        const toElementRelationshipsIds = relationships.allIds.filter(id => relationships.byId[id].toElementId === updatedElement.id);
        const toElementRelationships = toElementRelationshipsIds.map((id) => relationships.byId[id]);
        toElementRelationships.forEach(rel => {
            if (rel.head.y !== props.class.graphicData.frame.y) {
                rel.head.y = updatedElement.graphicData.frame.y + updatedElement.graphicData.frame.height;
                const end = relationshipsSegments.byId[rel.segmentIds.find(segmentId => relationshipsSegments.byId[segmentId].isEnd)];
                const endDependent = relationshipsSegments.byId[end.fromSegmentId];
                let yDiff = -25;
                end.y = updatedElement.graphicData.frame.y + updatedElement.graphicData.frame.height; 
                if (end.direction === SegmentDirection.HORIZONTAL) {
                    endDependent.lineToY += yDiff;
                } else {
                    if (end.y < updatedElement.graphicData.frame.y + updatedElement.graphicData.frame.height) {
                        end.lineToY += yDiff;
                    } else {
                        end.y -= end.lineToY;
                        endDependent.y += yDiff;
                        const dependentToEndDependent = relationshipsSegments.byId[endDependent.fromSegmentId];
                        dependentToEndDependent.lineToY += yDiff;
                        dispatch(updateRelationshipSegment(dependentToEndDependent));
                    }
                    // end.lineToY += yDiff;
                }
                dispatch(updateRelationshipSegment(end));
                dispatch(updateRelationshipSegment(endDependent));
                dispatch(updateRelationship(rel));
            }
        });

        dispatch(updateElement(updatedClass));
        dispatch(removeElementEntry(classEntry));
    };
    
    const updateMethod = (newMethodName: string, classMethod: IClassMethod) => {
        dispatch(updateElementEntry({
            ...classMethod,
            value: newMethodName
        }));
    };

    const updateProperty = (newPropertyName: string, classProperty: IClassProperty) => {
        dispatch(updateElementEntry({
            ...classProperty,
            value: newPropertyName
        }));
    };

    const editProperties = () => {
        return properties.map((property, index) => {
            const newClassProperty = {...property};
            const onSelectNewOption = (newAccessModifier: AccessModifierEnum) => {
                newClassProperty.accessModifier = newAccessModifier;
                updateProperty(newClassProperty.value, newClassProperty);
            };

            return (
                <ClassAttributeRow
                    key={index}
                    classAttribute={property}
                    placeHolder='Property'
                    removeAttribute={removeEntry}
                    onSelectNewOption={onSelectNewOption}
                    updateAttribute={updateProperty}
                />
            );
        });        
    };

    const editMethods = () => {
        return methods.map((method, index) => {
            const newClassMethod = {...method};
            const onSelectNewOption = (newAccessModifier: AccessModifierEnum) => {
                newClassMethod.accessModifier = newAccessModifier;
                updateMethod(newClassMethod.value, newClassMethod);
            };
            
            return (
                <ClassAttributeRow
                    key={index}
                    classAttribute={method}
                    placeHolder='Methods'
                    removeAttribute={removeEntry}
                    onSelectNewOption={onSelectNewOption}
                    updateAttribute={updateMethod}
                />
            );
        });
    };

    const addNewEntry = (entryType: EntryTypeEnum) => {
        log.debug(`Added new Class Entry. Class Id: ${props.class.id}`);
        const newPropertyId = v4();
        dispatch(addNewElementEntry({
            id: newPropertyId,
            value: '',
            type: entryType,
            accessModifier: AccessModifierEnum.PUBLIC,
        }));
        let propertiesLength = properties.length;
        let methodsLength = methods.length;
        entryType === EntryTypeEnum.PROPERTY ? propertiesLength++ : methodsLength++;
        const updatedClass: IClass = {...props.class};
        updatedClass.data.entryIds.push(newPropertyId);

        const updatedElement = updateGraphic(updatedClass, propertiesLength, methodsLength);
        const toElementRelationshipsIds = relationships.allIds.filter(id => relationships.byId[id].toElementId === updatedElement.id);
        const toElementRelationships = toElementRelationshipsIds.map((id) => relationships.byId[id]);
        toElementRelationships.forEach(rel => {
            if (rel.head.y !== props.class.graphicData.frame.y) {
                rel.head.y = updatedElement.graphicData.frame.y + updatedElement.graphicData.frame.height;
                const end = relationshipsSegments.byId[rel.segmentIds.find(segmentId => relationshipsSegments.byId[segmentId].isEnd)];
                const endDependent = relationshipsSegments.byId[end.fromSegmentId];
                let yDiff = 25;
                end.y = updatedElement.graphicData.frame.y + updatedElement.graphicData.frame.height; 
                if (end.direction === SegmentDirection.HORIZONTAL) {
                    endDependent.lineToY += yDiff;
                } else {
                    if (end.y < updatedElement.graphicData.frame.y + updatedElement.graphicData.frame.height) {
                        end.lineToY += yDiff;
                    } else {
                        end.y -= end.lineToY;
                        endDependent.y += yDiff;
                        const dependentToEndDependent = relationshipsSegments.byId[endDependent.fromSegmentId];
                        dependentToEndDependent.lineToY += yDiff;
                        dispatch(updateRelationshipSegment(dependentToEndDependent));
                    }
                    // end.lineToY += yDiff;
                }
                dispatch(updateRelationshipSegment(end));
                dispatch(updateRelationshipSegment(endDependent));
                dispatch(updateRelationship(rel));
            }
        });


        dispatch(updateElement(updatedElement));
    };

    const onClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedClass: IClass = {...props.class};
        updatedClass.data.elementName = event.target.value;
        dispatch(updateElement(updateGraphic(updatedClass, properties.length, methods.length)));
    };

    return (
        <FrameEdit inputLabel='Class Name' frameName={data.elementName} onNameChange={(ev) => onClassNameChange(ev)}>
            <ClassPropertyEdit addNewEntry={addNewEntry} editProperties={editProperties}/>
            <ClassMethodEdit addNewEntry={addNewEntry} editMethods={editMethods}/>
        </FrameEdit>
    );
};

export default ClassEditOptions;