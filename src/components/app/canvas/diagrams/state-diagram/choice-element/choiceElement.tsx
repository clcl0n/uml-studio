import React from 'react';
import ReactDOM from 'react-dom';
import IChoiceElement from '@interfaces/state-diagram/IChoiceElement';
import { useDispatch } from 'react-redux';
import { selectNewElement, isMouseDown, newCanvasOperation } from '@store/actions/canvas.action';
import CanvasOperationEnum from '@enums/canvasOperationEnum';

const ChoiceElement = (props: { choiceElement: IChoiceElement }) => {
    const dispatch = useDispatch();
    const { choiceElement } = props;
    const { graphicData } = choiceElement;

    const onChoiceClick = () => {
        dispatch(selectNewElement(choiceElement.id));
    };

    const onChoiceMouseDown = () => {
        dispatch(isMouseDown(true));
        dispatch(newCanvasOperation({
            type: CanvasOperationEnum.MOVE_ELEMENT,
            elementId: choiceElement.id
        }));
    };

    const halfWidth = graphicData.width / 2;
    const halfHeight = graphicData.height / 2;

    return (
        <g
            pointerEvents='all'
            onClick={() => onChoiceClick()}
            onMouseDown={() => onChoiceMouseDown()}
        >
            <path
                stroke='black'
                fill='transparent'
                d={`M ${graphicData.x} ${graphicData.y + (graphicData.height / 2)} l ${halfWidth} ${-halfHeight} l ${halfWidth} ${halfHeight} l ${-halfWidth} ${halfHeight} Z`}
            />
        </g>
    );
};

export default ChoiceElement;