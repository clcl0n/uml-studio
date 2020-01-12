import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import ICoordinates from '@interfaces/ICoordinates';
import SegmentDirection from '@enums/segmentDirection';
import Direction from '@enums/direction';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import { v4 } from 'uuid';

const updateHorizontalDependentSegments = (dependentSegments: Array<IRelationshipSegment>, cooridates: ICoordinates, movingSegment: IRelationshipSegment) => {
    dependentSegments.forEach((segment) => {
        if (segment.isStart) {
            segment.lineToX += cooridates.x - movingSegment.x;
        } else if (segment.isEnd) {
            segment.x = cooridates.x;
            segment.lineToX += movingSegment.x - cooridates.x;
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

const updateVerticalDependentSegments = (dependentSegments: Array<IRelationshipSegment>, cooridates: ICoordinates, movingSegment: IRelationshipSegment) => {
    dependentSegments.forEach((segment) => {
        if (segment.isStart) {
                segment.lineToY += cooridates.y - movingSegment.y;
        } else if (segment.isEnd) {
            segment.y = cooridates.y;
            segment.lineToY += movingSegment.y - cooridates.y;
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

const pushNewRelationshipSegment = (newRelationshipSegment: IRelationshipSegment, relationship: IRelationship, relationshipSegments: Array<IRelationshipSegment>) => {
    relationship.segmentIds.push(newRelationshipSegment.id);
    relationshipSegments.push(newRelationshipSegment);
};

const pushNewStartingSegment = (
    lineToX: number,
    lineToY: number,
    segmentDirection: SegmentDirection,
    toSegmentId: string,
    relationship: IRelationship,
    relationshipSegments: Array<IRelationshipSegment>
) => {
    const newStartingSegment: IRelationshipSegment = {
        id: v4(),
        relationshipId: relationship.id,
        fromSegmentId: null,
        toSegmentId,
        isEnd: false,
        isStart: true,
        direction: segmentDirection,
        x: relationship.tail.x,
        y: relationship.tail.y,
        lineToX,
        lineToY: lineToY
    };

    pushNewRelationshipSegment(
        newStartingSegment,
        relationship,
        relationshipSegments
    );

    return newStartingSegment;
};

const pushNewEndingSegment = (
    lineToX: number,
    lineToY: number,
    segmentDirection: SegmentDirection,
    fromSegmentId: string,
    relationship: IRelationship,
    relationshipSegments: Array<IRelationshipSegment>
) => {
    const newEndingSegment: IRelationshipSegment = {
        id: v4(),
        relationshipId: relationship.id,
        fromSegmentId,
        toSegmentId: null,
        isEnd: true,
        isStart: false,
        direction: segmentDirection,
        x: relationship.head.x,
        y: relationship.head.y,
        lineToX,
        lineToY
    };

    pushNewRelationshipSegment(
        newEndingSegment,
        relationship,
        relationshipSegments
    );

    return newEndingSegment;
};

const updateDependentSegment = (direction: SegmentDirection, dependentSegments: Array<IRelationshipSegment>, cooridates: ICoordinates, movingSegment: IRelationshipSegment) => {
    direction === SegmentDirection.HORIZONTAL ? updateVerticalDependentSegments(
        dependentSegments,
        cooridates,
        movingSegment
    ) : updateHorizontalDependentSegments(
        dependentSegments,
        cooridates,
        movingSegment
    );
};

export const updateRelationshipHelper = (cooridates: ICoordinates, relationship: IRelationship, movingSegment: IRelationshipSegment, dependentSegments: Array<IRelationshipSegment>) => {
    const { direction } = movingSegment;
    let movingDirection = Direction.NONE;

    switch (direction) {
        case SegmentDirection.HORIZONTAL:
            movingDirection = movingSegment.y > cooridates.y ? Direction.UP : Direction.DOWN;
            const yLength = Math.abs(movingSegment.y - cooridates.y);
            if (movingSegment.isStart) {
                const { id: newSegmentId } = pushNewStartingSegment(
                    0,
                    movingDirection === Direction.UP ? -1 * yLength : yLength,
                    SegmentDirection.VERTICAL,
                    movingSegment.id,
                    relationship,
                    dependentSegments
                );
                movingSegment.isStart = false;
                movingSegment.fromSegmentId = newSegmentId;
            } else if (movingSegment.isEnd) {
                const { id: newSegmentId } = pushNewEndingSegment(
                    0,
                    movingDirection === Direction.UP ? yLength : -1 * yLength,
                    SegmentDirection.VERTICAL,
                    movingSegment.id,
                    relationship,
                    dependentSegments
                );
                movingSegment.isEnd = false;
                movingSegment.toSegmentId = newSegmentId;
            }
            updateDependentSegment(direction, dependentSegments, cooridates, movingSegment);
            break;
        case SegmentDirection.VERTICAL:
            movingDirection = movingSegment.x > cooridates.x ? Direction.LEFT: Direction.RIGHT;
            const lenghtX = Math.abs(movingSegment.x - cooridates.x);
            if (movingSegment.isStart) {
                const { id: newSegmentId } = pushNewStartingSegment(
                    movingDirection === Direction.LEFT ? -1 * lenghtX : lenghtX,
                    0,
                    SegmentDirection.HORIZONTAL,
                    movingSegment.id,
                    relationship,
                    dependentSegments
                );
                movingSegment.isStart = false;
                movingSegment.fromSegmentId = newSegmentId;
            } else if (movingSegment.isEnd) {
                const { id: newSegmentId } = pushNewEndingSegment(
                    movingDirection === Direction.LEFT ? -1 * lenghtX : lenghtX,
                    0,
                    SegmentDirection.HORIZONTAL,
                    movingSegment.id,
                    relationship,
                    dependentSegments
                );
                movingSegment.isEnd = false;
                movingSegment.toSegmentId = newSegmentId;
            }
            updateDependentSegment(direction, dependentSegments, cooridates, movingSegment);
            break;
    }

    return {
        relationship,
        relationshipSegments: [
            movingSegment,
            ...dependentSegments
        ]
    };
}

export const updateRelationshipEndingHelper = (cooridates: ICoordinates, relationship: IRelationship, movingSegment: IRelationshipSegment, dependentSegments: Array<IRelationshipSegment>) => {
    const { direction } = movingSegment;
    let movingDirection = Direction.NONE;
    
    switch (direction) {
        case SegmentDirection.HORIZONTAL:
            movingDirection = movingSegment.y > cooridates.y ? Direction.UP : Direction.DOWN;
            const yLength = Math.abs(movingSegment.y - cooridates.y);
            const xLenght = Math.abs(movingSegment.x - cooridates.x);
            if (movingSegment.isEnd) {
                let xDirection = movingSegment.x > cooridates.x ? Direction.LEFT: Direction.RIGHT;
                let yDirection = movingSegment.y > cooridates.y ? Direction.UP : Direction.DOWN;
                dependentSegments.forEach((segment) => {
                    segment.lineToY -= cooridates.y - movingSegment.y;
                });
                // updateHorizontalDependentSegments(dependentSegments, cooridates, movingSegment);
                // updateVerticalDependentSegments(dependentSegments, cooridates, movingSegment);
            }
            break;
        case SegmentDirection.VERTICAL:
            break;
    }

    return {
        relationship,
        relationshipSegments: [
            movingSegment,
            ...dependentSegments
        ]
    };
};