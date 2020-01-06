import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IPrimitiveTypeHead from '@interfaces/class-diagram/primitive-type/IPrimitiveTypeHead';

const PrimitiveTypeHead = (props: IPrimitiveTypeHead) => {
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

export default PrimitiveTypeHead;