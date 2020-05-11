import React from 'react';
import ReactDOM from 'react-dom';
import IObject from '@interfaces/class-diagram/object/IObject';
import { useDispatch, useSelector } from 'react-redux';
import IObjectSlot from '@interfaces/class-diagram/object/IObjectSlot';
import SlotEdit from './slotEdit';
import { v4 } from 'uuid';
import log = require('loglevel');
import FrameEdit from '../common/frameEdit';
import SlotTableEdit from './slotTableEdit';
import { updateObjectGraphicData } from '@utils/elements/object';
import { updateElement, removeElementEntry, updateElementEntry, addNewElementEntry, updateRelationshipSegment, updateRelationship } from '@store/actions/classDiagram.action';
import EntryTypeEnum from '@enums/EntryTypeEnum';
import SegmentDirection from '@enums/segmentDirection';
import IStoreState from '@interfaces/IStoreState';

const ObjectEdit = (props: { object: IObject, slots: Array<IObjectSlot> }) => {
    const dispatch = useDispatch();
    const { data } = props.object;
    const { slots } = props;
    const relationshipsSegments = useSelector((store: IStoreState) => store.classDiagram.relationshipSegments);
    const relationships = useSelector((store: IStoreState) => store.classDiagram.relationships);

    const updateGraphic = (element: IObject): IObject => updateObjectGraphicData(element);
    const removeSlot = (slot: IObjectSlot) => {
        const updated = {...props.object};
        updated.data.entryIds.splice(updated.data.entryIds.indexOf(slot.id), 1);

        const updatedElement = updateGraphic(updated);
        const toElementRelationshipsIds = relationships.allIds.filter(id => relationships.byId[id].toElementId === updatedElement.id);
        const toElementRelationships = toElementRelationshipsIds.map((id) => relationships.byId[id]);
        if (slots.length === 1) {
            dispatch(updateElement(updatedElement));
            dispatch(removeElementEntry(slot));
            return;
        }
        toElementRelationships.forEach(rel => {
            if (rel.head.y !== props.object.graphicData.frame.y) {
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
            if (rel.tail.y !== props.object.graphicData.frame.y) {
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
        dispatch(removeElementEntry(slot));
    };
    const updateSlot= (newFeature: string, newValue: string, slot: IObjectSlot) => {
        dispatch(updateElementEntry({
            ...slot,
            featureName: newFeature,
            value: newValue
        }));
    };
    const editSlots = () => {
        return slots.map((slot, index) => {
            return (
                <SlotEdit
                    key={index}
                    slot={slot}
                    updateSlot={updateSlot}
                    removeSlot={removeSlot}
                />
            );
        });
    };
    const addNewSlot = () => {
        log.debug(`Added new Object Slot. Object Id: ${props.object.id}`);
        const newSlotId = v4();
        dispatch(addNewElementEntry({
            id: newSlotId,
            type: EntryTypeEnum.SLOT,
            featureName: '',
            value: ''
        }));
        const updated = {...props.object};
        updated.data.entryIds.push(newSlotId);

        const updatedElement = updateGraphic(updated);
        const toElementRelationshipsIds = relationships.allIds.filter(id => relationships.byId[id].toElementId === updatedElement.id);
        const toElementRelationships = toElementRelationshipsIds.map((id) => relationships.byId[id]);
        if (slots.length === 0) {
            dispatch(updateElement(updatedElement));
            return;
        }
        toElementRelationships.forEach(rel => {
            if (rel.head.y !== props.object.graphicData.frame.y) {
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
            if (rel.tail.y !== props.object.graphicData.frame.y) {
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
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updated = {...props.object};
        updated.data.elementName = event.target.value;
        dispatch(updateElement(updateGraphic(updated)));
    };

    return (
        <FrameEdit inputLabel='Object Name' frameName={data.elementName} onNameChange={(ev) => onNameChange(ev)}>
            <SlotTableEdit addNewEntry={addNewSlot}>
                {editSlots()}
            </SlotTableEdit>
        </FrameEdit>
    );
};

export default ObjectEdit;