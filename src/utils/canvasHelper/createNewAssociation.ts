import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IRelationElement from '@interfaces/elements/relation/IRelationElement';
import { v4 } from 'uuid';
import ISegmentGraphicData from '@interfaces/elements/segment/ISegmentGraphicData';
import Direction from '@enums/Direction';
import ISegmentData from '@interfaces/elements/segment/ISegmentData';

const createNewAssociation = (graphicData: {x1: number, y1: number, x2: number, y2: number}): IRelationElement => {
    let segmentsGraphicData = Array<ISegmentGraphicData>();
    let segmentsData = Array<ISegmentData>();
    let height = 0;
    let width = graphicData.x1 - graphicData.x2;
    let direction = graphicData.x1 > graphicData.x2 ? Direction.LEFT : Direction.RIGHT;

    const addSegmentData = (id: string, fromSegmentId: string, toSegmentId: string, isStart: boolean, isEnd: boolean) => {
        segmentsData.push({ id, fromSegmentId, toSegmentId, isStart, isEnd });
    }

    const addSegmentGraphicData = (id: string, x: number, y: number, lineToX: number, lineToY: number, direction: Direction) => {
        segmentsGraphicData.push({ id, x, y, lineToX, lineToY, direction });
    }

    const startSegmentId = v4();
    const middleSegmentId = v4();
    const endSegmentId = v4();
    addSegmentData(startSegmentId, null, middleSegmentId, true, false);
    addSegmentGraphicData(startSegmentId, graphicData.x1, graphicData.y1, -(width / 2), 0, Direction.HORIZONTAL);

    if (graphicData.y1 < graphicData.y2) {
        height = graphicData.y2 - graphicData.y1;
        addSegmentData(middleSegmentId, startSegmentId, endSegmentId, false, false);
        addSegmentGraphicData(middleSegmentId, graphicData.x1 - (width / 2), graphicData.y1, 0, height, Direction.VERTICAL);

        addSegmentData(endSegmentId, middleSegmentId, null, false, true);
        addSegmentGraphicData(endSegmentId, graphicData.x1 - (width / 2), graphicData.y1 + height, -(width / 2), 0, Direction.HORIZONTAL);
    } else {
        height = graphicData.y1 - graphicData.y2;
        addSegmentData(middleSegmentId, startSegmentId, endSegmentId, false, false);
        addSegmentGraphicData(middleSegmentId, graphicData.x1 - (width / 2), graphicData.y1, 0, -height, Direction.VERTICAL);

        addSegmentData(endSegmentId, middleSegmentId, null, false, true);
        addSegmentGraphicData(endSegmentId, graphicData.x1 - (width / 2), graphicData.y1 -height, -(width / 2), 0, Direction.HORIZONTAL);
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
            tail: {
                x: graphicData.x1,
                y: graphicData.y1
            },
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