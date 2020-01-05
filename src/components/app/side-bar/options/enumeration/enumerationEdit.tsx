import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IEnumeration from '@interfaces/class-diagram/enumeration/IEnumeration';
import { useDispatch, useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import IEnumerationEntry from '@interfaces/class-diagram/enumeration/IEnumerationEntry';
import { updateEnumeration, removeEnumerationEntry, updateEnumerationEntry, addNewEnumerationEntry } from '@store/actions/classDiagram';
import log = require('loglevel');
import { v4 } from 'uuid';
import EntryEdit from '../common/entryEdit';
import FrameEdit from '../common/frameEdit';
import EntryTableEdit from '../common/entryTableEdit';
import updateEnumerationGraphicDataHelper from 'utils/classDiagramHelper/enumeration/updateEnumerationGraphicDataHelper';

const EnumerationEdit = (props: { enumeration: IEnumeration }) => {
    const dispatch = useDispatch();
    const { data } = props.enumeration;
    const selectedEntry= useSelector((state: IStoreState) => data.enumerationEntryIds.map((id) => {
        return state.umlClassDiagram.enumerationEntries.byId[id];
    }));
    const updateGraphic = (element: IEnumeration): IEnumeration => updateEnumerationGraphicDataHelper(element);
    const removeEntry = (entry: IEnumerationEntry) => {
        const updated = {...props.enumeration};
        updated.data.enumerationEntryIds.splice(updated.data.enumerationEntryIds.indexOf(entry.id), 1);
        dispatch(updateEnumeration(updateGraphic(updated)));
        dispatch(removeEnumerationEntry(entry));
    };
    const updateEntry= (newMethodName: string, classMethod: IEnumerationEntry) => {
        dispatch(updateEnumerationEntry({
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
        log.debug(`Added new Enumeration Entry. Enumeration Id: ${props.enumeration.id}`);
        const newPropertyId = v4();
        dispatch(addNewEnumerationEntry({
            id: newPropertyId,
            value: ''
        }));
        const updated = {...props.enumeration};
        updated.data.enumerationEntryIds.push(newPropertyId);
        dispatch(updateEnumeration(updateGraphic(updated)));
    };
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updated = {...props.enumeration};
        updated.data.enumerationName = event.target.value;
        dispatch(updateEnumeration(updateGraphic(updated)));
    };

    return (
        <FrameEdit inputLabel='Enumeration Name' frameName={data.enumerationName} onNameChange={(ev) => onNameChange(ev)}>
            <EntryTableEdit addNewEntry={addNewEntry} editEntries={editEntries}/>
        </FrameEdit>
    );
};

export default EnumerationEdit;