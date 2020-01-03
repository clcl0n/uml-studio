import IClass from '@interfaces/class-diagram/class/IClass';

const updateClassGraphicDataHelper = (classElement: IClass) => {
    const { graphicData, data } = classElement;

    if (data.classMethodIds.length === 0 && data.classPropertyIds.length === 0) {
        graphicData.frame.height = 2 * graphicData.frame.rowHeight;
    } else {
        classElement.graphicData.sections.methods.y = classElement.graphicData.frame.y + (
            (data.classPropertyIds.length + 1) * classElement.graphicData.frame.rowHeight
        );

        classElement.graphicData.frame.height = (
            data.classPropertyIds.length + data.classMethodIds.length + 1
        ) * classElement.graphicData.frame.rowHeight;
    }

    return {
        ...classElement,
        graphicData
    };
};

export default updateClassGraphicDataHelper;