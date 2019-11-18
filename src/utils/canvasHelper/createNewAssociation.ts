import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IRelationElement from '@interfaces/elements/IRelationElement';
import { v4 } from 'uuid';

const createNewAssociation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): IRelationElement => {
    const newAssociation: IRelationElement = {
        elementData: {
            id: v4(),
            type: ClassDiagramElementsEnum.ASSOCIATION
        },
        elementGraphicData: {
            fontMargin: 5,
            fontPixelSize: 12,
            x1: event.nativeEvent.offsetX,
            y1: event.nativeEvent.offsetX,
            x2: 0,
            y2: 0
        },
        elementFunctionality: {}
    }

    return newAssociation;
};

export default createNewAssociation;