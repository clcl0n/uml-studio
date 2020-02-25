import React from 'react';
import ReactDOM from 'react-dom';
import IObjectHead from '@interfaces/class-diagram/object/IObjectHead';

const ObjectHead = (props: { objectHead: IObjectHead }) => {
    const { data, graphicData } = props.objectHead;

    return (
        <text className='svg-text svg-text-center' x={graphicData.text.x} y={graphicData.text.y}>
            {data.text}
        </text>
    ); 
};

export default ObjectHead;