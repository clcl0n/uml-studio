import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IObject from '@interfaces/class-diagram/object/IObject';
import { useDispatch, useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import IObjectSlot from '@interfaces/class-diagram/object/IObjectSlot';
import { updateObject, removeObjectSlot, updateObjectSlot, addNewObjectSlot } from '@store/actions/classDiagram';
import SlotEdit from './slotEdit';
import { v4 } from 'uuid';
import log = require('loglevel');
import FrameEdit from '../common/frameEdit';
import SlotTableEdit from './slotTableEdit';
import { updateObjectGraphicData } from '@utils/elements/object';

const ObjectEdit = (props: { object: IObject }) => {
    const dispatch = useDispatch();
    const { data } = props.object;
    const selectedSlots = useSelector((state: IStoreState) => data.slotIds.map((id) => {
        return state.umlClassDiagram.objectSlots.byId[id];
    }));
    const updateGraphic = (element: IObject): IObject => updateObjectGraphicData(element);
    const removeSlot = (slot: IObjectSlot) => {
        const updated = {...props.object};
        updated.data.slotIds.splice(updated.data.slotIds.indexOf(slot.id), 1);
        dispatch(updateObject(updateGraphic(updated)));
        dispatch(removeObjectSlot(slot));
    };
    const updateSlot= (newFeature: string, newValue: string, slot: IObjectSlot) => {
        dispatch(updateObjectSlot({
            ...slot,
            featureName: newFeature,
            value: newValue
        }));
    };
    const editSlots = () => {
        return selectedSlots.map((slot, index) => {
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
        dispatch(addNewObjectSlot({
            id: newSlotId,
            featureName: '',
            value: ''
        }));
        const updated = {...props.object};
        updated.data.slotIds.push(newSlotId);
        dispatch(updateObject(updateGraphic(updated)));
    };
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updated = {...props.object};
        updated.data.objectName = event.target.value;
        dispatch(updateObject(updateGraphic(updated)));
    };

    return (
        <FrameEdit inputLabel='Object Name' frameName={data.objectName} onNameChange={(ev) => onNameChange(ev)}>
            <SlotTableEdit addNewEntry={addNewSlot}>
                {editSlots()}
            </SlotTableEdit>
        </FrameEdit>
    );
};

export default ObjectEdit;