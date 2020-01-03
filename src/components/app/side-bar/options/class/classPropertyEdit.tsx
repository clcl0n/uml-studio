import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ClassProperyEdit = (props: {
    addNewMethod: () => void;
    editMethods: () => Array<JSX.Element>;
}) => {
    const { addNewMethod, editMethods } = props;

    return (
        <div className='field'>
            <label className='label'>Methods</label>
            <table className='table is-fullwidth'>
                <thead className='has-background-grey-light is-size-6'>
                    <tr>
                        <th>Modifier</th>
                        <th>Property</th>
                        <th>
                            <FontAwesomeIcon onClick={(ev) => addNewMethod()} icon='plus'/>
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

export default ClassProperyEdit;