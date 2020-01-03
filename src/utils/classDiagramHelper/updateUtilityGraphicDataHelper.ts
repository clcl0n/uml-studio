import IUtility from '@interfaces/class-diagram/utility/IUtility';

const updateUtilityGraphicDataHelper = (utilityElement: IUtility) => {
    const { graphicData, data } = utilityElement;

    if (data.utilityMethodIds.length === 0 && data.utilityPropertyIds.length === 0) {
        graphicData.frame.height = graphicData.frame.rowHeight + (graphicData.frame.rowHeight / 2);
    } else {
            graphicData.sections.methods.y = graphicData.frame.y + (
                (data.utilityPropertyIds.length + 1) * graphicData.frame.rowHeight
            ) + (graphicData.frame.rowHeight / 2);
        
            graphicData.frame.height = (
                data.utilityPropertyIds.length + data.utilityMethodIds.length + 1
            ) * graphicData.frame.rowHeight + (graphicData.frame.rowHeight / 2);
    }

    return {
        ...utilityElement,
        graphicData
    };
};

export default updateUtilityGraphicDataHelper;