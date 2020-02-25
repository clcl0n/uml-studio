import React from 'react';
import ReactDOM from 'react-dom';
import IInitialStateElement from '@interfaces/state-diagram/initial-state/IInitialStateElement';
import { useDispatch } from 'react-redux';
import { selectNewElement, newCanvasOperation, isMouseDown } from '@store/actions/canvas.action';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import usePreviousMousePosition from 'hooks/usePreviousMousePosition';

const InitialStateElement = (props: { initialStateElement: IInitialStateElement }) => {
    const dispatch = useDispatch();
    const { initialStateElement } = props;
    const { graphicData } = initialStateElement;

    const onInitialStateClick = () => {
        dispatch(selectNewElement(initialStateElement.id));
    };

    const onInitialStateMouseDown = () => {
        dispatch(isMouseDown(true));
        dispatch(newCanvasOperation({
            type: CanvasOperationEnum.MOVE_ELEMENT,
            elementId: initialStateElement.id
        }));
    };

    return (
        <g
            onClick={() => onInitialStateClick()}
            onMouseDown={() => onInitialStateMouseDown()}
        >
            <circle
                fill='black'
                cx={graphicData.x}
                cy={graphicData.y}
                r={graphicData.r}
            />
        </g>
    );
};

export default InitialStateElement;