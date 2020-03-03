import React from 'react';
import ReactDOM from 'react-dom';
import IFinalStateElement from '@interfaces/state-diagram/final-state/IFinalStateElement';
import IInitialStateElement from '@interfaces/state-diagram/initial-state/IInitialStateElement';
import FrameEdit from '../common/frameEdit';
import { useDispatch } from 'react-redux';
import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';
import { updateFinalStateElement, updateInitialStateElement } from '@store/actions/stateDiagram.action';

const FinalInitialStateEdit = (props: { element: IFinalStateElement | IInitialStateElement }) => {
    const dispatch = useDispatch();
    const { element } = props;

    const onStateNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.element.type === StateDiagramElementsEnum.FINAL_STATE) {
            dispatch(updateFinalStateElement({
                ...(element as IFinalStateElement),
                name: event.target.value
            }));
        } else {
            dispatch(updateInitialStateElement({
                ...element,
                name: event.target.value
            }));
        }
    };
    
    return (
        <FrameEdit frameName={element.name} onNameChange={onStateNameChange} inputLabel='State Name'/>
    );
};

export default FinalInitialStateEdit;