import React from 'react';
import ReactDOM from 'react-dom';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import { useDispatch } from 'react-redux';
import { updateRelationship } from '@store/actions/classDiagram.action';

const RelationshipEdit = (props: { relationship: IRelationship }) => {
    const dispatch = useDispatch();
    const { headValue, tailValue, relationshipValue, type } = props.relationship;

    const onRelationshipValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedRelationship = {...props.relationship};
        updatedRelationship.relationshipValue = event.target.value;
        dispatch(updateRelationship(updatedRelationship));
    };

    return (
        <div className='container' style={{margin: '10px'}}>
            <div className='field'>
                <label className='label'>Relationship</label>
                <div className='control'>
                    <input
                        value={relationshipValue}
                        onChange={(ev) => onRelationshipValueChange(ev)}
                        type='text'
                        className='input'
                        placeholder='relationship name'
                    />
                </div>
            </div>
        </div>
    );
};

export default RelationshipEdit;