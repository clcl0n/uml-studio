import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IPrimitiveHead from '@interfaces/class-diagram/primitive/IPrimitiveHead';

const PrimitiveHead = (props: IPrimitiveHead) => {
    const { graphicData, data } = props;
    return (
        <g>
            <text className='svg-text svg-text-center' x={graphicData.title.x} y={graphicData.title.y}>
                {'<<primitive>>'}
            </text>
            <text className='svg-text svg-text-center' x={graphicData.text.x} y={graphicData.text.y}>
                {data.text}
            </text>
        </g>
    );
};

export default PrimitiveHead;