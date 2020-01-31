import React from 'react';
import ReactDOM from 'react-dom';
import IObjectSlotProps from '@interfaces/class-diagram/object/IObjectSlotProps';

const ObjectSlot = (props: IObjectSlotProps) => {
    const { graphicData, slot } = props;
    return (
        <text className='svg-text svg-text-center' x={graphicData.text.x} y={graphicData.text.y}>
            {`${slot.featureName} = ${slot.value}`}
        </text>
    );
};

export default ObjectSlot;