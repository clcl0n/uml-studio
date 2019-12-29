import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './ribbon.scss';
import NavTools from './nav-tools';
import RibbonOperationEnum from '@enums/ribbonOperationEnum';

const Ribbon = () => {
    const onElementDragStart = (event: React.DragEvent, ribbonOperation: RibbonOperationEnum) => {
        event.dataTransfer.setData('elementType', ribbonOperation);
    };
    const allElementsData = [
        {
            alt: 'table',
            label: 'Empty Class',
            src: 'src/assets/icons/class-simple.svg',
            ribbonOperation: RibbonOperationEnum.ADD_NEW_EMPTY_CLASS
        },
        {
            alt: 'full class',
            label: 'Class',
            src: 'src/assets/icons/class-full.svg',
            ribbonOperation: RibbonOperationEnum.ADD_NEW_CLASS
        },
        {
            alt: 'utility',
            label: 'utility',
            src: 'src/assets/icons/utility.svg',
            ribbonOperation: RibbonOperationEnum.ADD_NEW_UTILITY
        },
        {
            alt: 'primitive',
            label: 'Primitive Type',
            src: 'src/assets/icons/primitive.svg',
            ribbonOperation: RibbonOperationEnum.ADD_NEW_PRIMITIVE_TYPE
        },
        {
            alt: 'object',
            label: 'Object',
            src: 'src/assets/icons/object.svg',
            ribbonOperation: RibbonOperationEnum.ADD_NEW_OBJECT
        },
        {
            alt: 'interface',
            label: 'Interface',
            src: 'src/assets/icons/interface.svg',
            ribbonOperation: RibbonOperationEnum.ADD_NEW_INTERFACE
        },
        {
            alt: 'enumeration',
            label: 'Enumeration',
            src: 'src/assets/icons/enumeration.svg',
            ribbonOperation: RibbonOperationEnum.ADD_NEW_ENUMERATION
        },
        {
            alt: 'dataType',
            label: 'Data Type',
            src: 'src/assets/icons/dataType.svg',
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
                <label className='element-label'>{elementData.label}</label>
            </div>
        );
    });

    return (
        <div id='ribbon'>
            <NavTools/>
            <div id='controlls'>
                <div id='tools'>
                    <img src='src/assets/icons/tools/baseline-delete-24px.svg' alt='delete'/>
                    <img src='src/assets/icons/tools/outline-accessibility-24px.svg' alt='delete'/>
                    <img src='src/assets/icons/tools/outline-account_box-24px.svg' alt='delete'/>
                    <img src='src/assets/icons/tools/outline-delete-24px.svg' alt='delete'/>
                    <img src='src/assets/icons/tools/outline-redo-24px.svg' alt='delete'/>
                    <img src='src/assets/icons/tools/outline-reply-24px.svg' alt='delete'/>
                    <img src='src/assets/icons/tools/outline-save-24px.svg' alt='delete'/>
                    <img src='src/assets/icons/tools/outline-undo-24px.svg' alt='delete'/>
                </div>
                <div id='elements'>
                    {...allElements}
                </div>
            </div>
        </div>
    );
}

export default Ribbon;