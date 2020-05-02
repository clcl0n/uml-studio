import React from 'react';
import ReactDOM from 'react-dom';
import IFinalStateElement from '@interfaces/state-diagram/final-state/IFinalStateElement';
import { useDispatch } from 'react-redux';
import { isMouseDown, newCanvasOperation, selectNewElement } from '@store/actions/canvas.action';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import useCanvasOperation from 'hooks/useCanvasOperation';
import Joint from '../../class-diagram/common/joint';

const FinalStateElement = (props: { finalStateElement: IFinalStateElement }) => {
    const dispatch = useDispatch();
    const { finalStateElement } = props;
    const { graphicData } = finalStateElement;
    const { canvasOperation } = useCanvasOperation();
    const [joints, setJoints] = React.useState(<g/>);

    const onFinalStateClick = () => {
        dispatch(selectNewElement(finalStateElement.id));
    };

    const onFinalStateMouseDown = () => {
        dispatch(isMouseDown(true));
        dispatch(newCanvasOperation({
            type: CanvasOperationEnum.MOVE_ELEMENT,
            elementId: finalStateElement.id
        }));
        setJoints(<g/>);
    };

    const createJoints = () => {
        setJoints(
            <g>
                <Joint
                    fromElementId={finalStateElement.id}
                    radius={5}
                    x={graphicData.x + graphicData.r2}
                    y={graphicData.y}
                />
                <Joint
                    fromElementId={finalStateElement.id}
                    radius={5}
                    x={graphicData.x - graphicData.r2}
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
        </g>
    );
};

export default FinalStateElement;