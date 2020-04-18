import React from 'react';
import ReactDOM from 'react-dom';
import RibbonOperationEnum from '@enums/ribbonOperationEnum';
import classSimpleSVG from '@icons/class-simple.svg';
import classFullSVG from '@icons/class-full.svg';
import utilitySVG from '@icons/utility.svg';
import primitiveTypeSVG from '@icons/primitive.svg';
import objectSVG from '@icons/object.svg';
import interfaceSVG from '@icons/interface.svg';
import enumerationSVG from '@icons/enumeration.svg';
import dataTypeSVG from '@icons/dataType.svg';

const ClassElements = () => {
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

    const onElementDragStart = (event: React.DragEvent, ribbonOperation: RibbonOperationEnum) => {
        event.dataTransfer.setData('elementType', ribbonOperation);
    };

    const allElements = allElementsData.map((elementData, index) => {
        return (
            <div key={index} className='element is-unselectable '>
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
        <div id='elements'>
            {allElements}
        </div>
    );
};

export default ClassElements;