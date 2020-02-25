import React from 'react';
import ReactDOM from 'react-dom';
import ICoordinates from '@interfaces/ICoordinates';
import Direction from '@enums/direction';

const Composition = (props: {
    coordinates: ICoordinates,
    direction: Direction
}) => {
    const { coordinates, direction } = props;

    let width = 30;
    let height = 20;
    const l1: ICoordinates = { x: width/2, y: height/2 };
    const l2: ICoordinates = { x: width/2, y: -(height/2) };
    const l3: ICoordinates = { x: -(width/2), y: -(height/2) };
    switch (direction) {
        case Direction.LEFT:
            l1.x *= -1;
            l2.x *= -1;
            l3.x *= -1;
            break;
        case Direction.DOWN:
            break;
        case Direction.UP:
            break;
    }

    return (
        <g fill='black'>
            <path d={`M ${coordinates.x} ${coordinates.y} l ${l1.x} ${l1.y} l ${l2.x} ${l2.y} l ${l3.x} ${l3.y} Z`}/>
        </g>
    );
};

export default Composition;