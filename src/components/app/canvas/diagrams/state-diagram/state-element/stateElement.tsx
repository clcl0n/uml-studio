import React from 'react';
import ReactDOM from 'react-dom';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import Direction from '@enums/direction';
import { resizeFrame } from '@utils/elements/frame';
import ICoordinates from '@interfaces/ICoordinates';
import { useDispatch } from 'react-redux';
import { updateStateElement } from '@store/actions/stateDiagram.action';
import { selectNewElement, isMouseDown, newCanvasOperation } from '@store/actions/canvas.action';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import useCanvasOperation from 'hooks/useCanvasOperation';
import Joints from '../../class-diagram/common/joints';
import Joint from '../../class-diagram/common/joint';
import StateElementJoints from '../state-element-joints';

const StateElement = (props: { stateElement: IStateElement }) => {
    const dispatch = useDispatch();
    const { stateElement } = props;
    const { canvasOperation } = useCanvasOperation();
    const [joints, setJoints] = React.useState(<g/>);
    const { graphicData, data } = stateElement;
    

    const getStateHeader = () => {
        let nameX = graphicData.frame.xCenter;
        let nameY = graphicData.frame.yCenter;
    
        if (data.regions.length > 0) {
            nameY = graphicData.frame.y + graphicData.frame.fontPixelSize;
        }
        
        return (
            <g>
                <text className='svg-text svg-text-center' x={nameX} y={nameY}>{data.name}</text>
                {data.regions.length > 0 && <path stroke='black' d={`M ${graphicData.frame.x} ${nameY + graphicData.frame.fontPixelSize} l ${graphicData.frame.width} 0`}/>}
            </g>
        );
    };

    const onElementClick = () => {
        dispatch(selectNewElement(stateElement.id));
    };

    const onFrameMove = (event: React.MouseEvent) => {
        if ((event.target as SVGElement).nodeName !== 'circle') {
            dispatch(isMouseDown(true));
            dispatch(newCanvasOperation({
                type: CanvasOperationEnum.MOVE_ELEMENT,
                elementId: stateElement.id
            }));
            setJoints(<g/>);
        }
    };

    const onFrameResize = (direction: Direction) => {
        dispatch(isMouseDown(true));
        let dir;
        if (direction === Direction.LEFT) {
            dir = CanvasOperationEnum.RESIZE_ELEMENT_LEFT;
        } else if (direction === Direction.RIGHT) {
            dir = CanvasOperationEnum.RESIZE_ELEMENT_RIGHT;
        } else if (direction === Direction.UP) {
        } else {
        }
        dispatch(newCanvasOperation({
            type: dir,
            elementId: stateElement.id
        }));
        setJoints(<g/>);
    };

    const getRegions = () => {
        let regionsStartY = graphicData.frame.y + (graphicData.frame.fontPixelSize*3);
        return data.regions.map((region, index) => {
            const topOffset = index > 0 ? graphicData.frame.fontPixelSize : 0;
            return (
                <g key={index}>
                    <text
                        className='svg-text'
                        x={graphicData.frame.x + 5}
                        y={regionsStartY + (graphicData.frame.rowHeight *(index)) + 3 + topOffset}
                    >
                        {`[${region}]`}
                    </text>
                </g>
            );
        });
    };

    const rx = 20;

    const onMouseOver = () => {
        if (
            canvasOperation.type === CanvasOperationEnum.RESIZE_ELEMENT_RIGHT ||
            canvasOperation.type === CanvasOperationEnum.RESIZE_ELEMENT_LEFT ||
            canvasOperation.type === CanvasOperationEnum.MOVE_ELEMENT
        ) {
            setJoints(<g/>);
        } else {
            setJoints(
                <StateElementJoints stateElement={stateElement}/>
            );
        }
    };

    return (
        <g
            onClick={() => onElementClick()}
            onMouseOver={() => onMouseOver()}
            onMouseLeave={() => setJoints(<g/>)}
        >
            <path
                pointerEvents='stroke'
                strokeWidth='10'
                cursor='ew-resize'
                d={`M ${graphicData.frame.x} ${graphicData.frame.y + (rx/2)} l 0 ${graphicData.frame.height - rx}`}
                onMouseDown={() => onFrameResize(Direction.LEFT)}
            />
            <path
                pointerEvents='stroke'
                strokeWidth='10'
                cursor='ew-resize'
                d={`M ${graphicData.frame.x + graphicData.frame.width} ${graphicData.frame.y + (rx/2)} l 0 ${graphicData.frame.height - rx}`}
                onMouseDown={() => onFrameResize(Direction.RIGHT)}
            />
            <path
                pointerEvents='stroke'
                strokeWidth='10'
                d={`M ${graphicData.frame.x + (rx/2)} ${graphicData.frame.y} l ${graphicData.frame.width - rx} 0`}
            />
            <path
                pointerEvents='stroke'
                strokeWidth='10'
                d={`M ${graphicData.frame.x + (rx/2)} ${graphicData.frame.y + graphicData.frame.height} l ${graphicData.frame.width - rx} 0`}
            />
            <rect
                fill='transparent'
                stroke='black'
                x={graphicData.frame.x}
                y={graphicData.frame.y}
                width={graphicData.frame.width}
                height={graphicData.frame.height}
                rx='20'
                onMouseDown={(ev) => onFrameMove(ev)}
            />
            {getStateHeader()}
            {getRegions()}
            {joints}
        </g>
    );
};

export default StateElement;