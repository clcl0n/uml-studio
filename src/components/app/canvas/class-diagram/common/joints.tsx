import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ICoordinates from '@interfaces/ICoordinates';
import Joint from './joint';

const Joints = (props: { coordinates: ICoordinates; width: number; height: number; fromElementId: string; }) => {
    let joints = new Array<JSX.Element>();
    const { coordinates, width, height, fromElementId } = props;

    for (let i = 0; i < 3; i++) {
        joints.push(
            <Joint
                key={i}
                radius={5}
                x={coordinates.x + ((width / 2) * i)}
                y={coordinates.y}
                fromElementId={fromElementId}
            />
        );
    }

    for (let i = 0; i < 3; i++) {
        joints.push(
            <Joint
                key={i + 3}
                radius={5}
                x={coordinates.x + ((width / 2) * i)}
                y={coordinates.y + height}
                fromElementId={fromElementId}
            />
        );
    }

    return (
        <g>
            {...joints}
        </g>
    );
};

export default Joints;