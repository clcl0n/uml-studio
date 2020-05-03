import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import ICoordinates from '@interfaces/ICoordinates';
import SegmentDirection from '@enums/segmentDirection';
import Direction from '@enums/direction';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import { v4 } from 'uuid';
import ClassDiagramRelationshipTypesEnum from '@enums/classDiagramRelationshipTypesEnum';

export const createNewRelationshipSameLayerSCXML = (type: ClassDiagramRelationshipTypesEnum, coordinates: {x1: number, y1: number, x2: number, y2: number}, fromElementId: string = '', toElementId: string = '', centerOffset = 0) => {
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
        lineToX: -(width/2) + centerOffset,
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
            x: x1 - (width / 2) + centerOffset,
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
            x: x1 - (width / 2) + centerOffset,
            y: y1 - height,
            lineToX: -(width / 2) - centerOffset,
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
            x: x1 - (width / 2) + centerOffset,
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
            x: x1 - (width / 2) + centerOffset,
            y: y1 + height,
            lineToX: -(width / 2) - centerOffset,
            lineToY: 0
        });
    }

    const relationship: IRelationship = {
        id:  relationshipId,
        type,
        fromElementId,
        toElementId,
        headValue: '',
        relationshipValue: 'relationship',
        tailValue: '',
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

export const createNewRelationship = (type: ClassDiagramRelationshipTypesEnum, coordinates: {x1: number, y1: number, x2: number, y2: number}, fromElementId: string = '', toElementId: string = '', centerOffset = 0, relationshipValue = '') => {
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
        lineToX: -(width/2) + centerOffset,
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
            x: x1 - (width / 2) + centerOffset,
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
            x: x1 - (width / 2) + centerOffset,
            y: y1 + height,
            lineToX: -(width / 2) - centerOffset,
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
            x: x1 - (width / 2) + centerOffset,
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
            x: x1 - (width / 2) + centerOffset,
            y: y1 - height,
            lineToX: -(width / 2) - centerOffset,
            lineToY: 0
        });
    }

    const relationship: IRelationship = {
       id:  relationshipId,
       type,
       fromElementId,
       toElementId,
       headValue: '',
       relationshipValue,
       tailValue: '',
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
            let yLength = Math.abs(movingSegment.y - cooridates.y);
            if (movingSegment.isStart) {
                yLength = movingSegment.y - dependentSegments.filter((segment) => segment.id === movingSegment.toSegmentId)[0].y;
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
                const dependentSegment = dependentSegments.filter((segment) => segment.id === movingSegment.fromSegmentId)[0];
                yLength = movingSegment.y - (dependentSegment.y + dependentSegment.lineToY);
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
            let lenghtX = Math.abs(movingSegment.x - cooridates.x);
            if (movingSegment.isStart) {
                lenghtX = movingSegment.x - dependentSegments.filter((segment) => segment.id === movingSegment.toSegmentId)[0].x;
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
                const dependentSegment = dependentSegments.filter((segment) => segment.id === movingSegment.fromSegmentId)[0];
                lenghtX = movingSegment.x - (dependentSegment.x + dependentSegment.lineToX);
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
};

export const updateRelationshipStartingHelper = (cooridates: ICoordinates, relationship: IRelationship, movingSegment: IRelationshipSegment, dependentSegments: Array<IRelationshipSegment>) => {
    const { direction } = movingSegment;
    let movingDirection = Direction.NONE;
    let yLength = 0;
    let xLength = 0;
    switch (direction) {
        case SegmentDirection.HORIZONTAL:
            movingDirection = movingSegment.y > cooridates.y ? Direction.UP : Direction.DOWN;
            yLength = Math.abs(movingSegment.y - cooridates.y);
            xLength = Math.abs(movingSegment.x - cooridates.x);
            if (movingSegment.isStart) {
                let xDirection = movingSegment.x > cooridates.x ? Direction.LEFT: Direction.RIGHT;
                let yDirection = movingSegment.y > cooridates.y ? Direction.UP : Direction.DOWN;
                dependentSegments.forEach((segment) => {
                    segment.y = cooridates.y;
                    segment.lineToY -= yDirection === Direction.DOWN ? yLength : -yLength;
                });
                movingSegment.y = cooridates.y;
                movingSegment.x = cooridates.x;
                movingSegment.lineToX -= xDirection === Direction.RIGHT ? xLength : -xLength;
                relationship.tail = {
                    x: cooridates.x,
                    y: movingSegment.y  
                };
            }
            break;
        case SegmentDirection.VERTICAL:
            movingDirection = movingSegment.y > cooridates.y ? Direction.UP : Direction.DOWN;
            yLength = Math.abs(movingSegment.y - cooridates.y);
            xLength = Math.abs(movingSegment.x - cooridates.x);
            if (movingSegment.isStart) {
                let xDirection = movingSegment.x > cooridates.x ? Direction.LEFT: Direction.RIGHT;
                let yDirection = movingSegment.y > cooridates.y ? Direction.UP : Direction.DOWN;
                dependentSegments.forEach((segment) => {
                    segment.x = cooridates.x;
                    segment.lineToX -= xDirection === Direction.RIGHT ? xLength : -xLength;
                });
                movingSegment.x = cooridates.x;
                movingSegment.y = cooridates.y;
                movingSegment.lineToY -= yDirection === Direction.DOWN ? yLength : -yLength;
                relationship.tail = {
                    x: cooridates.x,
                    y: movingSegment.y
                };
            }
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

export const updateRelationshipEndingHelper = (cooridates: ICoordinates, relationship: IRelationship, dependentSegments: Array<IRelationshipSegment>, movingSegment?: IRelationshipSegment) => {
    const { direction } = movingSegment;
    let movingDirection = Direction.NONE;
    let yLength = 0;
    let xLength = 0;
    switch (direction) {
        case SegmentDirection.HORIZONTAL:
            movingDirection = movingSegment.y > cooridates.y ? Direction.UP : Direction.DOWN;
            yLength = Math.abs(movingSegment.y - cooridates.y);
            xLength = Math.abs(movingSegment.x - cooridates.x);
            if (movingSegment.isEnd) {
                let xDirection = movingSegment.x > cooridates.x ? Direction.LEFT: Direction.RIGHT;
                let yDirection = movingSegment.y > cooridates.y ? Direction.UP : Direction.DOWN;
                dependentSegments.forEach((segment) => {
                    segment.lineToY += yDirection === Direction.UP ? -yLength : yLength;
                });
                movingSegment.y += yDirection === Direction.UP ? -yLength : yLength;
                movingSegment.lineToX = xDirection === Direction.RIGHT ? xLength : -xLength;
                relationship.head = {
                    x: movingSegment.x + movingSegment.lineToX,
                    y: movingSegment.y  
                };
            }
            break;
        case SegmentDirection.VERTICAL:
            movingDirection = movingSegment.y > cooridates.y ? Direction.UP : Direction.DOWN;
            yLength = Math.abs(movingSegment.y - cooridates.y);
            xLength = Math.abs(movingSegment.x - cooridates.x);
            if (movingSegment.isEnd) {
                let xDirection = movingSegment.x > cooridates.x ? Direction.LEFT: Direction.RIGHT;
                let yDirection = movingSegment.y > cooridates.y ? Direction.UP : Direction.DOWN;
                dependentSegments.forEach((segment) => {
                    segment.lineToX += xDirection === Direction.LEFT ? -xLength : xLength;
                });
                movingSegment.x += xDirection === Direction.LEFT ? -xLength : xLength;
                movingSegment.lineToY = yDirection === Direction.DOWN ? yLength : -yLength;
                relationship.head = {
                    x: movingSegment.x,
                    y: movingSegment.y + movingSegment.lineToY 
                };
            }
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