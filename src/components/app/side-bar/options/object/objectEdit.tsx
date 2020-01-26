import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IObject from '@interfaces/class-diagram/object/IObject';
import { useDispatch } from 'react-redux';
import IObjectSlot from '@interfaces/class-diagram/object/IObjectSlot';
import SlotEdit from './slotEdit';
import { v4 } from 'uuid';
import log = require('loglevel');
import FrameEdit from '../common/frameEdit';
import SlotTableEdit from './slotTableEdit';
import { updateObjectGraphicData } from '@utils/elements/object';
import { updateElement, removeElementEntry, updateElementEntry, addNewElementEntry } from '@store/actions/classDiagram.action';
import EntryTypeEnum from '@enums/EntryTypeEnum';

const ObjectEdit = (props: { object: IObject, slots: Array<IObjectSlot> }) => {
    const dispatch = useDispatch();
    const { data } = props.object;
    const { slots } = props;

    const updateGraphic = (element: IObject): IObject => updateObjectGraphicData(element);
    const removeSlot = (slot: IObjectSlot) => {
        const updated = {...props.object};
        updated.data.entryIds.splice(updated.data.entryIds.indexOf(slot.id), 1);
        dispatch(updateElement(updateGraphic(updated)));
        dispatch(removeElementEntry(slot));
    };
    const updateSlot= (newFeature: string, newValue: string, slot: IObjectSlot) => {
        dispatch(updateElementEntry({
            ...slot,
            featureName: newFeature,
            value: newValue
        }));
    };
    const editSlots = () => {
        return slots.map((slot, index) => {
            return (
                <SlotEdit
                    key={index}
                    slot={slot}
                    updateSlot={updateSlot}
                    removeSlot={removeSlot}
                />
            );
        });
    };
    const addNewSlot = () => {
        log.debug(`Added new Object Slot. Object Id: ${props.object.id}`);
        const newSlotId = v4();
        dispatch(addNewElementEntry({
            id: newSlotId,
            type: EntryTypeEnum.SLOT,
            featureName: '',
            value: ''
        }));
        const updated = {...props.object};
        updated.data.entryIds.push(newSlotId);
        dispatch(updateElement(updateGraphic(updated)));
    };
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updated = {...props.object};
        updated.data.elementName = event.target.value;
        dispatch(updateElement(updateGraphic(updated)));
    };

    return (
        <FrameEdit inputLabel='Object Name' frameName={data.elementName} onNameChange={(ev) => onNameChange(ev)}>
            <SlotTableEdit addNewEntry={addNewSlot}>
                {editSlots()}
            </SlotTableEdit>
        </FrameEdit>
    );
};

export default ObjectEdit;