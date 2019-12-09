import Direction from '@enums/Direction';
import IRelationElement from '@interfaces/elements/relation/IRelationElement';
import I2DCoordinates from '@interfaces/I2DCoordinates';
import { v4 } from 'uuid';
import * as log from 'loglevel';
import ISegmentData from '@interfaces/elements/segment/ISegmentData';
import ISegmentGraphicData from '@interfaces/elements/segment/ISegmentGraphicData';

const updateRelation = (direction: Direction, relation: IRelationElement, movingSegmentId: string, cooridates: I2DCoordinates): IRelationElement => {
    const movingSegmentGraphicData = relation.elementGraphicData.segments.find((segment) => segment.id === movingSegmentId);
    const movingSegmentData = relation.elementData.segments.find((segment) => segment.id === movingSegmentId);
    const dependentSegments = relation.elementGraphicData.segments.filter((segment) => segment.id === movingSegmentData.toSegmentId || segment.id === movingSegmentData.fromSegmentId); 
    let movingDirection = Direction.NONE;

    const updateHorizontalDependentSegments = () => {
        dependentSegments.forEach((segment) => {
            if (segment.x === movingSegmentGraphicData.x) {
                segment.x = cooridates.x;
                segment.lineToX -= cooridates.x - movingSegmentGraphicData.x;
            } else {
                segment.lineToX += cooridates.x - movingSegmentGraphicData.x;
            }
        });
        movingSegmentGraphicData.x = cooridates.x;
    };

    const updateVerticalDependentSegments = () => {
        dependentSegments.forEach((segment) => {
            if (segment.y === movingSegmentGraphicData.y) {
                segment.y = cooridates.y;
                segment.lineToY -= cooridates.y - movingSegmentGraphicData.y;
            } else {
                segment.lineToY += cooridates.y - movingSegmentGraphicData.y;
            }
        });
        movingSegmentGraphicData.y = cooridates.y;
    };

    const insertSegment = (segmentData: ISegmentData, segmentGraphicData: ISegmentGraphicData) => {
        relation.elementData.segments.push(segmentData);
        relation.elementGraphicData.segments.push(segmentGraphicData);
    };

    const insertStartingSegment = (lineToX: number, lineToY: number, direction: Direction) => {
        const newId = v4();
        insertSegment(
            {
                id: newId,
                fromSegmentId: null,
                toSegmentId: movingSegmentData.id,
                isEnd: false,
                isStart: true
            },
            {
                id: newId,
                direction,
                x: relation.elementGraphicData.tail.x,
                y: relation.elementGraphicData.tail.y,
                lineToX,
                lineToY
            }
        );
        direction === Direction.VERTICAL ? updateVerticalDependentSegments : updateHorizontalDependentSegments;
        movingSegmentData.isStart = false;
        movingSegmentData.fromSegmentId = newId;
    };

    const insertEndingSegment = (x: number, y: number, lineToX: number, lineToY: number, direction: Direction) => {
        const newId = v4();
        insertSegment(
            {
                id: newId,
                fromSegmentId: movingSegmentData.id,
                toSegmentId: null,
                isEnd: true,
                isStart: false
            },
            {
                id: newId,
                direction,
                x,
                y,
                lineToX,
                lineToY
            }
        );
        direction === Direction.VERTICAL ? updateVerticalDependentSegments : updateHorizontalDependentSegments;
        movingSegmentData.isEnd = false;
        movingSegmentData.toSegmentId = newId;
    };

    switch(direction) {
        case Direction.HORIZONTAL:
            movingDirection = movingSegmentGraphicData.y > cooridates.y ? Direction.UP : Direction.DOWN;
            const yLength = Math.abs(movingSegmentGraphicData.y - cooridates.y);
            if (movingSegmentData.isStart) {
                insertStartingSegment(
                    0,
                    movingDirection === Direction.UP ? -1 * yLength : yLength,
                    Direction.VERTICAL
                );
            } else if (movingSegmentData.isEnd) {
                insertEndingSegment(
                    relation.elementGraphicData.head.x,
                    relation.elementGraphicData.head.y,
                    0,
                    movingDirection === Direction.UP ? -1 * yLength : yLength,
                    Direction.VERTICAL
                );
            } else {
                updateVerticalDependentSegments();
            }
            return relation;
        case Direction.VERTICAL:
            movingDirection = movingSegmentGraphicData.x > cooridates.x ? Direction.LEFT: Direction.RIGHT;
            const lenghtX = Math.abs(movingSegmentGraphicData.x - cooridates.x);
            if (movingSegmentData.isStart) {
                insertStartingSegment(
                    movingDirection === Direction.LEFT ? -1 * lenghtX : lenghtX,
                    0,
                    Direction.HORIZONTAL
                );
            } else if (movingSegmentData.isEnd) {
                insertEndingSegment(
                    relation.elementGraphicData.head.x,
                    relation.elementGraphicData.head.y,
                    movingDirection === Direction.LEFT ? -1 * lenghtX : lenghtX,
                    0,
                    Direction.HORIZONTAL
                );
            } else {
                updateHorizontalDependentSegments();
            }
            return relation;
        default:
            return relation;
    }
};

export default updateRelation;