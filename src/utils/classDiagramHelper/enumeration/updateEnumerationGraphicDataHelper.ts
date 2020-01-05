import IEnumeration from '@interfaces/class-diagram/enumeration/IEnumeration';

const updateEnumerationGraphicDataHelper = (enumeration: IEnumeration) => {
    const { graphicData, data } = enumeration;
    
    if (data.enumerationEntryIds.length === 0) {
        graphicData.frame.height = graphicData.frame.rowHeight + (graphicData.frame.rowHeight / 2);
    } else {
        graphicData.frame.height = (
            data.enumerationEntryIds.length + 1
        ) * graphicData.frame.rowHeight;
    }

    graphicData.frame.height += (graphicData.frame.rowHeight / 2);
    
    return {
        ...enumeration,
        graphicData
    };
};

export default updateEnumerationGraphicDataHelper;