import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './interface-head.scss';
import IInterfaceHead from '@interfaces/class-diagram/interface/IInterfaceHead';

const InterfaceHead = (props: IInterfaceHead) => {
    const { graphicData, title } = props;
    return (
        <g>
            <text
                className='interface'
                x={graphicData.textX}
                y={graphicData.elementTitleY}
            >
                {'<<interface>>'}
            </text>
            <text
                className='interface-name'
                x={graphicData.textX}
                y={graphicData.textY}
            >
                {title}
            </text>
        </g>
    );
};

export default InterfaceHead;