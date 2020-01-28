import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EntryTypeEnum from '@enums/EntryTypeEnum';

const ClassPropertyEdit = ( props: {
    addNewEntry: (entryType: EntryTypeEnum) => void;
    editProperties: () => Array<JSX.Element>;
}) => {
    const { addNewEntry, editProperties } = props;
    
    return (
        <div className='field'>
            <label className='label'>Properties</label>
            <table className='table is-fullwidth'>
                <thead className='has-background-grey-light is-size-6'>
                    <tr>
                        <th>Modifier</th>
                        <th>Property</th>
                        <th>
                            <FontAwesomeIcon onClick={(ev) => addNewEntry(EntryTypeEnum.PROPERTY)} icon='plus'/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {editProperties()}
                </tbody>
            </table>
        </div>
    );
};

export default ClassPropertyEdit;