import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './utility-head.scss';
import IUtilityHead from '@interfaces/class-diagram/utility/IUtilityHead';

const UtilityHead = (props: IUtilityHead) => {
    const { graphicData, title } = props;
    return (
        <g>
            <text
                className='interface'
                x={graphicData.textX}
                y={graphicData.elementTitleY}
            >
                {'<<utility>>'}
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

export default UtilityHead;