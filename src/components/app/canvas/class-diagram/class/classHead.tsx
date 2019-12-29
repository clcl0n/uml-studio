import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IClassHead from '@interfaces/class-diagram/class/IClassHead';
import './classHead.scss';

const ClassHead = (props: { classHead: IClassHead }) => {
    const { graphicData, data } = props.classHead;
    
    return (
        <text className='class-name' x={graphicData.text.x} y={graphicData.text.y}>
            {data.text}
        </text>
    );
};

export default ClassHead;