import React from 'react';
import ReactDOM from 'react-dom';
import IDataType from '@interfaces/class-diagram/data-type/IDataType';
import { useDispatch, useSelector } from 'react-redux';
import IDataTypeEntry from '@interfaces/class-diagram/data-type/IDataTypeEntry';
import EntryEdit from '../common/entryEdit';
import { v4 } from 'uuid';
import FrameEdit from '../common/frameEdit';
import EntryTableEdit from '../common/entryTableEdit';
import log = require('loglevel');
import { updateDataTypeGraphicData } from '@utils/elements/dataType';
import { updateElement, removeElementEntry, updateElementEntry, addNewElementEntry, updateRelationship, updateRelationshipSegment } from '@store/actions/classDiagram.action';
import EntryTypeEnum from '@enums/EntryTypeEnum';
import SegmentDirection from '@enums/segmentDirection';
import IStoreState from '@interfaces/IStoreState';

const DataTypeEdit = (props: { dataType: IDataType, entries: Array<IDataTypeEntry> }) => {
    const dispatch = useDispatch();
    const { data } = props.dataType;
    const { entries } = props;
    const relationshipsSegments = useSelector((store: IStoreState) => store.classDiagram.relationshipSegments);
    const relationships = useSelector((store: IStoreState) => store.classDiagram.relationships);

    const updateGraphic = (element: IDataType): IDataType => updateDataTypeGraphicData(element);
    const removeEntry = (entry: IDataTypeEntry) => {
        const updated = {...props.dataType};
        updated.data.entryIds.splice(updated.data.entryIds.indexOf(entry.id), 1);

        const updatedElement = updateGraphic(updated);
        const toElementRelationshipsIds = relationships.allIds.filter(id => relationships.byId[id].toElementId === updatedElement.id);
        const toElementRelationships = toElementRelationshipsIds.map((id) => relationships.byId[id]);
        toElementRelationships.forEach(rel => {
            if (rel.head.y !== props.dataType.graphicData.frame.y) {
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
    const updateEntry= (newMethodName: string, classMethod: IDataTypeEntry) => {
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
        log.debug(`Added new DataType Entry. Class Id: ${props.dataType.id}`);
        const newPropertyId = v4();
        dispatch(addNewElementEntry({
            id: newPropertyId,
            type: EntryTypeEnum.BASE,
            value: ''
        }));
        const updated = {...props.dataType};
        updated.data.entryIds.push(newPropertyId);

        const updatedElement = updateGraphic(updated);
        const toElementRelationshipsIds = relationships.allIds.filter(id => relationships.byId[id].toElementId === updatedElement.id);
        const toElementRelationships = toElementRelationshipsIds.map((id) => relationships.byId[id]);
        toElementRelationships.forEach(rel => {
            if (rel.head.y !== props.dataType.graphicData.frame.y) {
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

        dispatch(updateElement(updateGraphic(updated)));
    };
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updated = {...props.dataType};
        updated.data.elementName = event.target.value;
        dispatch(updateElement(updateGraphic(updated)));
    };
    
    return (
        <FrameEdit inputLabel='DataType Name' frameName={data.elementName} onNameChange={(ev) => onNameChange(ev)}>
            <EntryTableEdit addNewEntry={addNewEntry}>
                {editEntries()}
            </EntryTableEdit>
        </FrameEdit>
    );
};

export default DataTypeEdit;