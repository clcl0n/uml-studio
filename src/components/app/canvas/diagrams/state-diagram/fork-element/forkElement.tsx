import React from 'react';
import ReactDOM from 'react-dom';
import IForkJoinElement from '@interfaces/state-diagram/IForkJoinElement';
import { useDispatch } from 'react-redux';
import { isMouseDown, newCanvasOperation, selectNewElement } from '@store/actions/canvas.action';
import CanvasOperationEnum from '@enums/canvasOperationEnum';

const ForkElement = (props: { forkElement: IForkJoinElement }) => {
    const dispatch = useDispatch();
    const { forkElement } = props;
    const { graphicData } = forkElement;

    const onForkClick = () => {
        dispatch(selectNewElement(forkElement.id));
    };

    const onForkMouseDown = () => {
        dispatch(isMouseDown(true));
        dispatch(newCanvasOperation({
            type: CanvasOperationEnum.MOVE_ELEMENT,
            elementId: forkElement.id
        }));
    };

    return (
        <g
            onClick={() => onForkClick()}
            onMouseDown={() => onForkMouseDown()}
        >
            <rect
                fill='black'
                x={graphicData.x - (graphicData.width / 2)}
                y={graphicData.y - (graphicData.height / 2)}
                rx={5}
                ry={5}
                width={graphicData.width}
                height={graphicData.height}
            />
        </g>
    );
};

export default ForkElement;