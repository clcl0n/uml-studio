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
import { updateElement, removeElementEntry, updateElementEntry, addNewElementEntry } from '@store/actions/classDiagram.action';
import EntryTypeEnum from '@enums/EntryTypeEnum';

const EnumerationEdit = (props: { enumeration: IEnumeration, entries: Array<IEnumerationEntry> }) => {
    const dispatch = useDispatch();
    const { data } = props.enumeration;
    const { entries } = props;
    const updateGraphic = (element: IEnumeration): IEnumeration => updateEnumerationGraphicData(element);
    const removeEntry = (entry: IEnumerationEntry) => {
        const updated = {...props.enumeration};
        updated.data.entryIds.splice(updated.data.entryIds.indexOf(entry.id), 1);
        dispatch(updateElement(updateGraphic(updated)));
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
        dispatch(updateElement(updateGraphic(updated)));
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