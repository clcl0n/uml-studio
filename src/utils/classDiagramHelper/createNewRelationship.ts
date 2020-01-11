import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import { v4 } from 'uuid';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import Direction from '@enums/direction';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import SegmentDirection from '@enums/segmentDirection';

const createNewRelationship = (coordinates: {x1: number, y1: number, x2: number, y2: number}) => {
    const {x1, y1, x2, y2} = coordinates;
    const relationshipId = v4();
    const direction = x1 > x2 ? Direction.LEFT : Direction.RIGHT;
    let relationshipSegments: Array<IRelationshipSegment> = [];
    let height = 0;
    let width = x1 - x2;

    const addSegment = (segment: IRelationshipSegment) => {
        relationshipSegments.push(segment);
    };

    const startSegmentId = v4();
    const middleSegmentId = v4();
    const endSegmentId = v4();
    addSegment({
        id: startSegmentId,
        relationshipId,
        fromSegmentId: null,
        toSegmentId: middleSegmentId,
        direction: SegmentDirection.HORIZONTAL,
        isStart: true,
        isEnd: false,
        x: x1,
        y: y1,
        lineToX: -(width/2),
        lineToY: 0
    });

    if (y1 < y2) {
        height = y2 - y1;
        addSegment({
            id: middleSegmentId,
            relationshipId,
            fromSegmentId: startSegmentId,
            toSegmentId: endSegmentId,
            direction: SegmentDirection.VERTICAL,
            isStart: false,
            isEnd: false,
            x: x1 - (width / 2),
            y: y1,
            lineToX: 0,
            lineToY: height
        });

        addSegment({
            id: endSegmentId,
            relationshipId,
            fromSegmentId: middleSegmentId,
            toSegmentId: null,
            direction: SegmentDirection.HORIZONTAL,
            isStart: false,
            isEnd: true,
            x: x1 - (width / 2),
            y: y1 + height,
            lineToX: -(width / 2),
            lineToY: 0
        });
    } else {
        height = y1 - y2;
        addSegment({
            id: middleSegmentId,
            relationshipId,
            fromSegmentId: startSegmentId,
            toSegmentId: endSegmentId,
            direction: SegmentDirection.VERTICAL,
            isStart: false,
            isEnd: false,
            x: x1 - (width / 2),
            y: y1,
            lineToX: 0,
            lineToY: -height
        });

        addSegment({
            id: endSegmentId,
            relationshipId,
            fromSegmentId: middleSegmentId,
            toSegmentId: null,
            direction: SegmentDirection.HORIZONTAL,
            isStart: false,
            isEnd: true,
            x: x1 - (width / 2),
            y: y1 - height,
            lineToX: -(width / 2),
            lineToY: 0
        });
    }

    const relationship: IRelationship = {
       id:  relationshipId,
       type: ClassDiagramElementsEnum.ASSOCIATION,
       fromClassId: '',
       toClassId: '',
       head: {
           x: x2,
           y: y2
       },
       tail: {
           x: x1,
           y: y1
       },
       direction,
       segmentIds: [startSegmentId, middleSegmentId, endSegmentId]
    };

    return {
        relationship,
        relationshipSegments
    };
};

export default createNewRelationship;