import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './ribbon.scss';
import NavTools from './nav-tools';
import RibbonOperationEnum from '@enums/ribbonOperationEnum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import { canvasZoomIn, canvasZoomOut } from '@store/actions/ribbon.action';
import classSimpleSVG from '@icons/class-simple.svg';
import classFullSVG from '@icons/class-full.svg';
import utilitySVG from '@icons/utility.svg';
import primitiveTypeSVG from '@icons/primitive.svg';
import objectSVG from '@icons/object.svg';
import interfaceSVG from '@icons/interface.svg';
import enumerationSVG from '@icons/enumeration.svg';
import dataTypeSVG from '@icons/dataType.svg';

const Ribbon = () => {  
    const dispatch = useDispatch();
    const canvasZoom: number = useSelector((state: IStoreState) => state.ribbon.canvasZoom);
    const onElementDragStart = (event: React.DragEvent, ribbonOperation: RibbonOperationEnum) => {
        event.dataTransfer.setData('elementType', ribbonOperation);
    };
    const zoomStep = 5;
    const allElementsData = [
        {
            alt: 'table',
            label: 'Empty Class',
            src: classSimpleSVG,
            ribbonOperation: RibbonOperationEnum.ADD_NEW_EMPTY_CLASS
        },
        {
            alt: 'full class',
            label: 'Class',
            src: classFullSVG,
            ribbonOperation: RibbonOperationEnum.ADD_NEW_CLASS
        },
        {
            alt: 'utility',
            label: 'utility',
            src: utilitySVG,
            ribbonOperation: RibbonOperationEnum.ADD_NEW_UTILITY
        },
        {
            alt: 'primitive',
            label: 'Primitive Type',
            src: primitiveTypeSVG,
            ribbonOperation: RibbonOperationEnum.ADD_NEW_PRIMITIVE_TYPE
        },
        {
            alt: 'object',
            label: 'Object',
            src: objectSVG,
            ribbonOperation: RibbonOperationEnum.ADD_NEW_OBJECT
        },
        {
            alt: 'interface',
            label: 'Interface',
            src: interfaceSVG,
            ribbonOperation: RibbonOperationEnum.ADD_NEW_INTERFACE
        },
        {
            alt: 'enumeration',
            label: 'Enumeration',
            src: enumerationSVG,
            ribbonOperation: RibbonOperationEnum.ADD_NEW_ENUMERATION
        },
        {
            alt: 'dataType',
            label: 'Data Type',
            src: dataTypeSVG,
            ribbonOperation: RibbonOperationEnum.ADD_NEW_DATA_TYPE
        }
    ];

    const allElements = allElementsData.map((elementData, index) => {
        return (
            <div key={index} className='element'>
                <img
                    draggable='true'
                    onDragStart={(ev) => onElementDragStart(ev, elementData.ribbonOperation)}
                    className='element-svg'
                    src={elementData.src}
                    alt={elementData.alt}
                />
            </div>
        );
    });

    return (
        <div id='ribbon'>
            <NavTools/>
            <div id='controlls'>
                <div id='tools'>
                    <a className='button is-small is-text'>
                        <FontAwesomeIcon size='lg' icon='print'/>
                    </a>    
                    <a className='button is-small is-text'>
                        <FontAwesomeIcon icon='save'/>
                    </a>
                    <a className='button is-small is-text'>
                        <FontAwesomeIcon icon='undo'/>
                    </a>
                    <a className='button is-small is-text'>
                        <FontAwesomeIcon icon='redo'/>
                    </a>
                    <a onClick={(ev) => dispatch(canvasZoomIn(zoomStep))} className='button is-small is-text'>
                        <FontAwesomeIcon icon='search-plus'/>
                    </a>
                    <a className='button is-small is-text'>
                        {`${canvasZoom}%`}
                    </a>
                    <a onClick={(ev) => dispatch(canvasZoomOut(zoomStep))} className='button is-small is-text'>
                        <FontAwesomeIcon icon='search-minus'/>
                    </a>
                </div>
                <div id='elements'>
                    {...allElements}
                </div>
            </div>
        </div>
    );
}

export default Ribbon;