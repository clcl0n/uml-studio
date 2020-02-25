import React from 'react';
import ReactDOM from 'react-dom';
import './enumeration-head.scss';
import IEnumerationHead from '@interfaces/class-diagram/enumeration/IEnumerationHead';

const EnumerationHead = (props: IEnumerationHead) => {
    const { graphicData, data } = props;
    return (
        <g>
            <text className='svg-text svg-text-center' x={graphicData.title.x} y={graphicData.title.y}>
                {'<<enumeration>>'}
            </text>
            <text className='svg-text svg-text-center' x={graphicData.text.x} y={graphicData.text.y}>
                {data.text}
            </text>
        </g>
    );
};

export default EnumerationHead;