import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './class.scss';
import { selectNewElement, isMouseDown, newCanvasOperation } from '@store/actions/canvas';
import { useDispatch, useSelector } from 'react-redux';
import IClassProps from '@interfaces/class-diagram/class/IClassProps';
import Frame from '../common/frame';
import IFrameFunctionality from '@interfaces/class-diagram/common/IFrameFunctionality';
import FrameSegment from '../common/frameSegment';
import IFrameSegmentGraphicData from '@interfaces/class-diagram/common/IFrameSegmentGraphicData';
import FrameHead from '../common/frameHead';
import FrameRow from '../common/frameRow';
import IFrameRow from '@interfaces/class-diagram/common/IFrameRow';
import ClassAttribute from './classAttribute';
import IClassAttribute from '@interfaces/class-diagram/class/IClassAttribute';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';
import Joints from '../common/joints';
import ClassHead from './classHead';
import IClassHead from '@interfaces/class-diagram/class/IClassHead';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import Direction from '@enums/direction';
import IStoreState from '@interfaces/IStoreState';

const Class = (props: IClassProps) => {
    const dispatch = useDispatch();
    const canvasOperation = useSelector((state: IStoreState) => state.canvas.canvasOperation.type);
    const [joints, setJoints] = React.useState(<g/>);
    const { frame, sections } = props.class.graphicData;

    const createNewClassRow = (index: number, classAttribute: IClassMethod | IClassProperty, y: number) => {
        const frameRowProps: IFrameRow = {
            graphicData: {
                index,
                x: frame.x,
                y,
                xCenter: frame.xCenter,
                rowHeight: frame.rowHeight,
                width: frame.width,
                fontPixelSize: frame.fontPixelSize,
            }
        };
        const classAttributeProps: IClassAttribute<IClassMethod | IClassProperty> = {
            data: classAttribute,
            graphicData: {
                text: {
                    x: frame.xCenter,
                    y: y + (index * frame.rowHeight) + frame.fontPixelSize
                }
            }
        };

        return (
            <FrameRow key={index} frameRow={frameRowProps}>
                <ClassAttribute classAttribute={classAttributeProps}/>
            </FrameRow>
        );
    };

    const classProperties = props.properties.map((classProperty, index) => createNewClassRow(index, classProperty, sections.properties.y));
    const classMethods = props.methods.map((classMethods, index) => createNewClassRow(index, classMethods, sections.methods.y));

    const onClassClick = (ev: React.MouseEvent) => {
        dispatch(selectNewElement(props.class.id));
    };

    const frameFunctionality: IFrameFunctionality = {
        onFrameMove: (event: React.MouseEvent) => {
            dispatch(isMouseDown(true));
            dispatch(newCanvasOperation({
                type: CanvasOperationEnum.MOVE_ELEMENT,
                elementId: props.class.id
            }));
        },
        onFrameResize: (event: React.MouseEvent, direction: Direction) => {
            dispatch(isMouseDown(true));
            dispatch(newCanvasOperation({
                type: direction === Direction.LEFT ? CanvasOperationEnum.RESIZE_ELEMENT_LEFT : CanvasOperationEnum.RESIZE_ELEMENT_RIGHT,
                elementId: props.class.id
            }));
        },
        onFrameSetDefaultWidth: () => {},
        onFrameClick: onClassClick,
        onFrameMouseLeave: (event: React.MouseEvent) => {
            setJoints(<g/>);
        },
        onFrameMouseOver: (event: React.MouseEvent) => {
            if (canvasOperation === CanvasOperationEnum.RESIZE_ELEMENT_LEFT || canvasOperation === CanvasOperationEnum.RESIZE_ELEMENT_RIGHT) {
                setJoints(<g/>);
            } else {
                setJoints((
                    <Joints
                        coordinates={{ x: frame.x, y: frame.y }}
                        width={frame.width}
                        height={frame.height}
                        onJointClick={props.functionality.onJointClick}
                    />
                ));
            }
        }
    };

    const classPropertiesSegment: IFrameSegmentGraphicData = {
        segmentSeparator: {
            x: frame.x,
            y: frame.y + frame.rowHeight,
            xLength: frame.width,
            yLength: 0
        }
    };

    const classMethodsSegment: IFrameSegmentGraphicData = {
        segmentSeparator: {
            x: frame.x,
            y: sections.methods.y,
            xLength: frame.width,
            yLength: 0
        }
    };

    const classHeadData: IClassHead = {
        graphicData: {
            text: {
                x: frame.xCenter,
                y: props.methods.length === 0 && props.properties.length === 0 ? frame.y + frame.rowHeight : frame.y + (frame.rowHeight / 2)
            }
        },
        data: {
            text: props.class.data.className
        }
    };

    const framePropertiesSegment = () => {
        return props.properties.length === 0 ? <g/> : (
            <FrameSegment graphicData={classPropertiesSegment}>
                {...classProperties}
            </FrameSegment>
        );
    };

    const frameMethodsSegment = () => {
        return props.methods.length === 0 ? <g/> : (
            <FrameSegment graphicData={classMethodsSegment}>
                {...classMethods}
            </FrameSegment>
        );
    };
    
    return (
        <Frame
            graphicData={frame}
            functionality={frameFunctionality}
        >
            <FrameHead>
                <ClassHead classHead={classHeadData}/>
            </FrameHead>
            {framePropertiesSegment()}
            {frameMethodsSegment()}
            {joints}
        </Frame>
    );
};

export default Class;