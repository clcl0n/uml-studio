import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './enumeration-head.scss';
import IEnumerationHead from '@interfaces/class-diagram/enumeration/IEnumerationHead';

const EnumerationHead = (props: IEnumerationHead) => {
    const { graphicData, data } = props;
    return (
        <g>
            <text className='enumeration' x={graphicData.title.x} y={graphicData.title.y}>
                {'<<enumeration>>'}
            </text>
            <text className='enumeration-name' x={graphicData.text.x} y={graphicData.text.y}>
                {data.text}
            </text>
        </g>
    );
};

export default EnumerationHead;