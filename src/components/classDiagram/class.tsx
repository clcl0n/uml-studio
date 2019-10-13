import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './class.scss';
import { IUMLClassElementProps } from '@interfaces/IUMLClassElementProps';
import Joint from './joint';
import ClassProperty from './classProperty';

function Class(props: IUMLClassElementProps) {
    const [joints, updateJoints] = React.useState([]);
    const classPropsHover = (index: number) => {
        updateJoints([
            <Joint key={1} {...{x: props.separators.properties.x, y: props.separators.properties.y + (index * 25) + 12.5, radius: 5}}/>,
            <Joint key={2} {...{x: props.separators.properties.x + props.width, y: props.separators.properties.y + (index * 25) + 12.5, radius: 5}}/>
        ]);
    };
    const classPropsLeave = () => {
        updateJoints([]);
    };

    const classProperties = props.classProperties.map((classProperty, index) => {
        return (   
            <g key={index}>
                <g
                    onMouseOver={(e) => classPropsHover(index)}
                >
                    <rect
                        onClick={() => console.warn('rect')}
                        className='test'
                        fill='none'
                        x={props.separators.properties.x}
                        y={(props.separators.properties.y + (index * 25))}
                        width={props.width}
                        height={props.row.height}
                    />
                </g>
                <text onClick={() => console.warn('text')} className='umlClassName' x={props.className.x} y={props.separators.properties.y + (index * 25) + 12}>{'test'}</text>
            </g>
        );
    });
    const classMethods = props.classMethods.map((classMethod, index) => {
        return <rect key='index'/>
    });

    return (
        <g className='umlClass' onMouseLeave={() => classPropsLeave()}>
            <g>
                <rect
                    onClick={() => console.warn('frame')}
                    x={props.frame.x}
                    y={props.frame.y}
                    width={props.width}
                    height={props.height}
                    stroke='black'
                    fill='none'
                    strokeWidth='1'
                />
                <path
                    d={`M ${props.separators.properties.x} ${props.separators.properties.y} l ${props.width} 0`}
                    stroke='black'
                />
                {classMethods.length > 0 && <path/>}
            </g>
            <g className='classHeader'>
                <text className='umlClassName' x={props.className.x} y={props.className.y}>{props.className.text}</text>
            </g>
            <g className='classProperties'>
                {...classProperties}
            </g>
            <g className='classMethods'>
                {...classMethods}
            </g>
            <g>
                {...joints}
            </g>
        </g>
    );
}

export default Class;