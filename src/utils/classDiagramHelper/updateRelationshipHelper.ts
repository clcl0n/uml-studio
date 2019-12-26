import { v4 } from 'uuid';
import * as log from 'loglevel';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import ICoordinates from '@interfaces/ICoordinates';
import Direction from '@enums/direction';
import SegmentDirection from '@enums/segmentDirection';

const updateRelationshipHelper = (direction: SegmentDirection, relationship: IRelationship, relationshipSegments: Array<IRelationshipSegment>, movingSegmentId: string, cooridates: ICoordinates) => {
    const movingSegment = relationshipSegments.find((segment) => segment.id === movingSegmentId);
    const dependentSegments = relationshipSegments.filter((segment) => segment.id === movingSegment.toSegmentId || segment.id === movingSegment.fromSegmentId);
    let movingDirection = Direction.NONE;
    
    const updateHorizontalDependentSegments = () => {
        dependentSegments.forEach((segment) => {
            if (segment.isStart) {
                segment.lineToX += cooridates.x - movingSegment.x;
            } else {
                if (segment.x === movingSegment.x) {
                    segment.x = cooridates.x;
                    segment.lineToX -= cooridates.x - movingSegment.x;
                } else {
                    segment.lineToX += cooridates.x - movingSegment.x;
                }
            }
        });
        movingSegment.x = cooridates.x;
    };

    const updateVerticalDependentSegments = () => {
        dependentSegments.forEach((segment) => {
            if (segment.isStart || segment.isEnd) {
                    segment.lineToY += cooridates.y - movingSegment.y;
            } else {
                if (segment.y === movingSegment.y) {
                    segment.y = cooridates.y;
                    segment.lineToY -= cooridates.y - movingSegment.y;
                } else {
                    segment.lineToY += cooridates.y - movingSegment.y;
                }
            }
        });
        movingSegment.y = cooridates.y;
    };

    const insertSegment = (relationshipSegment: IRelationshipSegment) => {
        relationship.segmentIds.push(relationshipSegment.id);
        relationshipSegments.push(relationshipSegment);
    };

    const insertStartingSegment = (lineToX: number, lineToY: number, segmentDirection: SegmentDirection) => {
        const newId = v4();
        insertSegment(
            {
                id: newId,
                fromSegmentId: null,
                toSegmentId: movingSegment.id,
                isEnd: false,
                isStart: true,
                direction: segmentDirection,
                x: relationship.tail.x,
                y: relationship.tail.y,
                lineToX,
                lineToY
            }
        );
        direction === SegmentDirection.HORIZONTAL ? updateVerticalDependentSegments() : updateHorizontalDependentSegments();
        movingSegment.isStart = false;
        movingSegment.fromSegmentId = newId;
    };

    const insertEndingSegment = (x: number, y: number, lineToX: number, lineToY: number, segmentDirection: SegmentDirection) => {
        const newId = v4();
        insertSegment(
            {
                id: newId,
                fromSegmentId: movingSegment.id,
                toSegmentId: null,
                isEnd: true,
                isStart: false,
                direction: segmentDirection,
                x,
                y,
                lineToX,
                lineToY
            }
        );
        direction === SegmentDirection.HORIZONTAL ? updateVerticalDependentSegments() : updateHorizontalDependentSegments();
        movingSegment.isEnd = false;
        movingSegment.toSegmentId = newId;
    };

    switch(direction) {
        case SegmentDirection.HORIZONTAL:
            movingDirection = movingSegment.y > cooridates.y ? Direction.UP : Direction.DOWN;
            const yLength = Math.abs(movingSegment.y - cooridates.y);
            if (movingSegment.isStart) {
                insertStartingSegment(
                    0,
                    movingDirection === Direction.UP ? -1 * yLength : yLength,
                    SegmentDirection.VERTICAL
                );
            } else if (movingSegment.isEnd) {
                insertEndingSegment(
                    relationship.head.x,
                    relationship.head.y,
                    0,
                    movingDirection === Direction.UP ? -1 * yLength : yLength,
                    SegmentDirection.VERTICAL
                );
            } else {
                updateVerticalDependentSegments();
            }
            return {
                relationship,
                relationshipSegments
            };
        case SegmentDirection.VERTICAL:
            movingDirection = movingSegment.x > cooridates.x ? Direction.LEFT: Direction.RIGHT;
            const lenghtX = Math.abs(movingSegment.x - cooridates.x);
            if (movingSegment.isStart) {
                insertStartingSegment(
                    movingDirection === Direction.LEFT ? -1 * lenghtX : lenghtX,
                    0,
                    SegmentDirection.HORIZONTAL
                );
            } else if (movingSegment.isEnd) {
                insertEndingSegment(
                    relationship.head.x,
                    relationship.head.y,
                    movingDirection === Direction.LEFT ? -1 * lenghtX : lenghtX,
                    0,
                    SegmentDirection.HORIZONTAL
                );
            } else {
                updateHorizontalDependentSegments();
            }
            return {
                relationship,
                relationshipSegments
            };
        default:
            return {
                relationship,
                relationshipSegments
            };
    }
};

export default updateRelationshipHelper;