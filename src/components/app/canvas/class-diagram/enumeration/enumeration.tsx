import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './enumeration.scss';
import IEnumerationProps from '@interfaces/class-diagram/enumeration/IEnumerationProps';
import { useDispatch } from 'react-redux';
import IFrameRow from '@interfaces/class-diagram/common/IFrameRow';
import FrameRow from '../common/frameRow';
import { selectNewElement } from '@store/actions/canvas';
import IFrameFunctionality from '@interfaces/class-diagram/common/IFrameFunctionality';
import Joints from '../common/joints';
import IEnumerationHead from '@interfaces/class-diagram/enumeration/IEnumerationHead';
import Frame from '../common/frame';
import FrameHead from '../common/frameHead';
import EnumerationHead from './enumerationHead';
import FrameSegment from '../common/frameSegment';
import IFrameSegmentGraphicData from '@interfaces/class-diagram/common/IFrameSegmentGraphicData';
import IEnumerationEntry from '@interfaces/class-diagram/enumeration/IEnumerationEntry';
import EnumerationEntry from './enumerationEntry';
import IEnumerationEntryProps from '@interfaces/class-diagram/enumeration/IEnumerationEntryProps';

const Enumeration = (props: IEnumerationProps) => {
    const dispatch = useDispatch();
    const [joints, setJoints] = React.useState(<g/>);
    const { frame } = props.enumeration.graphicData;
    const { data } = props.enumeration;

    const createNewEnumerationEntry = (index: number, entry: IEnumerationEntry) => {
        const frameRowProps: IFrameRow = {
            graphicData: {
                index,
                x: frame.x,
                y: frame.y + frame.rowHeight + (frame.rowHeight/2),
                xCenter: frame.xCenter,
                rowHeight: frame.rowHeight,
                width: frame.width,
                fontPixelSize: frame.fontPixelSize,
            }
        };

        const enumerationEntryProps: IEnumerationEntryProps = {
            graphicData: {
                text: {
                    x: frame.xCenter,
                    y: frame.y + ((index + 1) * frame.rowHeight) + frame.fontPixelSize + (frame.rowHeight/2)
                }
            },
            entry
        };

        return (
            <FrameRow key={index} frameRow={frameRowProps}>
                <EnumerationEntry {...enumerationEntryProps}/>
            </FrameRow>
        );
    };

    const onEnumerationClick = (ev: React.MouseEvent) => {
        dispatch(selectNewElement(props.enumeration.id));
    };

    const enumerationEntries = props.entries.map((entry, index) => createNewEnumerationEntry(index, entry));
    const frameFunctionality: IFrameFunctionality = {
        onFrameClick: onEnumerationClick,
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
    const enumerationHeadData: IEnumerationHead = {
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
            text: data.enumerationName
        }
    };

    const enumerationEntriesSegment: IFrameSegmentGraphicData = {
        segmentSeparator: {
            x: frame.x,
            y: frame.y + frame.rowHeight + (frame.rowHeight / 2),
            xLength: frame.width,
            yLength: 0
        }
    };

    const frameEntriesSegment = () => {
        return props.entries.length === 0 ? <g/> : (
            <FrameSegment graphicData={enumerationEntriesSegment}>
                {...enumerationEntries}
            </FrameSegment>
        );
    };

    return (
        <Frame graphicData={frame} functionality={frameFunctionality}>
            <FrameHead>
                <EnumerationHead {...enumerationHeadData}/>
            </FrameHead>
            {frameEntriesSegment()}
            {joints}
        </Frame>
    );
};

export default Enumeration;