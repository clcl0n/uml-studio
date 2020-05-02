import { createFrame, moveFrame } from './frame';
import IObjectSlot from '@interfaces/class-diagram/object/IObjectSlot';
import IObject from '@interfaces/class-diagram/object/IObject';
import { v4 } from 'uuid';
import ICoordinates from '@interfaces/ICoordinates';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import EntryTypeEnum from '@enums/EntryTypeEnum';
import ICCXMLObject from '@interfaces/ccxml/ICCXMLObject';

export const createNewObjectFromCCXML = (coordinates: ICoordinates, ccxmlObject: ICCXMLObject) => {
    const slots = ccxmlObject.slots?.[0]?.slot ?? [];
    const frame = createFrame(coordinates, slots.length + 1, 25, 100, false);
    const entryIds: Array<string> = [];
    const entries: Array<IObjectSlot> = slots.map((ccxmlSlot): IObjectSlot => {
        const newSlotId = v4();
        entryIds.push(newSlotId);

        return {
            id: newSlotId,
            featureName: ccxmlSlot.$.feature,
            value: ccxmlSlot.$.value,
            type: EntryTypeEnum.SLOT
        };
    });

    const newObject: IObject = {
        id: v4(),
        data: {
            elementName: ccxmlObject.$.id,
            entryIds: entryIds
        },
        type: ClassDiagramElementsEnum.OBJECT,
        graphicData: {
            frame,
            sections: {}
        }
    };

    return {
        newObject,
        entries
    };
};

export const createNewObject = (coordinates: ICoordinates) => {
    const frame = createFrame(coordinates, 2);

    const slotId = v4();
    const newObjectSlot: IObjectSlot = {
        id: slotId,
        type: EntryTypeEnum.SLOT,
        featureName: 'feature',
        value: 'value'
    };
    const newObject: IObject = {
        id: v4(),
        data: {
            elementName: 'Object:Class',
            entryIds: [slotId]
        },
        type: ClassDiagramElementsEnum.OBJECT,
        graphicData: {
            frame,
            sections: {}
        }
    };
    
    return {
        newObjectSlot,
        newObject
    };
};

export const moveObject = (element: IObject, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IObject => {
    const newFrame = moveFrame(element, coordinates, oldCursorPosition);

    return {
        ...element,
        graphicData: {
            frame: newFrame,
            sections: {}
        }
    };
};

export const updateObjectGraphicData = (object: IObject) => {
    const { data, graphicData } = object;

    if (data.entryIds.length === 0) {
        graphicData.frame.height = 2 * graphicData.frame.rowHeight;
    } else {
        object.graphicData.frame.height = (
            data.entryIds.length + 1
        ) * object.graphicData.frame.rowHeight;
    }

    return {
        ...object,
        graphicData
    };
};