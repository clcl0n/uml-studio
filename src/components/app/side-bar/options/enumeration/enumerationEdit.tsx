import React from 'react';
import ReactDOM from 'react-dom';
import IEnumeration from '@interfaces/class-diagram/enumeration/IEnumeration';
import { useDispatch, useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import IEnumerationEntry from '@interfaces/class-diagram/enumeration/IEnumerationEntry';
import log = require('loglevel');
import { v4 } from 'uuid';
import EntryEdit from '../common/entryEdit';
import FrameEdit from '../common/frameEdit';
import EntryTableEdit from '../common/entryTableEdit';
import { updateEnumerationGraphicData } from '@utils/elements/enumeration';
import { updateElement, removeElementEntry, updateElementEntry, addNewElementEntry, updateRelationshipSegment, updateRelationship } from '@store/actions/classDiagram.action';
import EntryTypeEnum from '@enums/EntryTypeEnum';
import SegmentDirection from '@enums/segmentDirection';

const EnumerationEdit = (props: { enumeration: IEnumeration, entries: Array<IEnumerationEntry> }) => {
    const dispatch = useDispatch();
    const { data } = props.enumeration;
    const { entries } = props;
    const relationshipsSegments = useSelector((store: IStoreState) => store.classDiagram.relationshipSegments);
    const relationships = useSelector((store: IStoreState) => store.classDiagram.relationships);
    const updateGraphic = (element: IEnumeration): IEnumeration => updateEnumerationGraphicData(element);
    const removeEntry = (entry: IEnumerationEntry) => {
        const updated = {...props.enumeration};
        updated.data.entryIds.splice(updated.data.entryIds.indexOf(entry.id), 1);
        const updatedElement = updateGraphic(updated);
        const toElementRelationshipsIds = relationships.allIds.filter(id => relationships.byId[id].toElementId === updatedElement.id);
        const toElementRelationships = toElementRelationshipsIds.map((id) => relationships.byId[id]);
        toElementRelationships.forEach(rel => {
            if (rel.head.y !== props.enumeration.graphicData.frame.y) {
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

        dispatch(updateElement(updatedElement));
        dispatch(removeElementEntry(entry));
    };
    const updateEntry= (newMethodName: string, classMethod: IEnumerationEntry) => {
        dispatch(updateElementEntry({
            ...classMethod,
            value: newMethodName
        }));
    };
    const editEntries = () => {
        return entries.map((entry, index) => {
            return (
                <EntryEdit
                    key={index}
                    entry={entry}
                    placeHolder='newEntry'
                    updateEntry={updateEntry}
                    removeEntry={removeEntry}
                />
            );
        });        
    };
    const addNewEntry = () => {
        log.debug(`Added new Enumeration Entry. Enumeration Id: ${props.enumeration.id}`);
        const newPropertyId = v4();
        dispatch(addNewElementEntry({
            id: newPropertyId,
            type: EntryTypeEnum.BASE,
            value: ''
        }));
        const updated = {...props.enumeration};
        updated.data.entryIds.push(newPropertyId);

        const updatedElement = updateGraphic(updated);
        const toElementRelationshipsIds = relationships.allIds.filter(id => relationships.byId[id].toElementId === updatedElement.id);
        const toElementRelationships = toElementRelationshipsIds.map((id) => relationships.byId[id]);
        toElementRelationships.forEach(rel => {
            if (rel.head.y !== props.enumeration.graphicData.frame.y) {
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

        dispatch(updateElement(updatedElement));
    };
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updated = {...props.enumeration};
        updated.data.elementName = event.target.value;
        dispatch(updateElement(updateGraphic(updated)));
    };

    return (
        <FrameEdit inputLabel='Enumeration Name' frameName={data.elementName} onNameChange={(ev) => onNameChange(ev)}>
            <EntryTableEdit addNewEntry={addNewEntry}>
                {editEntries()}
            </EntryTableEdit>
        </FrameEdit>
    );
};

export default EnumerationEdit;