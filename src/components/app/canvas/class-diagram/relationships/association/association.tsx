import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import RelationshipSegment from '../relationhips-segment/relationshipSegment';
import Direction from '@enums/direction';
import { selectNewElement } from '@store/actions/canvas';
import IRelationshipSegmentFunctionality from '@interfaces/class-diagram/relationships/IRelationshipSegmentFunctionality';

const Association = (props: { relationship: IRelationship, relationshipSegments: Array<IRelationshipSegment>, functionality: IRelationshipSegmentFunctionality}) => {
    const dispatch = useDispatch();
    const { relationship, relationshipSegments, functionality } = props;

    const segments = relationshipSegments.map((relationshipSegment, index) => {
        return <RelationshipSegment key={index} segment={relationshipSegment} functionality={functionality}/>;
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

    return (
        <g onClick={(ev) => onSegmentClick()}>
            {segments}
            <path
                stroke='black'
                d={`M ${relationship.head.x} ${relationship.head.y} l ${headDirection} ${5}`}
                />
            <path
                stroke='black'
                d={`M ${relationship.head.x} ${relationship.head.y} l ${headDirection} ${-5}`}
            />
        </g>
    );
};

export default Association;