import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IRelationElement from '@interfaces/elements/IRelationElement';
import RelationSegment from './relationSegment';

function Association(props: IRelationElement) {
    let segments = props.elementGraphicData.segments.map((segment) => {
        return <RelationSegment {...segment} />
    });

    return (
        <g>
             {segments}
        </g>
    );
}

export default Association;