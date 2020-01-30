import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Direction from '@enums/direction';
import ICoordinates from '@interfaces/ICoordinates';

const Association = (props: { 
    coordinates: ICoordinates,
    direction: Direction
 }) => {
    const { coordinates, direction } = props;

    const height = 15;
    const width = 20;
    const l1: ICoordinates = { x: width/2, y: height/2 };
    const l2: ICoordinates = { x: width/2, y: -(height/2) };
    switch (direction) {
        case Direction.RIGHT:
            l1.x *= -1;
            l2.x *= -1;
            break;
        case Direction.DOWN:
            break;
        case Direction.UP:
            break;
    }

    return (
        <g fill='transparent'>
            <path stroke='black' d={`M ${coordinates.x} ${coordinates.y} l ${l1.x} ${l1.y} M ${coordinates.x} ${coordinates.y} l ${l2.x} ${l2.y}`}/>
        </g>
    );
};

export default Association;