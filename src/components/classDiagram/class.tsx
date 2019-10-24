import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './class.scss';
import IClassElement from '@interfaces/elements/IClassElement';
import Joint from './joint';
import ClassProperty from './classProperty';
import IClassElementProperty from '@interfaces/elements/class/IClassElementProperty';
import IClassElementMethod from '@interfaces/elements/class/IClassElementMethod';
import { useDispatch, useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import { drawNewElement } from 'store/actions/canvas';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import CanvasEnum from '@enums/storeActions/canvasEnum';

function Class(props: IClassElement) {
    // const [jointsGraphicData, updateJointsPosition] = React.useState([]);
    const [jointsData, updateJoints] = React.useState({isMouseDown: false});
    const dispatch = useDispatch();
    // const isDrawing = useSelector((store: IStoreState) => store.canvas.isDrawing);
    // to-do
    // draging
    // const classPropsHover = (index: number) => {
        // updateJoints([
            // <Joint key={2} {...{x: props.elementGraphicData.frame.x + props.elementGraphicData.frame.width, y: props.separators.properties.y + (index * 25) + 12.5, radius: 5}}/>
        // ]);
    // };
    // const classPropsLeave = () => {
    //     updateJoints([]);
    // };

    const classProperties = props.elementData.classProperties.map((classProperty: IClassElementProperty, index) => {
        const classPropertiesProps = {
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

    const drawAssociation = (event: React.MouseEvent<SVGGElement, MouseEvent>) => {
        dispatch(drawNewElement(CanvasEnum.ADD_NEW_CURRENTLY_DRAWING_RELATIONSHIP, event));
    }

    return (
        <g className='umlClass' onMouseLeave={() => console.warn('to-do')}>
            <g>
                <rect
                    onClick={() => console.warn('frame')}
                    x={props.elementGraphicData.frame.x}
                    y={props.elementGraphicData.frame.y}
                    width={props.elementGraphicData.frame.width}
                    height={props.elementGraphicData.frame.height}
                    stroke='black'
                    fill='none'
                    strokeWidth='1'
                />

                <path
                    d={`M ${props.elementGraphicData.frame.x} ${props.elementGraphicData.frame.y + props.elementGraphicData.rowHeight} l ${props.elementGraphicData.frame.width} 0`}
                    stroke='black'
                />
                {props.elementData.classMethods.length > 0 && <path/>}
            </g>
            <g className='classHeader'>
                <text className='umlClassName' x={props.elementGraphicData.frame.xCenter} y={props.elementGraphicData.frame.y + (props.elementGraphicData.rowHeight / 2)}>{props.elementData.className}</text>
            </g>
            <g className='classProperties'>
                {...classProperties}
            </g>
            <g className='classMethods'>
                {...classMethods}
            </g>
            <g>
                <g onMouseDown={(event) => updateJoints({isMouseDown: true})} onMouseLeave={(event) => jointsData.isMouseDown && drawAssociation(event)}>
                    <Joint key={1} {...{x: props.elementGraphicData.frame.x, y: props.elementGraphicData.frame.y, radius: 5}}/>,
                </g>
                {/* {...joints} */}
            </g>
        </g>
    );
}

export default Class;