import React, { InputHTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
import FrameEdit from '../common/frameEdit';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import { useDispatch } from 'react-redux';
import { updateStateElement } from '@store/actions/stateDiagram.action';

const StateEdit = (props: { state: IStateElement }) => {
    const dispatch = useDispatch();
    const { state } = props;
    const isComposite = state.data.regions.length > 0;

    const onStateNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateStateElement({
            ...state,
            data: {
                ...state.data,
                name: event.target.value
            }
        }));
    };

    return (
        <FrameEdit frameName={state.data.name} onNameChange={onStateNameChange} inputLabel='State Name'/>
    );
};

export default StateEdit;