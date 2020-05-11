import React from 'react';
import ReactDOM from 'react-dom';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import { useDispatch, useSelector } from 'react-redux';
import AccessModifierEnum from '@enums/accessModifierEnum';
import IInterfaceMethod from '@interfaces/class-diagram/interface/IInterfaceMethod';
import IInterfaceProperty from '@interfaces/class-diagram/interface/IInterfaceProperty';
import ClassAttributeRow from '../class/classAttributeRow';
import log = require('loglevel');
import { v4 } from 'uuid';
import FrameEdit from '../common/frameEdit';
import { updateInterfaceGraphicData } from '@utils/elements/interface';
import { removeElementEntry, updateElement, updateElementEntry, addNewElementEntry, updateRelationshipSegment, updateRelationship } from '@store/actions/classDiagram.action';
import EntryTypeEnum from '@enums/EntryTypeEnum';
import ClassPropertyEdit from '../class/classPropertyEdit';
import ClassMethodEdit from '../class/classMethodEdit';
import SegmentDirection from '@enums/segmentDirection';
import IStoreState from '@interfaces/IStoreState';

const InterfaceEdit = (props: { interface: IInterface, properties: Array<IInterfaceProperty>, methods: Array<IInterfaceMethod> }) => {
    const dispatch = useDispatch();
    const { data } = props.interface;
    const { methods, properties } = props;
    const relationshipsSegments = useSelector((store: IStoreState) => store.classDiagram.relationshipSegments);
    const relationships = useSelector((store: IStoreState) => store.classDiagram.relationships);

    const updateGraphic = (interfaceElement: IInterface, propertiesLength: number, methodsLength: number): IInterface => {
        return updateInterfaceGraphicData(interfaceElement, propertiesLength, methodsLength);
    };       
        
    const removeEntry = (entry: IInterfaceProperty | IInterfaceMethod) => {
        const updatedInterface = {...props.interface};
        let propertiesLength = properties.length;
        let methodsLength = methods.length;
        entry.type === EntryTypeEnum.PROPERTY ? propertiesLength-- : methodsLength--;
        updatedInterface.data.entryIds.splice(updatedInterface.data.entryIds.indexOf(entry.id), 1);

        const updatedElement = updateGraphic(updatedInterface, propertiesLength, methodsLength);
        const toElementRelationshipsIds = relationships.allIds.filter(id => relationships.byId[id].toElementId === updatedElement.id);
        const toElementRelationships = toElementRelationshipsIds.map((id) => relationships.byId[id]);
        toElementRelationships.forEach(rel => {
            if (rel.head.y !== props.interface.graphicData.frame.y) {
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
                }
                dispatch(updateRelationshipSegment(end));
                dispatch(updateRelationshipSegment(endDependent));
                dispatch(updateRelationship(rel));
            }
        });

        const fromElementRelationshipsIds = relationships.allIds.filter(id => relationships.byId[id].fromElementId === updatedElement.id);
        const fromElementRelationships = fromElementRelationshipsIds.map((id) => relationships.byId[id]);
        fromElementRelationships.forEach(rel => {
            if (rel.tail.y !== props.interface.graphicData.frame.y) {
                rel.tail.y = updatedElement.graphicData.frame.y + updatedElement.graphicData.frame.height;
                const start = relationshipsSegments.byId[rel.segmentIds.find(segmentId => relationshipsSegments.byId[segmentId].isStart)];
                const startDependent = relationshipsSegments.byId[start.toSegmentId];
                let yDiff = -25;
                start.y = updatedElement.graphicData.frame.y + updatedElement.graphicData.frame.height;
                if (start.direction === SegmentDirection.HORIZONTAL) {
                    startDependent.y = updatedElement.graphicData.frame.y + updatedElement.graphicData.frame.height;
                    startDependent.lineToY -= yDiff;
                } 
                else {
                    if (start.y + start.lineToY < updatedElement.graphicData.frame.y + updatedElement.graphicData.frame.height) {
                        start.lineToY -= yDiff;
                    } 
                    else {
                        startDependent.y += yDiff;
                        const dependentToEndDependent = relationshipsSegments.byId[startDependent.toSegmentId];
                        dependentToEndDependent.y += yDiff
                        dependentToEndDependent.lineToY -= yDiff;
                        dispatch(updateRelationshipSegment(dependentToEndDependent));
                    }
                }
                dispatch(updateRelationshipSegment(start));
                dispatch(updateRelationshipSegment(startDependent));
                dispatch(updateRelationship(rel));
            }
        });

        dispatch(updateElement(updatedElement));
        dispatch(removeElementEntry(entry));
    };
    
    const updateEntry = (newMethodName: string, classMethod: IInterfaceMethod | IInterfaceProperty) => {
        dispatch(updateElementEntry({
            ...classMethod,
            value: newMethodName
        }));
    };

    const editProperties = () => {
        return properties.map((property, index) => {
            const newClassProperty = {...property};
            const onSelectNewOption = (newAccessModifier: AccessModifierEnum) => {
                newClassProperty.accessModifier = newAccessModifier;
                updateEntry(newClassProperty.value, newClassProperty);
            };

            return (
                <ClassAttributeRow
                    key={index}
                    classAttribute={property}
                    placeHolder='Property'
                    removeAttribute={removeEntry}
                    onSelectNewOption={onSelectNewOption}
                    updateAttribute={updateEntry}
                />
            );
        });        
    };

    const editMethods = () => {
        return methods.map((method, index) => {
            const newClassMethod = {...method};
            const onSelectNewOption = (newAccessModifier: AccessModifierEnum) => {
                newClassMethod.accessModifier = newAccessModifier;
                updateEntry(newClassMethod.value, newClassMethod);
            };
            
            return (
                <ClassAttributeRow
                    key={index}
                    classAttribute={method}
                    placeHolder='Methods'
                    removeAttribute={removeEntry}
                    onSelectNewOption={onSelectNewOption}
                    updateAttribute={updateEntry}
                />
            );
        });
    };

    const addNewEntry = (entryType: EntryTypeEnum) => {
        log.debug(`Added new Interface Entry. Class Id: ${props.interface.id}`);
        const newMethodId = v4();
        dispatch(addNewElementEntry({
            id: newMethodId,
            value: '',
            type: entryType,
            accessModifier: AccessModifierEnum.PUBLIC
        }));
        const updatedInterface = {...props.interface};
        updatedInterface.data.entryIds.push(newMethodId);
        let propertiesLength = properties.length;
        let methodsLength = methods.length;
        entryType === EntryTypeEnum.PROPERTY ? propertiesLength++ : methodsLength++;

        const updatedElement = updateGraphic(updatedInterface, propertiesLength, methodsLength);
        const toElementRelationshipsIds = relationships.allIds.filter(id => relationships.byId[id].toElementId === updatedElement.id);
        const toElementRelationships = toElementRelationshipsIds.map((id) => relationships.byId[id]);
        toElementRelationships.forEach(rel => {
            if (rel.head.y !== props.interface.graphicData.frame.y) {
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
                }
                dispatch(updateRelationshipSegment(end));
                dispatch(updateRelationshipSegment(endDependent));
                dispatch(updateRelationship(rel));
            }
        });

        const fromElementRelationshipsIds = relationships.allIds.filter(id => relationships.byId[id].fromElementId === updatedElement.id);
        const fromElementRelationships = fromElementRelationshipsIds.map((id) => relationships.byId[id]);
        fromElementRelationships.forEach(rel => {
            if (rel.tail.y !== props.interface.graphicData.frame.y) {
                rel.tail.y = updatedElement.graphicData.frame.y + updatedElement.graphicData.frame.height;
                const start = relationshipsSegments.byId[rel.segmentIds.find(segmentId => relationshipsSegments.byId[segmentId].isStart)];
                const startDependent = relationshipsSegments.byId[start.toSegmentId];
                let yDiff = 25;
                start.y = updatedElement.graphicData.frame.y + updatedElement.graphicData.frame.height;
                if (start.direction === SegmentDirection.HORIZONTAL) {
                    startDependent.y = updatedElement.graphicData.frame.y + updatedElement.graphicData.frame.height;
                    startDependent.lineToY -= yDiff;
                } 
                else {
                    if (start.y + start.lineToY < updatedElement.graphicData.frame.y + updatedElement.graphicData.frame.height) {
                        start.lineToY -= yDiff;
                    } 
                    else {
                        startDependent.y += yDiff;
                        const dependentToEndDependent = relationshipsSegments.byId[startDependent.toSegmentId];
                        dependentToEndDependent.y += yDiff
                        dependentToEndDependent.lineToY -= yDiff;
                        dispatch(updateRelationshipSegment(dependentToEndDependent));
                    }
                }
                dispatch(updateRelationshipSegment(start));
                dispatch(updateRelationshipSegment(startDependent));
                dispatch(updateRelationship(rel));
            }
        });

        dispatch(updateElement(updatedElement));
    };

    const onClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedInterface = {...props.interface};
        updatedInterface.data.elementName = event.target.value;
        dispatch(updateElement(updateGraphic(updatedInterface, properties.length, methods.length)));
    };

    return (
        <FrameEdit inputLabel='Interface Name' frameName={data.elementName} onNameChange={(ev) => onClassNameChange(ev)}>
            <ClassPropertyEdit addNewEntry={addNewEntry} editProperties={editProperties}/>
            <ClassMethodEdit addNewEntry={addNewEntry} editMethods={editMethods}/>
        </FrameEdit>
    );
};

export default InterfaceEdit;