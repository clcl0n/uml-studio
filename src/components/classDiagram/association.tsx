import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IRelationElement from '@interfaces/elements/IRelationElement';

function Association(props: IRelationElement) {

    return (
        <line
            x1={props.elementGraphicData.x1}
            y1={props.elementGraphicData.y1}
            x2={props.elementGraphicData.x2}
            y2={props.elementGraphicData.y2}
            stroke='black'
        />
    );
}

export default Association;