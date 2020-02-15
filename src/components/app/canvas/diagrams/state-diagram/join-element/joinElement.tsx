import React from 'react';
import ReactDOM from 'react-dom';
import IForkJoinElement from '@interfaces/state-diagram/IForkJoinElement';
import { useDispatch } from 'react-redux';
import { isMouseDown, newCanvasOperation, selectNewElement } from '@store/actions/canvas.action';
import CanvasOperationEnum from '@enums/canvasOperationEnum';

const JoinElement = (props: { joinElement: IForkJoinElement }) => {
    const dispatch = useDispatch();
    const { joinElement } = props;
    const { graphicData } = joinElement;

    const onJoinClick = () => {
        dispatch(selectNewElement(joinElement.id));
    };

    const onJoinMouseDown = () => {
        dispatch(isMouseDown(true));
        dispatch(newCanvasOperation({
            type: CanvasOperationEnum.MOVE_ELEMENT,
            elementId: joinElement.id
        }));
    };

    return (
        <g
            onClick={() => onJoinClick()}
            onMouseDown={() => onJoinMouseDown()}
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

export default JoinElement;