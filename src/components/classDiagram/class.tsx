import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './class.scss';
import IClassElement from '@interfaces/elements/IClassElement';
import ClassProperty from './classProperty';
import IClassElementProperty from '@interfaces/elements/class/IClassElementProperty';
import IClassElementMethod from '@interfaces/elements/class/IClassElementMethod';
import IClassPropertyElementProps from '@interfaces/elements/class/IClassPropertyElementProps';

function Class(props: IClassElement) {
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
        <g className='umlClass'>
            <g>
                <rect
                    x={props.elementGraphicData.frame.x}
                    y={props.elementGraphicData.frame.y}
                    width={props.elementGraphicData.frame.width}
                    height={props.elementGraphicData.frame.height}
                    stroke='black'
                    fill='none'
                    strokeWidth='1'
                    onMouseOver={() => props.elementFunctionality.onFrameOver()}
                    onMouseLeave={() => props.elementFunctionality.onFrameLeave()}
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
        </g>
    );
}

export default Class;