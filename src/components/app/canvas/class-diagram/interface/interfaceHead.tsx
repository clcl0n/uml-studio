import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './interface-head.scss';
import IInterfaceHead from '@interfaces/class-diagram/interface/IInterfaceHead';

const InterfaceHead = (props: IInterfaceHead) => {
    const { graphicData, data } = props;
    return (
        <g>
            <text className='interface' x={graphicData.title.x} y={graphicData.title.y}>
                {'<<interface>>'}
            </text>
            <text className='interface-name' x={graphicData.text.x} y={graphicData.text.y}>
                {data.text}
            </text>
        </g>
    );
};

export default InterfaceHead;