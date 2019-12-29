import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IFrameHead from '@interfaces/class-diagram/common/IFrameHead';
import './frameHead.scss';

const FrameHead = (props: IFrameHead) => {
    const { title, graphicData } = props;

    return (
        <g className='frame-head'>
            <text
                className='frameName'
                x={graphicData.x}
                y={graphicData.y}
            >
                {title}
            </text>
        </g>
    );
};

export default FrameHead;