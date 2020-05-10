import React from 'react';
import ReactDOM from 'react-dom';
import Frame from '../common/frame';
import FrameHead from '../common/frameHead';
import PrimitiveHead from './primitiveTypeHead';
import IPrimitiveTypeProps from '@interfaces/class-diagram/primitive-type/IPrimitiveTypeProps';
import { useDispatch, useSelector } from 'react-redux';
import { selectNewElement, newCanvasOperation, isMouseDown } from '@store/actions/canvas.action';
import IFrameFunctionality from '@interfaces/class-diagram/common/IFrameFunctionality';
import Joints from '../common/joints';
import IPrimitiveHead from '@interfaces/class-diagram/primitive-type/IPrimitiveTypeHead';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import Direction from '@enums/direction';
import IStoreState from '@interfaces/IStoreState';
import useCanvasOperation from 'hooks/useCanvasOperation';

const PrimitiveType = (props: IPrimitiveTypeProps) => {
    const dispatch = useDispatch();
    const [joints, setJoints] = React.useState(<g/>);
    const { canvasOperation } = useCanvasOperation();
    const isMouseDownState = useSelector((state: IStoreState) => state.canvas.isMouseDown);
    const { frame } = props.primitive.graphicData;
    const { data } = props.primitive;

    const onPrimitiveClick = (ev: React.MouseEvent) => {
        dispatch(selectNewElement(props.primitive.id));
    };
    const frameFunctionality: IFrameFunctionality = {
        onFrameMove: () => {
            if ((event.target as SVGElement).nodeName !== 'circle') {
                dispatch(isMouseDown(true));
                dispatch(newCanvasOperation({
                    type: CanvasOperationEnum.MOVE_ELEMENT,
                    elementId: props.primitive.id
                }));
                setJoints(<g/>);
            }
        },
        onFrameResize: (direction: Direction) => {
            dispatch(isMouseDown(true));
            dispatch(newCanvasOperation({
                type: direction === Direction.LEFT ? CanvasOperationEnum.RESIZE_ELEMENT_LEFT : CanvasOperationEnum.RESIZE_ELEMENT_RIGHT,
                elementId: props.primitive.id
            }));
            setJoints(<g/>);
        },
        onFrameSetDefaultWidth: () => {},
        onFrameClick: onPrimitiveClick,
        onFrameMouseLeave: (event: React.MouseEvent) => {
            setJoints(<g/>);
        },
        onFrameMouseOver: (event: React.MouseEvent) => {
            if (
                canvasOperation.type === CanvasOperationEnum.RESIZE_ELEMENT_RIGHT ||
                canvasOperation.type === CanvasOperationEnum.RESIZE_ELEMENT_LEFT ||
                canvasOperation.type === CanvasOperationEnum.MOVE_ELEMENT
            ) {
                setJoints(<g/>);
            } else {
                setJoints((
                    <Joints
                        coordinates={{ x: frame.x, y: frame.y }}
                        width={frame.width}
                        height={frame.height}
                        fromElementId={props.primitive.id}
                    />
                ));
            }
        }
    };
    const headData: IPrimitiveHead = {
        graphicData: {
            text: {
                x: frame.xCenter,
                y: frame.y + frame.rowHeight
            },
            title: {
                x: frame.xCenter,
                y: frame.y + (frame.rowHeight / 2)
            }
        },
        data: {
            text: data.elementName
        }
    };
    
    return (
        <Frame graphicData={frame} functionality={frameFunctionality}>
            <FrameHead>
                <PrimitiveHead {...headData}/>
            </FrameHead>
            {joints}
        </Frame>
    );
};

export default PrimitiveType;