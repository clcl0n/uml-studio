import React from 'react';
import ReactDOM from 'react-dom';
import FrameHead from '../common/frameHead';
import IObjectProps from '@interfaces/class-diagram/object/IObjectProps';
import { useDispatch, useSelector } from 'react-redux';
import IObjectSlot from '@interfaces/class-diagram/object/IObjectSlot';
import IFrameRow from '@interfaces/class-diagram/common/IFrameRow';
import FrameRow from '../common/frameRow';
import IObjectSlotProps from '@interfaces/class-diagram/object/IObjectSlotProps';
import ObjectSlot from './objectSlot';
import { selectNewElement, isMouseDown, newCanvasOperation } from '@store/actions/canvas.action';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import IFrameFunctionality from '@interfaces/class-diagram/common/IFrameFunctionality';
import Direction from '@enums/direction';
import Joints from '../common/joints';
import IObjectHead from '@interfaces/class-diagram/object/IObjectHead';
import IFrameSegmentGraphicData from '@interfaces/class-diagram/common/IFrameSegmentGraphicData';
import ObjectHead from './objectHead';
import Frame from '../common/frame';
import FrameSegment from '../common/frameSegment';
import IStoreState from '@interfaces/IStoreState';
import useCanvasOperation from 'hooks/useCanvasOperation';

const ObjectElement = (props: IObjectProps) => {
    const dispatch = useDispatch();
    const [joints, setJoints] = React.useState(<g/>);
    const { canvasOperation } = useCanvasOperation();
    const isMouseDownState = useSelector((state: IStoreState) => state.canvas.isMouseDown);
    const { frame } = props.object.graphicData;
    const { data } = props.object;

    const createNewObjectSlot = (index: number, slot: IObjectSlot) => {
        const frameRowProps: IFrameRow = {
            graphicData: {
                index,
                x: frame.x,
                y: frame.y + frame.rowHeight, 
                xCenter: frame.xCenter,
                rowHeight: frame.rowHeight,
                width: frame.width,
                fontPixelSize: frame.fontPixelSize,
            }
        };

        const objectSlotProps: IObjectSlotProps = {
            graphicData: {
                text: {
                    x: frame.xCenter,
                    y: frame.y + ((index + 1) * frame.rowHeight) + frame.fontPixelSize
                }
            },
            slot
        };

        return (
            <FrameRow key={index} frameRow={frameRowProps}>
                <ObjectSlot {...objectSlotProps}/>
            </FrameRow>
        );
    };
    const onObjectClick = () => {
        dispatch(selectNewElement(props.object.id));
    };
    const objectSlots = props.slots.map((slot, index) => createNewObjectSlot(index, slot));
    const frameFunctionality: IFrameFunctionality = {
        onFrameMove: () => {
            if ((event.target as SVGElement).nodeName !== 'circle') {
                dispatch(isMouseDown(true));
                dispatch(newCanvasOperation({
                    type: CanvasOperationEnum.MOVE_ELEMENT,
                    elementId: props.object.id
                }));
                setJoints(<g/>);
            }
        },
        onFrameResize: (direction: Direction) => {
            dispatch(isMouseDown(true));
            dispatch(newCanvasOperation({
                type: direction === Direction.LEFT ? CanvasOperationEnum.RESIZE_ELEMENT_LEFT : CanvasOperationEnum.RESIZE_ELEMENT_RIGHT,
                elementId: props.object.id
            }));
            setJoints(<g/>);
        },
        onFrameSetDefaultWidth: () => {},
        onFrameClick: onObjectClick,
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
                        fromElementId={props.object.id}
                    />
                ));
            }
        }
    };
    const objectHeadData: IObjectHead = {
        graphicData: {
            text: {
                x: frame.xCenter,
                y: props.slots.length === 0 && props.slots.length === 0 ? frame.y + frame.rowHeight : frame.y + (frame.rowHeight / 2)
            }
        },
        data: {
            text: data.elementName
        }
    };
    const objectSlotsSegment: IFrameSegmentGraphicData = {
        segmentSeparator: {
            x: frame.x,
            y: frame.y + frame.rowHeight,
            xLength: frame.width,
            yLength: 0
        }
    };

    const frameSlotsSegment = () => {
        return props.slots.length === 0 ? <g/> : (
            <FrameSegment graphicData={objectSlotsSegment}>
                {...objectSlots}
            </FrameSegment>
        );
    };  

    return (
        <Frame graphicData={frame} functionality={frameFunctionality}>
            <FrameHead>
                <ObjectHead objectHead={objectHeadData}/>
            </FrameHead>
            {frameSlotsSegment()}
            {joints}
        </Frame>
    );
};

export default ObjectElement;