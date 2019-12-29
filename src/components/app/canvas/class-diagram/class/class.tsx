import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './class.scss';
import { selectNewElement } from '@store/actions/canvas';
import { useDispatch } from 'react-redux';
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

const Class = (props: IClassProps) => {
    const dispatch = useDispatch();
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
                textX: frame.xCenter,
                textY: y + (index * frame.rowHeight) + frame.fontPixelSize
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
        onFrameClick: onClassClick,
        onFrameMouseLeave: (event: React.MouseEvent) => {
            setJoints(<g/>);
        },
        onFrameMouseOver: (event: React.MouseEvent) => {
            setJoints((
                <Joints
                    coordinates={{ x: frame.x, y: frame.y }}
                    width={frame.width}
                    height={frame.height}
                    onJointClick={props.functionality.onJointClick}
                />
            ));
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
            textX: frame.xCenter,
            textY: frame.y + (frame.rowHeight / 2)
        },
        title: 'class name'
    };

    return (
        <Frame
            graphicData={frame}
            functionality={frameFunctionality}
        >
            <FrameHead>
                <ClassHead classHead={classHeadData}/>
            </FrameHead>
            <FrameSegment graphicData={classPropertiesSegment}>
                {...classProperties}
            </FrameSegment>
            <FrameSegment graphicData={classMethodsSegment}>
                {...classMethods}
            </FrameSegment>
            {joints}
        </Frame>
    );
};

export default Class;