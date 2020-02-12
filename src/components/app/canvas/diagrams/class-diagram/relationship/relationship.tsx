import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import RelationshipSegment from './relationshipSegment';
import Direction from '@enums/direction';
import { selectNewElement } from '@store/actions/canvas.action';
import Aggregation from '../relationship-heads/aggregation';
import ICoordinates from '@interfaces/ICoordinates';
import Composition from '../relationship-heads/composition';
import Extension from '../relationship-heads/extension';
import Association from '../relationship-heads/association';
import ClassDiagramRelationshipTypesEnum from '@enums/classDiagramRelationshipTypesEnum';
import SegmentDirection from '@enums/segmentDirection';
import useSelectedElement from 'hooks/useSelectedElement';

const Relationship = (props: { relationship: IRelationship, relationshipSegments: Array<IRelationshipSegment> }) => {
    const dispatch = useDispatch();
    const { relationship, relationshipSegments } = props;
    const { selectedElementId } = useSelectedElement();

    const segments = relationshipSegments.map((relationshipSegment, index) => {
        if (relationshipSegment.isStart) {
            let segmentDirection = Direction.NONE;
            if (relationshipSegment.direction === SegmentDirection.HORIZONTAL) {
                segmentDirection = relationshipSegment.x + relationshipSegment.lineToX < relationship.tail.x ? Direction.LEFT : Direction.RIGHT;
            } else {
                segmentDirection = relationshipSegment.y + relationshipSegment.lineToY < relationship.tail.y ? Direction.UP : Direction.DOWN;
            }
            const textAnchor = segmentDirection === Direction.LEFT ? 'end' : 'start'; 
            const textX = relationshipSegment.x + (
                segmentDirection === Direction.LEFT ? -10 : 10
            );
            let textY = relationshipSegment.y + 10;
            if (segmentDirection === Direction.UP) {
                textY -= 20;
            }

            return (
                <g key={index}>
                    <text style={{ textAnchor }} className='class="svg-text svg-text-center' x={textX} y={textY}>{relationship.tailValue}</text>
                    <RelationshipSegment segment={relationshipSegment} relationId={relationship.id}/>
                </g>
            );
        } else if (relationshipSegment.isEnd) {
            let segmentDirection = relationship.direction;
            if (relationshipSegment.y < relationship.head.y) {
                segmentDirection = Direction.DOWN;
            } else if (relationshipSegment.y > relationship.head.y) {
                segmentDirection = Direction.UP;
            } else if (relationshipSegment.x > relationship.head.x) {
                segmentDirection = Direction.LEFT;
            }

            const textAnchor = (
                segmentDirection === Direction.LEFT ||
                segmentDirection === Direction.DOWN ||
                segmentDirection === Direction.UP
            ) ? 'start' : 'end'; 
            let textX = relationshipSegment.x + relationshipSegment.lineToX + (
                segmentDirection === Direction.LEFT ? 20 : -20
            );
            let textY = relationship.head.y + 15;
            if (segmentDirection === Direction.UP) {
                textY += 5;
                textX += 30;
            } else if (segmentDirection === Direction.DOWN) {
                textX += 30;
                textY -= 30;
            }

            return (
                <g key={index}>
                    <text style={{ textAnchor: textAnchor }} className='class="svg-text svg-text-center' x={textX} y={textY}>{relationship.headValue}</text>
                    <RelationshipSegment segment={relationshipSegment} relationId={relationship.id}/>
                </g>
            );
        } else {
            return (
                <RelationshipSegment key={index} segment={relationshipSegment} relationId={relationship.id}/>
            );
        }
    });

    //to-do UP DOWN in future
    let headDirection = 0;
    if (relationship.direction === Direction.RIGHT) {
        headDirection = -10;
    } else {
        headDirection = 10;
    }

    const onSegmentClick = () => {
        dispatch(selectNewElement(relationship.id));
    };

    const relationshipHead = () => {
        const coordinates: ICoordinates = { x: relationship.head.x, y: relationship.head.y };
        const endSegment = relationshipSegments.find((segment) => segment.isEnd);
        let direction = relationship.direction;
        if (endSegment.y < relationship.head.y) {
            direction = Direction.DOWN;
        } else if (endSegment.y > relationship.head.y) {
            direction = Direction.UP;
        } else if (endSegment.x > relationship.head.x) {
            direction = Direction.LEFT;
        }
        switch (relationship.type) {
            case ClassDiagramRelationshipTypesEnum.AGGREGATION:
                return <Aggregation direction={direction} coordinates={coordinates}/>;
            case ClassDiagramRelationshipTypesEnum.COMPOSITION:
                return <Composition direction={direction} coordinates={coordinates}/>;
            case ClassDiagramRelationshipTypesEnum.EXTENSION:
                return <Extension direction={direction} coordinates={coordinates}/>;
            case ClassDiagramRelationshipTypesEnum.ASSOCIATION:
                return <Association direction={direction} coordinates={coordinates}/>;
        }
    };

    return (
        <g onClick={(ev) => onSegmentClick()}>
            {segments}
            {relationshipHead()}
        </g>
    );
};

export default Relationship;