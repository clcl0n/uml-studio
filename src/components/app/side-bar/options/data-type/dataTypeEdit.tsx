import React from 'react';
import ReactDOM from 'react-dom';
import IDataType from '@interfaces/class-diagram/data-type/IDataType';
import { useDispatch } from 'react-redux';
import IDataTypeEntry from '@interfaces/class-diagram/data-type/IDataTypeEntry';
import EntryEdit from '../common/entryEdit';
import { v4 } from 'uuid';
import FrameEdit from '../common/frameEdit';
import EntryTableEdit from '../common/entryTableEdit';
import log = require('loglevel');
import { updateDataTypeGraphicData } from '@utils/elements/dataType';
import { updateElement, removeElementEntry, updateElementEntry, addNewElementEntry } from '@store/actions/classDiagram.action';
import EntryTypeEnum from '@enums/EntryTypeEnum';

const DataTypeEdit = (props: { dataType: IDataType, entries: Array<IDataTypeEntry> }) => {
    const dispatch = useDispatch();
    const { data } = props.dataType;
    const { entries } = props;

    const updateGraphic = (element: IDataType): IDataType => updateDataTypeGraphicData(element);
    const removeEntry = (entry: IDataTypeEntry) => {
        const updated = {...props.dataType};
        updated.data.entryIds.splice(updated.data.entryIds.indexOf(entry.id), 1);
        dispatch(updateElement(updateGraphic(updated)));
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