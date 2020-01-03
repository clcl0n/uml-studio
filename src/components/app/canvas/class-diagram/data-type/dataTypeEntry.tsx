import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './data-type-entry.scss';
import IDataTypeEntry from '@interfaces/class-diagram/data-type/IDataTypeEntry';
import ICoordinates from '@interfaces/ICoordinates';

const DataTypeEntry = (props: { entry: IDataTypeEntry, graphicData: { text: ICoordinates } }) => {
    const { entry, graphicData } = props;
    return (
        <text className='svg-text svg-text-center' x={graphicData.text.x} y={graphicData.text.y}>
            {entry.value}
        </text>
    );
};

export default DataTypeEntry;