import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './class.scss';
import IClassElement from '@interfaces/elements/IClassElement';
import ClassProperty from './classProperty';
import IClassElementProperty from '@interfaces/elements/class/IClassElementProperty';
import IClassElementMethod from '@interfaces/elements/class/IClassElementMethod';
import IClassPropertyElementProps from '@interfaces/elements/class/IClassPropertyElementProps';
import ICLassElementData from '@interfaces/elements/class/IClassElementData';
import IClassElementGraphicData from '@interfaces/elements/class/IClassElementGraphicData';
import Joint from './joint';
import IElementFunctionality from '@interfaces/elements/IElementFunctionality';

function createJoints(elementData: ICLassElementData, elementGraphicData: IClassElementGraphicData, elementFunctionality: IElementFunctionality) {
    let joints = new Array<JSX.Element>();

    for (let i = 0; i < 3; i++) {
        joints.push(
            <Joint
                key={i}
                radius={5}
                onJointClick={elementFunctionality.onJointClick}
                x={elementGraphicData.frame.x + ((elementGraphicData.frame.width / 2) * i)}
                y={elementGraphicData.frame.y}
            />
        );
    }

    for (let i = 0; i < 3; i++) {
        joints.push(
            <Joint
                key={i + 3}
                radius={5}
                onJointClick={elementFunctionality.onJointClick}
                x={elementGraphicData.frame.x + ((elementGraphicData.frame.width / 2) * i)}
                y={elementGraphicData.frame.y + elementGraphicData.frame.height}
            />
        );
    }

    return joints;
}

function Class(props: IClassElement) {
    const [joints, setJoints] = React.useState([]);

    const classProperties = props.elementData.classProperties.map((classProperty: IClassElementProperty, index) => {
        const classPropertiesProps: IClassPropertyElementProps = {
            index: index,
            x: props.elementGraphicData.frame.x,
            y: props.elementGraphicData.frame.sections.properties.y,
            xTest: props.elementGraphicData.frame.xCenter,
            rowHeight: props.elementGraphicData.rowHeight,
            width: props.elementGraphicData.frame.width,
            fontPixelSize: props.elementGraphicData.fontPixelSize,
            name: classProperty.name
        };
        return (
            <g key={index} onMouseOver={() => console.warn('over')}>
                <ClassProperty {...classPropertiesProps}/>
            </g>
        );
    });
    
    const classMethods = props.elementData.classMethods.map((classMethod: IClassElementMethod, index) => {
        return <rect key={index}/>
    });


    return (
        <g
            className='umlClass'
            pointerEvents='all'
            onMouseOver={() => setJoints(createJoints(props.elementData, props.elementGraphicData, props.elementFunctionality))}
            onMouseLeave={() => setJoints([])}
        >
            <g>
                <rect
                    x={props.elementGraphicData.frame.x}
                    y={props.elementGraphicData.frame.y}
                    width={props.elementGraphicData.frame.width}
                    height={props.elementGraphicData.frame.height}
                    stroke='black'
                    fill='none'
                    strokeWidth='3'
                />

                <path
                    d={`M ${props.elementGraphicData.frame.x} ${props.elementGraphicData.frame.y + props.elementGraphicData.rowHeight} l ${props.elementGraphicData.frame.width} 0`}
                    stroke='black'
                />
                {props.elementData.classMethods.length > 0 && <path/>}
            </g>
            <g className='classHeader'>
                <text
                    className='umlClassName'
                    x={props.elementGraphicData.frame.xCenter}
                    y={props.elementGraphicData.frame.y + (props.elementGraphicData.rowHeight / 2)}
                >
                    {props.elementData.className}
                </text>
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