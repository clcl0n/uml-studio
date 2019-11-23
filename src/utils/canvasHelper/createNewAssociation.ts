import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IRelationElement from '@interfaces/elements/IRelationElement';
import { v4 } from 'uuid';
import IRelationSegment from '@interfaces/elements/IRelationSegment';

const createNewAssociation = (graphicData: {x1: number, y1: number, x2: number, y2: number}): IRelationElement => {
    let segments = Array<IRelationSegment>();
    let height = 0;
    let width = graphicData.x1 - graphicData.x2;
    segments.push(
        {
            x: graphicData.x1,
            y: graphicData.y1,
            lineToX: -(width / 2),
            lineToY: 0
        }
    );
    if (graphicData.y1 < graphicData.y2) {
        height = graphicData.y2 - graphicData.y1;
        segments.push(
            {
                x: graphicData.x1 - (width / 2),
                y: graphicData.y1,
                lineToX: 0,
                lineToY: height
            },
            {
                x: graphicData.x1 - (width / 2),
                y: graphicData.y1 + height,
                lineToX: -(width / 2),
                lineToY: 0
            }
        );
    } else {
        height = graphicData.y1 - graphicData.y2;
        segments.push(
            {
                x: graphicData.x1 - (width / 2),
                y: graphicData.y1,
                lineToX: 0,
                lineToY: -height
            },
            {
                x: graphicData.x1 - (width / 2),
                y: graphicData.y1 - height,
                lineToX: -(width / 2),
                lineToY: 0
            }
        );
    }

    const newAssociation: IRelationElement = {
        elementData: {
            id: v4(),
            type: ClassDiagramElementsEnum.ASSOCIATION
        },
        elementGraphicData: {
            fontMargin: 5,
            fontPixelSize: 12,
            segments
        },
        elementFunctionality: {}
    }

    return newAssociation;
};

export default createNewAssociation;