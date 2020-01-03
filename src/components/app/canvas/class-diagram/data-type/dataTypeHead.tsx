import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './data-type-head.scss';
import IDataTypeHead from '@interfaces/class-diagram/data-type/IDataTypeHead';

const DataTypeHead = (props: IDataTypeHead) => {
    const { graphicData, data } = props;
    return (
        <g>
            <text className='svg-text svg-text-center' x={graphicData.title.x} y={graphicData.title.y}>
                {'<<dataType>>'}
            </text>
            <text className='svg-text svg-text-center' x={graphicData.text.x} y={graphicData.text.y}>
                {data.text}
            </text>
        </g>
    );
};

export default DataTypeHead;