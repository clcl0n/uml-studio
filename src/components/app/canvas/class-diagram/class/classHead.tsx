import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IClassHead from '@interfaces/class-diagram/class/IClassHead';
import './classHead.scss';

const ClassHead = (props: { classHead: IClassHead }) => {
    const { graphicData, title } = props.classHead;
    
    return (
        <text
            className='class-name'
            x={graphicData.textX}
            y={graphicData.textY}
        >
            {title}
        </text>
    );
};

export default ClassHead;