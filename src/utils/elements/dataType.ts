import { createFrame, moveFrame } from './frame';
import IDataTypeEntry from '@interfaces/class-diagram/data-type/IDataTypeEntry';
import { v4 } from 'uuid';
import IDataType from '@interfaces/class-diagram/data-type/IDataType';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import ICoordinates from '@interfaces/ICoordinates';

export const createNewDataType = (coordinates: ICoordinates) => {
    const frame = createFrame(coordinates, 2);

    const dataTypeEntryId = v4();
    const newDataTypeEntry: IDataTypeEntry = {
        id: dataTypeEntryId,
        value: 'entry_1'
    };

    frame.height += (frame.rowHeight / 2);

    const newDataType: IDataType = {
        id: v4(),
        type: ClassDiagramElementsEnum.DATA_TYPE,
        data: {
            dataTypeName: 'dataType',
            dataTypeEntryIds: [dataTypeEntryId]
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

    if (data.dataTypeEntryIds.length === 0) {
        graphicData.frame.height = graphicData.frame.rowHeight + (graphicData.frame.rowHeight / 2);
    } else {
        graphicData.frame.height = (
            data.dataTypeEntryIds.length + 1
        ) * graphicData.frame.rowHeight;
        graphicData.frame.height += (graphicData.frame.rowHeight / 2);
    }


    return {
        ...dataType,
        graphicData
    };
};
