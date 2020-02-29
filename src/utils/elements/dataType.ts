import { createFrame, moveFrame } from './frame';
import IDataTypeEntry from '@interfaces/class-diagram/data-type/IDataTypeEntry';
import { v4 } from 'uuid';
import IDataType from '@interfaces/class-diagram/data-type/IDataType';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import ICoordinates from '@interfaces/ICoordinates';
import EntryTypeEnum from '@enums/EntryTypeEnum';
import ICCXMLDataType from '@interfaces/ccxml/ICCXMLDataType';

export const createNewDataTypeFromCCXML = (coordinates: ICoordinates, ccxmlDataType: ICCXMLDataType) => {
    const frame = createFrame(coordinates, ccxmlDataType.entry.length + 1);
    frame.height += (frame.rowHeight / 2);

    const entryIds: Array<string> = [];
    const entries: Array<IDataTypeEntry> = ccxmlDataType.entry.map((ccxmlEntry): IDataTypeEntry => {
        const newEntryId = v4();
        entryIds.push(newEntryId);

        return {
            id: newEntryId,
            type: EntryTypeEnum.BASE,
            value: ccxmlEntry.$.value
        };
    });

    const newDataType: IDataType = {
        id: v4(),
        type: ClassDiagramElementsEnum.DATA_TYPE,
        data: {
            elementName: ccxmlDataType.$.id,
            entryIds: entryIds
        },
        graphicData: {
            frame,
            sections: {}
        }
    };

    return {
        newDataType,
        entries
    };
};

export const createNewDataType = (coordinates: ICoordinates) => {
    const frame = createFrame(coordinates, 2);

    const dataTypeEntryId = v4();
    const newDataTypeEntry: IDataTypeEntry = {
        id: dataTypeEntryId,
        type: EntryTypeEnum.BASE,
        value: 'entry_1'
    };

    frame.height += (frame.rowHeight / 2);

    const newDataType: IDataType = {
        id: v4(),
        type: ClassDiagramElementsEnum.DATA_TYPE,
        data: {
            elementName: 'dataType',
            entryIds: [dataTypeEntryId]
        },
        graphicData: {
            frame,
            sections: {}
        }
    };

    return {
        newDataType,
        newDataTypeEntry
    };
};

export const moveDataType = (element: IDataType, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IDataType => {
    const newFrame = moveFrame(element, coordinates, oldCursorPosition);

    return {
        ...element,
        graphicData: {
            frame: newFrame,
            sections: {}
        }
    };
};

export const updateDataTypeGraphicData = (dataType: IDataType) => {
    const { graphicData, data } = dataType;

    if (data.entryIds.length === 0) {
        graphicData.frame.height = graphicData.frame.rowHeight + (graphicData.frame.rowHeight / 2);
    } else {
        graphicData.frame.height = (
            data.entryIds.length + 1
        ) * graphicData.frame.rowHeight;
        graphicData.frame.height += (graphicData.frame.rowHeight / 2);
    }


    return {
        ...dataType,
        graphicData
    };
};
