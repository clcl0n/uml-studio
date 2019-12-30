import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './data-type.scss';
import IDataTypeProps from '@interfaces/class-diagram/data-type/IDataTypeProps';
import { useDispatch } from 'react-redux';
import IFrameRow from '@interfaces/class-diagram/common/IFrameRow';
import IDataTypeEntry from '@interfaces/class-diagram/data-type/IDataTypeEntry';
import IDataTypeEntryProps from '@interfaces/class-diagram/data-type/IDataTypeEntryProps';
import DataTypeEntry from './dataTypeEntry';
import FrameRow from '../common/frameRow';
import { selectNewElement } from '@store/actions/canvas';
import IFrameFunctionality from '@interfaces/class-diagram/common/IFrameFunctionality';
import Joints from '../common/joints';
import IDataTypeHead from '@interfaces/class-diagram/data-type/IDataTypeHead';
import IFrameSegmentGraphicData from '@interfaces/class-diagram/common/IFrameSegmentGraphicData';
import Frame from '../common/frame';
import FrameHead from '../common/frameHead';
import DataTypeHead from './dataTypeHead';
import FrameSegment from '../common/frameSegment';

const DataType = (props: IDataTypeProps) => {
    const dispatch = useDispatch();
    const [joints, setJoints] = React.useState(<g/>);
    const { frame } = props.dataType.graphicData;
    const { data } = props.dataType;

    const createNewDataTypeEntry = (index: number, entry: IDataTypeEntry) => {
        const frameRowProps: IFrameRow = {
            graphicData: {
                index,
                x: frame.x,
                y: frame.y,
                xCenter: frame.xCenter,
                rowHeight: frame.rowHeight,
                width: frame.width,
                fontPixelSize: frame.fontPixelSize,
            }
        };

        const enumerationEntryProps: IDataTypeEntryProps = {
            graphicData: {
                text: {
                    x: frame.xCenter,
                    y: frame.y + (index + 1 * frame.rowHeight) + frame.fontPixelSize
                }
            },
            entry
        };

        return (
            <FrameRow key={index} frameRow={frameRowProps}>
                <DataTypeEntry {...enumerationEntryProps}/>
            </FrameRow>
        );
    };

    const onDataTypeClick = (ev: React.MouseEvent) => {
        dispatch(selectNewElement(props.dataType.id));
    };
    const dataTypeEntries = props.entries.map((entry, index) => createNewDataTypeEntry(index, entry));
    const frameFunctionality: IFrameFunctionality = {
        onFrameClick: onDataTypeClick,
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
    const enumerationHeadData: IDataTypeHead = {
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
            text: data.dataTypeName
        }
    };
    const enumerationEntriesSegment: IFrameSegmentGraphicData = {
        segmentSeparator: {
            x: frame.x,
            y: frame.y + frame.rowHeight,
            xLength: frame.width,
            yLength: 0
        }
    };

    return (
        <Frame graphicData={frame} functionality={frameFunctionality}>
            <FrameHead>
                <DataTypeHead {...enumerationHeadData}/>
            </FrameHead>
            <FrameSegment graphicData={enumerationEntriesSegment}>
                {...dataTypeEntries}
            </FrameSegment>
            {joints}
        </Frame>
    );
};

export default DataType;