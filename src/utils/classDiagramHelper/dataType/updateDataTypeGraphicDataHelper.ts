import IDataType from '@interfaces/class-diagram/data-type/IDataType';

const updateDataTypeGraphicDataHelper = (dataType: IDataType) => {
    const { graphicData, data } = dataType;

    if (data.dataTypeEntryIds.length === 0) {
        graphicData.frame.height = graphicData.frame.rowHeight + (graphicData.frame.rowHeight / 2);
    } else {
        graphicData.frame.height = (
            data.dataTypeEntryIds.length + 1
        ) * graphicData.frame.rowHeight;
    }

    graphicData.frame.height += (graphicData.frame.rowHeight / 2);

    return {
        ...dataType,
        graphicData
    };
};

export default updateDataTypeGraphicDataHelper;