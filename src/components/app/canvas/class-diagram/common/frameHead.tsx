import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './frameHead.scss';

const FrameHead = (props: { children: React.ReactNode }) => {

    return (
        <g className='frame-head'>
            {props.children}
        </g>
    );
};

export default FrameHead;