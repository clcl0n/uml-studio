import React from 'react';
import ReactDOM from 'react-dom';
import IFrameRow from '@interfaces/class-diagram/common/IFrameRow';

const FrameRow = (props: { frameRow: IFrameRow, children: React.ReactNode }) => {
    const { graphicData } = props.frameRow;

    return (
        <g>
            <g>
                <rect
                    className='test'
                    fill='none'
                    x={graphicData.x}
                    y={(graphicData.y + (graphicData.index * graphicData.rowHeight))}
                    width={graphicData.width}
                    height={graphicData.rowHeight}
                />
            </g>
            {props.children}
        </g>
    );
};

export default FrameRow;