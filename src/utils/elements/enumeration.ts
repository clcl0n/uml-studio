import { createFrame, moveFrame } from './frame';
import IEnumerationEntry from '@interfaces/class-diagram/enumeration/IEnumerationEntry';
import IEnumeration from '@interfaces/class-diagram/enumeration/IEnumeration';
import { v4 } from 'uuid';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import ICoordinates from '@interfaces/ICoordinates';
import EntryTypeEnum from '@enums/EntryTypeEnum';

export const createNewEnumeration = (coordinates: ICoordinates) => {
    const frame = createFrame(coordinates, 2);

    const enumerationEntryId = v4();
    const newEntry: IEnumerationEntry = {
        id: enumerationEntryId,
        type: EntryTypeEnum.BASE,
        value: 'entry_1'
    };

    frame.height += (frame.rowHeight / 2);

    const newEnumeration: IEnumeration = {
        id: v4(),
        type: ClassDiagramElementsEnum.ENUMERATION,
        data: {
            elementName: 'enum',
            entryIds: [enumerationEntryId]
        },
        graphicData: {
            frame,
            sections: {}
        }
    };

    return {
        newEnumeration,
        newEntry
    };
};

export const moveEnumeration = (element: IEnumeration, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IEnumeration => {
    const newFrame = moveFrame(element, coordinates, oldCursorPosition);

    return {
        ...element,
        graphicData: {
            frame: newFrame,
            sections: {}
        }
    };
};

export const updateEnumerationGraphicData = (enumeration: IEnumeration) => {
    const { graphicData, data } = enumeration;
    
    if (data.entryIds.length === 0) {
        graphicData.frame.height = graphicData.frame.rowHeight + (graphicData.frame.rowHeight / 2);
    } else {
        graphicData.frame.height = (
            data.entryIds.length + 1
        ) * graphicData.frame.rowHeight;
        graphicData.frame.height += (graphicData.frame.rowHeight / 2);
    }

    
    return {
        ...enumeration,
        graphicData
    };
};