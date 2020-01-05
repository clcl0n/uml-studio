import IInterface from '@interfaces/class-diagram/interface/IInterface';

const updateInterfaceGraphicDataHelper = (interfaceElement: IInterface) => {
    const { graphicData, data } = interfaceElement;

    if (data.interfaceMethodIds.length === 0 && data.interfacePropertyIds.length === 0) {
        graphicData.frame.height = graphicData.frame.rowHeight + (graphicData.frame.rowHeight / 2);
    } else {
            graphicData.sections.methods.y = graphicData.frame.y + (
                (data.interfacePropertyIds.length + 1) * graphicData.frame.rowHeight
            ) + (graphicData.frame.rowHeight / 2);
        
            graphicData.frame.height = (
                data.interfacePropertyIds.length + data.interfaceMethodIds.length + 1
            ) * graphicData.frame.rowHeight + (graphicData.frame.rowHeight / 2);
    }

    return {
        ...interfaceElement,
        graphicData
    };
};

export default updateInterfaceGraphicDataHelper;