import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import IUtilityProps from '@interfaces/class-diagram/utility/IUtilityProps';
import IFrameRow from '@interfaces/class-diagram/common/IFrameRow';
import IUtilityMethod from '@interfaces/class-diagram/utility/IUtilityMethod';
import IUtilityProperty from '@interfaces/class-diagram/utility/IUtilityProperty';
import IClassAttribute from '@interfaces/class-diagram/class/IClassAttribute';
import FrameRow from '../common/frameRow';
import ClassAttribute from '../class/classAttribute';
import { selectNewElement } from '@store/actions/canvas';
import IFrameSegmentGraphicData from '@interfaces/class-diagram/common/IFrameSegmentGraphicData';
import IFrameFunctionality from '@interfaces/class-diagram/common/IFrameFunctionality';
import Joints from '../common/joints';
import IUtilityHead from '@interfaces/class-diagram/utility/IUtilityHead';
import Frame from '../common/frame';
import FrameHead from '../common/frameHead';
import UtilityHead from './utilityHead';
import FrameSegment from '../common/frameSegment';

const Utility = (props: IUtilityProps) => {
    const dispatch = useDispatch();
    const [joints, setJoints] = React.useState(<g/>);
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


    const interfaceProperties = props.properties.map((classProperty, index) => createNewUtilityRow(index, classProperty, sections.properties.y));
    const interfaceMethods = props.methods.map((classMethods, index) => createNewUtilityRow(index, classMethods, sections.methods.y));

    const frameFunctionality: IFrameFunctionality = {
        onFrameClick: onUtilityClick,
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

    const interfaceHeadData: IUtilityHead = {
        graphicData: {
            textX: frame.xCenter,
            textY: frame.y + frame.rowHeight,
            elementTitleY: frame.y + (frame.rowHeight / 2)
        },
        title: 'utility name'
    };

    return (
        <Frame graphicData={frame} functionality={frameFunctionality}>
                <FrameHead>
                    <UtilityHead {...interfaceHeadData}/>
                </FrameHead>
                <FrameSegment graphicData={utilityPropertiesSegment}>
                {...interfaceProperties}
                </FrameSegment>
                <FrameSegment graphicData={utilityMethodsSegment}>
                {...interfaceMethods}
                </FrameSegment>
                {joints}
        </Frame>
    );
};

export default Utility;