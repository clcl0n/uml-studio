import React from 'react';
import ReactDOM from 'react-dom';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import { useDispatch } from 'react-redux';
import { updateRelationship } from '@store/actions/classDiagram.action';
import useDiagram from 'hooks/useDiagram';
import DiagramTypeEnum from '@enums/diagramTypeEnum';

const RelationshipEdit = (props: { relationship: IRelationship }) => {
    const dispatch = useDispatch();
    const { headValue, tailValue, relationshipValue, type } = props.relationship;
    const { diagramType } = useDiagram();

    const onRelationshipValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedRelationship = {...props.relationship};
        updatedRelationship.relationshipValue = event.target.value;
        dispatch(updateRelationship(updatedRelationship));
    };

    const onRelationshipHeadValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedRelationship = {...props.relationship};
        updatedRelationship.headValue = event.target.value;
        dispatch(updateRelationship(updatedRelationship));
    };

    const onRelationshipTailValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedRelationship = {...props.relationship};
        updatedRelationship.tailValue = event.target.value;
        dispatch(updateRelationship(updatedRelationship));
    };

    const aditionalControll1 = () => {
        if (diagramType === DiagramTypeEnum.CLASS) {
            return (
                <div className='control'>
                    <input
                        value={headValue}
                        onChange={(ev) => onRelationshipHeadValueChange(ev)}
                        type='text'
                        className='input'
                        placeholder='head multiplicity'
                    />
                </div>
            );
        } else {
            return <div/>
        }
    }

    const aditionalControll2 = () => {
        if (diagramType === DiagramTypeEnum.CLASS) {
            return (
                <div className='control'>
                    <input
                        value={tailValue}
                        onChange={(ev) => onRelationshipTailValueChange(ev)}
                        type='text'
                        className='input'
                        placeholder='tail multiplicity'
                    />
                </div>
            );
        } else {
            return <div/>
        }
    }

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
                        placeholder={diagramType === DiagramTypeEnum.STATE ? 'condition' : 'relationship name'}
                    />
                </div>
                {aditionalControll1()}
                {aditionalControll2()}
            </div>
        </div>
    );
};

export default RelationshipEdit;