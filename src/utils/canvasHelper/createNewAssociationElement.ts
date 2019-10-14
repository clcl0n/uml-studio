import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';

const createNewAssociationElement = () => {
    return {
        type: ClassDiagramElementsEnum.ASSOCIATION,
        x1: 1,
        y1: 10,
        x2: 10,
        y2: 100
    }
};

export default createNewAssociationElement;