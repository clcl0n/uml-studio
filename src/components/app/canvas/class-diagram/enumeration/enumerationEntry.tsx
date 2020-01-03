import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IEnumerationEntry from '@interfaces/class-diagram/enumeration/IEnumerationEntry';
import ICoordinates from '@interfaces/ICoordinates';
import './enumeration-entry.scss';

const EnumerationEntry = (props: { entry: IEnumerationEntry, graphicData: { text: ICoordinates } }) => {
    const { entry, graphicData } = props;
    return (
        <text className='svg-text svg-text-center' x={graphicData.text.x} y={graphicData.text.y}>
            {entry.value}
        </text>
    );
};

export default EnumerationEntry;