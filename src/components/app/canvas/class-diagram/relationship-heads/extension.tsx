import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ICoordinates from '@interfaces/ICoordinates';
import Direction from '@enums/direction';

const Extension = (props: {
    coordinates: ICoordinates,
    direction: Direction
}) => {
    const { coordinates, direction } = props;

    let width = 20;
    let height = 20;
    let startX = 0;
    let startY = 0;
    let tipX = width;
    let tipY = height/2;
    switch (direction) {
        case Direction.RIGHT:
            startX = coordinates.x;
            startY = coordinates.y - (height/2);
            break;
        case Direction.LEFT:
            startX = coordinates.x;
            startY = coordinates.y - (height/2);
            tipX *= -1;
            break;
        case Direction.DOWN:
            break;
        case Direction.UP:
            break;
    }

    return (
        <g fill='transparent'>
            <path
                stroke='black'
                d={`M ${startX} ${startY} l ${tipX} ${tipY} l ${tipX*-1} ${10} Z`}
            />
        </g>
    );
};

export default Extension;