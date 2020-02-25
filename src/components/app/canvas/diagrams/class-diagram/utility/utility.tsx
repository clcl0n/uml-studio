import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import IFrameRow from '@interfaces/class-diagram/common/IFrameRow';
import IUtilityMethod from '@interfaces/class-diagram/utility/IUtilityMethod';
import IUtilityProperty from '@interfaces/class-diagram/utility/IUtilityProperty';
import IClassAttribute from '@interfaces/class-diagram/class/IClassAttribute';
import FrameRow from '../common/frameRow';
import ClassAttribute from '../class/classAttribute';
import { selectNewElement, isMouseDown, newCanvasOperation } from '@store/actions/canvas.action';
import IFrameSegmentGraphicData from '@interfaces/class-diagram/common/IFrameSegmentGraphicData';
import IFrameFunctionality from '@interfaces/class-diagram/common/IFrameFunctionality';
import Joints from '../common/joints';
import IUtilityHead from '@interfaces/class-diagram/utility/IUtilityHead';
import Frame from '../common/frame';
import FrameHead from '../common/frameHead';
import UtilityHead from './utilityHead';
import FrameSegment from '../common/frameSegment';
import Direction from '@enums/direction';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import IStoreState from '@interfaces/IStoreState';
import IUtility from '@interfaces/class-diagram/utility/IUtility';

const Utility = (props: { utility: IUtility, properties: Array<IUtilityProperty>, methods: Array<IUtilityMethod> }) => {
    const dispatch = useDispatch();
    const [joints, setJoints] = React.useState(<g/>);
    const isMouseDownState = useSelector((state: IStoreState) => state.canvas.isMouseDown);
    const { frame, sections } = props.utility.graphicData;

    const createNewUtilityRow = (index: number, classAttribute: IUtilityMethod | IUtilityProperty, y: number) => {
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
        const classAttributeProps: IClassAttribute<IUtilityMethod | IUtilityProperty> = {
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
    const onUtilityClick = (ev: React.MouseEvent) => {
        dispatch(selectNewElement(props.utility.id));
    };

    const utilityPropertiesSegment: IFrameSegmentGraphicData = {
        segmentSeparator: {
            x: frame.x,
            y: sections.properties.y,
            xLength: frame.width,
            yLength: 0
        }
    };

    const utilityMethodsSegment: IFrameSegmentGraphicData = {
        segmentSeparator: {
            x: frame.x,
            y: sections.methods.y,
            xLength: frame.width,
            yLength: 0
        }
    };


    const utilityProperties = props.properties.map((classProperty, index) => createNewUtilityRow(index, classProperty, sections.properties.y));
    const utilityMethods = props.methods.map((classMethods, index) => createNewUtilityRow(index, classMethods, sections.methods.y));

    const frameFunctionality: IFrameFunctionality = {
        onFrameMove: () => {
            if ((event.target as SVGElement).nodeName !== 'circle') {
                dispatch(isMouseDown(true));
                dispatch(newCanvasOperation({
                    type: CanvasOperationEnum.MOVE_ELEMENT,
                    elementId: props.utility.id
                }));
                setJoints(<g/>);
            }
        },
        onFrameResize: (direction: Direction) => {
            dispatch(isMouseDown(true));
            dispatch(newCanvasOperation({
                type: direction === Direction.LEFT ? CanvasOperationEnum.RESIZE_ELEMENT_LEFT : CanvasOperationEnum.RESIZE_ELEMENT_RIGHT,
                elementId: props.utility.id
            }));
            setJoints(<g/>);
        },
        onFrameSetDefaultWidth: () => {},
        onFrameClick: onUtilityClick,
        onFrameMouseLeave: (event: React.MouseEvent) => {
            setJoints(<g/>);
        },
        onFrameMouseOver: (event: React.MouseEvent) => {
            if (isMouseDownState) {
                setJoints(<g/>);
            } else {
                setJoints((
                    <Joints
                        coordinates={{ x: frame.x, y: frame.y }}
                        width={frame.width}
                        height={frame.height}
                        fromElementId={props.utility.id}
                    />
                ));
            }   
        }
    };

    const interfaceHeadData: IUtilityHead = {
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
            text: props.utility.data.elementName
        }
    };

    const framePropertiesSegment = () => {
        return props.properties.length === 0 ? <g/> : (
            <FrameSegment graphicData={utilityPropertiesSegment}>
                {...utilityProperties}
             </FrameSegment>
        );
    };

    const frameMethodsSegment = () => {
        return props.methods.length === 0 ? <g/> : (
            <FrameSegment graphicData={utilityMethodsSegment}>
                {...utilityMethods}
             </FrameSegment>
        );  
    };

    return (
        <Frame graphicData={frame} functionality={frameFunctionality}>
                <FrameHead>
                    <UtilityHead {...interfaceHeadData}/>
                </FrameHead>
                {framePropertiesSegment()}
                {frameMethodsSegment()}
                {joints}
        </Frame>
    );
};

export default Utility;