import React from 'react';
import ReactDOM from 'react-dom';
import IInitialStateElement from '@interfaces/state-diagram/initial-state/IInitialStateElement';
import { useDispatch } from 'react-redux';
import { selectNewElement, newCanvasOperation, isMouseDown } from '@store/actions/canvas.action';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import usePreviousMousePosition from 'hooks/usePreviousMousePosition';
import Joint from '../../class-diagram/common/joint';
import useCanvasOperation from 'hooks/useCanvasOperation';
import StateElementJoints from '../state-element-joints';

const InitialStateElement = (props: { initialStateElement: IInitialStateElement }) => {
    const dispatch = useDispatch();
    const { initialStateElement } = props;
    const { graphicData } = initialStateElement;
    const [joints, setJoints] = React.useState(<g/>);
    const { canvasOperation } = useCanvasOperation();

    const onInitialStateClick = () => {
        dispatch(selectNewElement(initialStateElement.id));
    };

    const onInitialStateMouseDown = () => {
        dispatch(isMouseDown(true));
        dispatch(newCanvasOperation({
            type: CanvasOperationEnum.MOVE_ELEMENT,
            elementId: initialStateElement.id
        }));
        setJoints(<g/>);
    };

    const createJoints = () => {
        setJoints(
            <g>
                <Joint
                    fromElementId={initialStateElement.id}
                    radius={5}
                    x={graphicData.x + graphicData.r}
                    y={graphicData.y}
                />
                <Joint
                    fromElementId={initialStateElement.id}
                    radius={5}
                    x={graphicData.x - graphicData.r}
                    y={graphicData.y}
                />
            </g>
        );
    };

    const onMouseOver = () => {
        if (
            canvasOperation.type === CanvasOperationEnum.RESIZE_ELEMENT_RIGHT ||
            canvasOperation.type === CanvasOperationEnum.RESIZE_ELEMENT_LEFT ||
            canvasOperation.type === CanvasOperationEnum.MOVE_ELEMENT
        ) {
            setJoints(<g/>);
        } else {
            createJoints();
        }
    };

    return (
        <g
            onMouseOver={() => onMouseOver()}
            onMouseLeave={() => setJoints(<g/>)}
        >
            {joints}
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
        </g>
    );
};

export default InitialStateElement;