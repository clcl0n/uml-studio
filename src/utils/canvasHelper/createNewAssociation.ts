import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IAssociationElement from '@interfaces/elements/IAssociationElement';

const createNewAssociation = (): IAssociationElement => {
    const newAssociation: IAssociationElement = {
        elementData: {
            id: 'id',
            type: ClassDiagramElementsEnum.ASSOCIATION
        },
        elementGraphicData: {
            fontMargin: 5,
            fontPixelSize: 12,
            x1: 1,
            y1: 10,
            x2: 10,
            y2: 10
        }
    }

    return newAssociation;
};

export default createNewAssociation;