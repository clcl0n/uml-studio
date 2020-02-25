import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EntryTypeEnum from '@enums/EntryTypeEnum';

const ClassMethodEdit = (props: {
    addNewEntry: (entryType: EntryTypeEnum) => void;
    editMethods: () => Array<JSX.Element>;
}) => {
    const { addNewEntry, editMethods } = props;

    return (
        <div className='field'>
            <label className='label'>Methods</label>
            <table className='table is-fullwidth'>
                <thead className='has-background-grey-light is-size-6'>
                    <tr>
                        <th>Modifier</th>
                        <th>Property</th>
                        <th>
                            <FontAwesomeIcon onClick={(ev) => addNewEntry(EntryTypeEnum.METHOD)} icon='plus'/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {editMethods()}
                </tbody>
            </table>
        </div>
    );
};

export default ClassMethodEdit;