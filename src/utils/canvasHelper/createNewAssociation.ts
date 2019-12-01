import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IRelationElement from '@interfaces/elements/relation/IRelationElement';
import { v4 } from 'uuid';
import ISegmentGraphicData from '@interfaces/elements/segment/ISegmentGraphicData';
import RelationDirection from '@enums/relationDirection';
import ISegmentData from '@interfaces/elements/segment/ISegmentData';

const createNewAssociation = (graphicData: {x1: number, y1: number, x2: number, y2: number}): IRelationElement => {
    let segmentsGraphicData = Array<ISegmentGraphicData>();
    let segmentsData = Array<ISegmentData>();
    let height = 0;
    let width = graphicData.x1 - graphicData.x2;
    let direction = graphicData.x1 > graphicData.x2 ? RelationDirection.LEFT : RelationDirection.RIGHT;

    const addSegmentData = (id: string, fromSegmentId: string, toSegmentId: string, isStart: boolean, isEnd: boolean) => {
        segmentsData.push({ id, fromSegmentId, toSegmentId, isStart, isEnd });
    }

    const addSegmentGraphicData = (x: number, y: number, lineToX: number, lineToY: number) => {
        segmentsGraphicData.push({ x, y, lineToX, lineToY });
    }

    const startSegmentId = v4();
    const middleSegmentId = v4();
    const endSegmentId = v4();
    addSegmentData(startSegmentId, null, middleSegmentId, true, false);
    addSegmentGraphicData(graphicData.x1, graphicData.y1, -(width / 2), 0);

    if (graphicData.y1 < graphicData.y2) {
        height = graphicData.y2 - graphicData.y1;
        addSegmentData(middleSegmentId, startSegmentId, endSegmentId, false, false);
        addSegmentGraphicData(graphicData.x1 - (width / 2), graphicData.y1, 0, height);

        addSegmentData(endSegmentId, middleSegmentId, null, false, true);
        addSegmentGraphicData(graphicData.x1 - (width / 2), graphicData.y1 + height, -(width / 2), 0);
    } else {
        height = graphicData.y1 - graphicData.y2;
        addSegmentData(middleSegmentId, startSegmentId, endSegmentId, false, false);
        addSegmentGraphicData(graphicData.x1 - (width / 2), graphicData.y1, 0, -height);

        addSegmentData(endSegmentId, middleSegmentId, null, false, true);
        addSegmentGraphicData(graphicData.x1 - (width / 2), graphicData.y1 -height, -(width / 2), 0);
    }

    const newAssociation: IRelationElement = {
        elementData: {
            id: v4(),
            type: ClassDiagramElementsEnum.ASSOCIATION,
            fromClassId: '',
            toClassId: '',
            segments: segmentsData
        },
        elementGraphicData: {
            fontMargin: 5,
            fontPixelSize: 12,
            head: {
                x: graphicData.x2,
                y: graphicData.y2
            },
            segments: segmentsGraphicData,
            direction
        },
        elementFunctionality: {}
    }

    return newAssociation;
};

export default createNewAssociation;