import IObject from '@interfaces/class-diagram/object/IObject';

const updateObjectGraphicDataHelper = (object: IObject) => {
    const { data, graphicData } = object;

    if (data.slotIds.length === 0) {
        graphicData.frame.height = 2 * graphicData.frame.rowHeight;
    } else {
        object.graphicData.frame.height = (
            data.slotIds.length + 1
        ) * object.graphicData.frame.rowHeight;
    }

    return {
        ...object,
        graphicData
    };
};

export default updateObjectGraphicDataHelper;