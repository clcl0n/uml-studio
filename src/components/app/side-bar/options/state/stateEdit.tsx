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
        <FrameEdit frameName={state.data.name} onNameChange={onStateNameChange} inputLabel='State Name'>
            <p>State Type</p>
            <div className='control'>
                <label className='radio'>
                    <input type='radio' name='stateType' checked={!isComposite}/>
                    Simple
                </label>
                <label className='radio'>
                    <input type='radio' name='stateType' checked={isComposite}/>
                    Composite
                </label>
            </div>
        </FrameEdit>
    );
};

export default StateEdit;