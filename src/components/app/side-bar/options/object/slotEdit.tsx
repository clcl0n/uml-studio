import React from 'react';
import ReactDOM from 'react-dom';
import IObjectSlot from '@interfaces/class-diagram/object/IObjectSlot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SlotEdit = (props: {
    slot: IObjectSlot;
    removeSlot: (slot: IObjectSlot) => void;
    updateSlot: (newFeature: string, newValue: string, slot: IObjectSlot) => void;
}) => {
    const { slot, removeSlot, updateSlot } = props;

    return (
        <tr>
            <td>
                <input
                    type='text'
                    className='input'
                    placeholder='Feature'
                    value={slot.featureName}
                    onChange={(ev) => updateSlot(ev.target.value, slot.value, slot)}
                />
            </td>
            <td>
                <input
                    type='text'
                    className='input'
                    placeholder='Value'
                    value={slot.value}
                    onChange={(ev) => updateSlot(slot.featureName, ev.target.value, slot)}
                />
            </td>
            <td>
                <FontAwesomeIcon onClick={() => removeSlot(slot)} className='icon' icon='trash-alt'/>
            </td>
        </tr>
    );
};

export default SlotEdit;