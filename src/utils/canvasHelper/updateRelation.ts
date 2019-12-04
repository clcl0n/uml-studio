import Direction from '@enums/Direction';
import IRelationElement from '@interfaces/elements/relation/IRelationElement';
import I2DCoordinates from '@interfaces/I2DCoordinates';
import * as log from 'loglevel';

const updateRelation = (direction: Direction, relation: IRelationElement, movingSegmentId: string, cooridates: I2DCoordinates): IRelationElement => {
    switch(direction) {
        case Direction.HORIZONTAL:
            // x
            const movingSegmentGraphicData = relation.elementGraphicData.segments.find((segment) => segment.id === movingSegmentId);
            const movingSegmentData = relation.elementData.segments.find((segment) => segment.id === movingSegmentId);
            
            if (!movingSegmentData.isEnd && !movingSegmentData.isStart) {
                const movingDirection = movingSegmentGraphicData.x > cooridates.x ? Direction.LEFT : Direction.RIGHT;
                
                const dependentSegments = relation.elementGraphicData.segments
                .filter((segment) => segment.id === movingSegmentData.toSegmentId || segment.id === movingSegmentData.fromSegmentId); 
                
                if (movingDirection === Direction.LEFT) {
                    dependentSegments.forEach((segment) => {
                        if (segment.x === movingSegmentGraphicData.x) {
                            segment.x += segment.lineToX;
                            segment.lineToX = -1 *(segment.x - cooridates.x);
                        } else {
                            segment.lineToX += cooridates.x - movingSegmentGraphicData.x;
                        }
                    });
                } else {
                    dependentSegments.forEach((segment) => {
                        if (segment.x === movingSegmentGraphicData.x) {
                            segment.x += segment.lineToX;
                            segment.lineToX = cooridates.x - segment.x;
                        } else {
                            segment.lineToX += cooridates.x - movingSegmentGraphicData.x;
                        }
                    });
                }
                movingSegmentGraphicData.x = cooridates.x;
            } else {
                
            }
            
            return relation;
        case Direction.VERTICAL:
            // y
            return null;
        default:
            return relation;
    }
};

export default updateRelation;