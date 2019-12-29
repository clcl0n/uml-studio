import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IFrameSegmentGraphicData from '@interfaces/class-diagram/common/IFrameSegmentGraphicData';

const FrameSegment = (props: {graphicData: IFrameSegmentGraphicData, children: React.ReactNode}) => {
    const { segmentSeparator } = props.graphicData;
    
    return (
        <g>
            <path
                d={`M ${segmentSeparator.x} ${segmentSeparator.y } l ${segmentSeparator.xLength} ${segmentSeparator.yLength}`}
                stroke='black'
            />
            {props.children}
        </g>
    );
};

export default FrameSegment;