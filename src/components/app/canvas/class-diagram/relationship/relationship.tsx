import React from 'react';
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

const Relationship = (props: { relationship: IRelationship, relationshipSegments: Array<IRelationshipSegment> }) => {
    const dispatch = useDispatch();
    const { relationship, relationshipSegments } = props;

    const segments = relationshipSegments.map((relationshipSegment, index) => {
        return relationshipSegment.isStart ? (
            <g key={index}>
                <text className='class="svg-text svg-text-center' x={relationshipSegment.x + 10} y={relationshipSegment.y + 10}>{relationship.tailValue}</text>
                <RelationshipSegment segment={relationshipSegment} relationId={relationship.id}/>
            </g>
        ) : relationshipSegment.isEnd ? (
            <g key={index}>
                <text className='class="svg-text svg-text-center' x={relationshipSegment.x + relationshipSegment.lineToX - 20} y={relationshipSegment.y + 10}>{relationship.headValue}</text>
                <RelationshipSegment segment={relationshipSegment} relationId={relationship.id}/>
            </g>
        ) : <RelationshipSegment key={index} segment={relationshipSegment} relationId={relationship.id}/>;
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
        switch (relationship.type) {
            case ClassDiagramRelationshipTypesEnum.AGGREGATION:
                return <Aggregation direction={relationship.direction} coordinates={coordinates}/>;
            case ClassDiagramRelationshipTypesEnum.COMPOSITION:
                return <Composition direction={relationship.direction} coordinates={coordinates}/>;
            case ClassDiagramRelationshipTypesEnum.EXTENSION:
                return <Extension direction={relationship.direction} coordinates={coordinates}/>;
            case ClassDiagramRelationshipTypesEnum.ASSOCIATION:
                return <Association direction={relationship.direction} coordinates={coordinates}/>;
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