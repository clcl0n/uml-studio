import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ClassMethodEdit = ( props: {
    addNewProperty: () => void;
    editProperties: () => Array<JSX.Element>;
}) => {
    const { addNewProperty, editProperties } = props;
    
    return (
        <div className='field'>
            <label className='label'>Properties</label>
            <table className='table is-fullwidth'>
                <thead className='has-background-grey-light is-size-6'>
                    <tr>
                        <th>Modifier</th>
                        <th>Property</th>
                        <th>
                            <FontAwesomeIcon onClick={(ev) => addNewProperty()} icon='plus'/>
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

export default ClassMethodEdit;