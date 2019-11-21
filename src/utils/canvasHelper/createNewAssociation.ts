import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IRelationElement from '@interfaces/elements/IRelationElement';
import { v4 } from 'uuid';

const createNewAssociation = (graphicData: {x1: number, y1: number, x2: number, y2: number}): IRelationElement => {
    const newAssociation: IRelationElement = {
        elementData: {
            id: v4(),
            type: ClassDiagramElementsEnum.ASSOCIATION
        },
        elementGraphicData: {
            fontMargin: 5,
            fontPixelSize: 12,
            x1: graphicData.x1,
            y1: graphicData.y1,
            x2: graphicData.x2,
            y2: graphicData.y2
        },
        elementFunctionality: {}
    }

    return newAssociation;
};

export default createNewAssociation;