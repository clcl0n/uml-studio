import ICoordinates from '@interfaces/ICoordinates';
import createFrameHelper from '../createFrameHelper';
import { v4 } from 'uuid';
import IDataTypeEntry from '@interfaces/class-diagram/data-type/IDataTypeEntry';
import IDataType from '@interfaces/class-diagram/data-type/IDataType';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';

const createNewDataTypeHelper = (coordinates: ICoordinates) => {
    const frame = createFrameHelper(coordinates, 2);

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

export default createNewDataTypeHelper;