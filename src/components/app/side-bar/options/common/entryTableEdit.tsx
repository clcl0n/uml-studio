import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EntryTableEdit = (props: {
    addNewEntry: () => void;
    children: React.ReactNode | Array<React.ReactNode>
}) => {
    const { addNewEntry } = props;

    return (
        <div className='field'>
            <label className='label'>Properties</label>
            <table className='table is-fullwidth'>
                <thead className='has-background-grey-light is-size-6'>
                    <tr>
                        <th>Property</th>
                        <th>
                            <FontAwesomeIcon onClick={(ev) => addNewEntry()} icon='plus'/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </table>
        </div>
    );
};

export default EntryTableEdit;