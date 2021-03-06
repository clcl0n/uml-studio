import React from 'react';
import ReactDOM from 'react-dom';
import './data-type.scss';
import IDataTypeProps from '@interfaces/class-diagram/data-type/IDataTypeProps';
import { useDispatch, useSelector } from 'react-redux';
import IFrameRow from '@interfaces/class-diagram/common/IFrameRow';
import IDataTypeEntry from '@interfaces/class-diagram/data-type/IDataTypeEntry';
import IDataTypeEntryProps from '@interfaces/class-diagram/data-type/IDataTypeEntryProps';
import DataTypeEntry from './dataTypeEntry';
import FrameRow from '../common/frameRow';
import { selectNewElement, isMouseDown, newCanvasOperation } from '@store/actions/canvas.action';
import IFrameFunctionality from '@interfaces/class-diagram/common/IFrameFunctionality';
import Joints from '../common/joints';
import IDataTypeHead from '@interfaces/class-diagram/data-type/IDataTypeHead';
import IFrameSegmentGraphicData from '@interfaces/class-diagram/common/IFrameSegmentGraphicData';
import Frame from '../common/frame';
import FrameHead from '../common/frameHead';
import DataTypeHead from './dataTypeHead';
import FrameSegment from '../common/frameSegment';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import Direction from '@enums/direction';
import IStoreState from '@interfaces/IStoreState';
import useCanvasOperation from 'hooks/useCanvasOperation';

const DataType = (props: IDataTypeProps) => {
    const dispatch = useDispatch();
    const [joints, setJoints] = React.useState(<g/>);
    const { canvasOperation } = useCanvasOperation();
    const isMouseDownState = useSelector((state: IStoreState) => state.canvas.isMouseDown);
    const { frame } = props.dataType.graphicData;
    const { data } = props.dataType;

    const createNewDataTypeEntry = (index: number, entry: IDataTypeEntry) => {
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

        const enumerationEntryProps: IDataTypeEntryProps = {
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
                <DataTypeEntry {...enumerationEntryProps}/>
            </FrameRow>
        );
    };

    const onDataTypeClick = (ev: React.MouseEvent) => {
        dispatch(selectNewElement(props.dataType.id));
    };
    const dataTypeEntries = props.entries.map((entry, index) => createNewDataTypeEntry(index, entry));
    const frameFunctionality: IFrameFunctionality = {
        onFrameMove: () => {
            if ((event.target as SVGElement).nodeName !== 'circle') {
                setJoints(<g/>);
                dispatch(isMouseDown(true));
                dispatch(newCanvasOperation({
                    type: CanvasOperationEnum.MOVE_ELEMENT,
                    elementId: props.dataType.id
                }));
                setJoints(<g/>);
            }
        },
        onFrameResize: (direction: Direction) => {
            dispatch(isMouseDown(true));
            dispatch(newCanvasOperation({
                type: direction === Direction.LEFT ? CanvasOperationEnum.RESIZE_ELEMENT_LEFT : CanvasOperationEnum.RESIZE_ELEMENT_RIGHT,
                elementId: props.dataType.id
            }));
            setJoints(<g/>);
        },
        onFrameSetDefaultWidth: () => {},
        onFrameClick: onDataTypeClick,
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
                        fromElementId={props.dataType.id}
                    />
                ));
            }
        }
    };
    const dataTypeHeadData: IDataTypeHead = {
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
    const dataTypeEntriesSegment: IFrameSegmentGraphicData = {
        segmentSeparator: {
            x: frame.x,
            y: frame.y + frame.rowHeight + (frame.rowHeight / 2),
            xLength: frame.width,
            yLength: 0
        }
    };

    const frameEntriesSegment = () => {
        return data.entryIds.length === 0 ? <g/> : (
            <FrameSegment graphicData={dataTypeEntriesSegment}>
                {...dataTypeEntries}
            </FrameSegment>
        );
    };

    return (
        <Frame graphicData={frame} functionality={frameFunctionality}>
            <FrameHead>
                <DataTypeHead {...dataTypeHeadData}/>
            </FrameHead>
            {frameEntriesSegment()}
            {joints}
        </Frame>
    );
};

export default DataType;