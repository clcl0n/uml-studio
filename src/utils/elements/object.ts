import { createFrame, moveFrame } from './frame';
import IObjectSlot from '@interfaces/class-diagram/object/IObjectSlot';
import IObject from '@interfaces/class-diagram/object/IObject';
import { v4 } from 'uuid';
import ICoordinates from '@interfaces/ICoordinates';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import EntryTypeEnum from '@enums/EntryTypeEnum';

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