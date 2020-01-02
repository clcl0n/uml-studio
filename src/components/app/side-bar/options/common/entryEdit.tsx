import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IEntry from '@interfaces/class-diagram/common/IEntry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EntryEdit = (props: {
    entry: IEntry,
    placeHolder: string,
    removeEntry: (entry: IEntry) => void,
    updateEntry: (newEntryValue: string, entry: IEntry) => void
}) => {
    const { entry, placeHolder, removeEntry, updateEntry } = props;

    return (
        <tr>
            <td>
                <input
                    type='text'
                    className='input'
                    placeholder={placeHolder}
                    value={entry.value}
                    onChange={(ev) => updateEntry(ev.target.value, entry)}
                />
            </td>
            <td>
                <FontAwesomeIcon onClick={(ev) => removeEntry(entry)} className='icon' icon='trash-alt'/>
            </td>
        </tr>
    );
};

export default EntryEdit;