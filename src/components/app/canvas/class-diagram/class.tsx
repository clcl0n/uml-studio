import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './class.scss';
import IClass from '@interfaces/class-diagram/class/IClass';
import IClassPropertyData from '@interfaces/class-diagram/class/IClassPropertyData';
import IClassMethodData from '@interfaces/class-diagram/class/IClassMethodData';
import IClassRowProps from '@interfaces/class-diagram/class/IClassRowProps';
import ClassRow from './classRow';
import { selectNewElement } from '@store/actions/canvas';
import { useDispatch } from 'react-redux';

const Class = (props: { class: IClass, properties: Array<IClassPropertyData>, methods: Array<IClassMethodData> }) => {
    const dispatch = useDispatch();
    const createNewClassRow = (index: number, rowName: string, y: number) => {
        const classRowProps: IClassRowProps = {
            index,
            x: props.class.x,
            y,
            xCenter: props.class.xCenter,
            rowHeight: props.class.rowHeight,
            width: props.class.width,
            fontPixelSize: props.class.fontPixelSize,
            name: rowName
        };

        return (
            <ClassRow key={index} {...classRowProps} />
        );
    };

    const classProperties = props.properties.map((classProperty, index) => createNewClassRow(index, classProperty.name, props.class.sections.properties.y));
    const classMethods = props.methods.map((classMethods, index) => createNewClassRow(index, classMethods.name, props.class.sections.methods.y));

    const methodsSeparator = () => {
        return (
            <path
                d={`M ${props.class.x} ${props.class.sections.methods.y} l ${props.class.width} 0`}
                stroke='black'
            />
        );
    };

    const onClassClick = (ev: React.MouseEvent) => {
        dispatch(selectNewElement(props.class.id));
    };

    return (
        <g
            className='umlClass'
            pointerEvents='all'
            // onMouseDown={(ev) => props.elementFunctionality.onClassMouseDown(ev, props.elementData.id)}
            // onMouseUp={(ev) => props.elementFunctionality.onClassMouseUp(ev)}
            onClick={(ev) => onClassClick(ev)}
            // onMouseOver={() => setJoints(createJoints(props.elementData, props.class, props.elementFunctionality))}
            // onMouseLeave={() => setJoints([])}
        >
            <g>
                <rect
                    x={props.class.x}
                    y={props.class.y}
                    width={props.class.width}
                    height={props.class.height}
                    stroke='black'
                    fill='none'
                    strokeWidth='3'
                />

                <path
                    d={`M ${props.class.x} ${props.class.y + props.class.rowHeight} l ${props.class.width} 0`}
                    stroke='black'
                />
                {props.methods.length > 0 && methodsSeparator()}
            </g>
            <g className='classHeader'>
                <text
                    className='umlClassName'
                    x={props.class.xCenter}
                    y={props.class.y + (props.class.rowHeight / 2)}
                >
                    {props.class.className}
                </text>
            </g>
            <g className='classProperties'>
                {...classProperties}
            </g>
            <g className='classMethods'>
                {...classMethods}
            </g>
            {/* <g>
                {...joints}
            </g> */}
        </g>
    );
};

export default Class;