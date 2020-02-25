import React from 'react';
import ReactDOM from 'react-dom';
import IFinalStateElement from '@interfaces/state-diagram/final-state/IFinalStateElement';
import { useDispatch } from 'react-redux';
import { isMouseDown, newCanvasOperation, selectNewElement } from '@store/actions/canvas.action';
import CanvasOperationEnum from '@enums/canvasOperationEnum';

const FinalStateElement = (props: { finalStateElement: IFinalStateElement }) => {
    const dispatch = useDispatch();
    const { finalStateElement } = props;
    const { graphicData } = finalStateElement;

    const onFinalStateClick = () => {
        dispatch(selectNewElement(finalStateElement.id));
    };

    const onFinalStateMouseDown = () => {
        dispatch(isMouseDown(true));
        dispatch(newCanvasOperation({
            type: CanvasOperationEnum.MOVE_ELEMENT,
            elementId: finalStateElement.id
        }));
    };


    return (
        <g
            onClick={() => onFinalStateClick()}
            onMouseDown={() => onFinalStateMouseDown()}
        >
            <circle
                fill='black'
                cx={graphicData.x}
                cy={graphicData.y}
                r={graphicData.r}
            />
            <circle
                fill='transparent'
                stroke='black'
                cx={graphicData.x}
                cy={graphicData.y}
                r={graphicData.r2}
            />
        </g>
    );
};

export default FinalStateElement;