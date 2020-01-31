import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SlotTableEdit = (props: {
    addNewEntry: () => void;
    children: React.ReactNode | Array<React.ReactNode>
}) => {
    const { addNewEntry } = props;

    return (
        <div className='field'>
            <label className='label'>Slots</label>
            <table className='table is-fullwidth'>
                <thead className='has-background-grey-light is-size-6'>
                    <tr>
                        <th>Feature</th>
                        <th>Value</th>
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

export default SlotTableEdit;