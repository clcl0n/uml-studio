import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IDataType from '@interfaces/class-diagram/data-type/IDataType';
import { useDispatch, useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import updateDataTypeGraphicDataHelper from 'utils/classDiagramHelper/dataType/updateDataTypeGraphicDataHelper';
import IDataTypeEntry from '@interfaces/class-diagram/data-type/IDataTypeEntry';
import { updateDataType, removeDataTypeEntry, updateDataTypeEntry, addNewDataTypeEntry } from '@store/actions/classDiagram';
import EntryEdit from '../common/entryEdit';
import { v4 } from 'uuid';
import FrameEdit from '../common/frameEdit';
import EntryTableEdit from '../common/entryTableEdit';
import log = require('loglevel');

const DataTypeEdit = (props: { dataType: IDataType }) => {
    const dispatch = useDispatch();
    const { data } = props.dataType;
    const selectedEntry= useSelector((state: IStoreState) => data.dataTypeEntryIds.map((id) => {
        return state.umlClassDiagram.dataTypeEntries.byId[id];
    }));
    const updateGraphic = (element: IDataType): IDataType => updateDataTypeGraphicDataHelper(element);
    const removeEntry = (entry: IDataTypeEntry) => {
        const updated = {...props.dataType};
        updated.data.dataTypeEntryIds.splice(updated.data.dataTypeEntryIds.indexOf(entry.id), 1);
        dispatch(updateDataType(updateGraphic(updated)));
        dispatch(removeDataTypeEntry(entry));
    };
    const updateEntry= (newMethodName: string, classMethod: IDataTypeEntry) => {
        dispatch(updateDataTypeEntry({
            ...classMethod,
            value: newMethodName
        }));
    };
    const editEntries = () => {
        return selectedEntry.map((entry, index) => {
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
        dispatch(addNewDataTypeEntry({
            id: newPropertyId,
            value: ''
        }));
        const updated = {...props.dataType};
        updated.data.dataTypeEntryIds.push(newPropertyId);
        dispatch(updateDataType(updateGraphic(updated)));
    };
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updated = {...props.dataType};
        updated.data.dataTypeName = event.target.value;
        dispatch(updateDataType(updateGraphic(updated)));
    };
    
    return (
        <FrameEdit inputLabel='DataType Name' frameName={data.dataTypeName} onNameChange={(ev) => onNameChange(ev)}>
            <EntryTableEdit addNewEntry={addNewEntry}>
                {editEntries()}
            </EntryTableEdit>
        </FrameEdit>
    );
};

export default DataTypeEdit;