import React from 'react';
import ReactDOM from 'react-dom';
import StateSimple from '@icons/state-simple.svg';
import State from '@icons/state.svg';
import InitialState from '@icons/initial-state.svg';
import FinalState from '@icons/final-state.svg';
import ForkJoin from '@icons/fork-join.svg';
import Choice from '@icons/choice.svg';
import RibbonOperationEnum from '@enums/ribbonOperationEnum';

const StateElements = () => {
    const allElementsData = [
        {
            alt: 'state simple',
            label: 'Simple State',
            src: StateSimple,
            ribbonOperation: RibbonOperationEnum.ADD_NEW_SIMPLE_STATE
        },
        {
            alt: 'final state',
            label: 'Final State',
            src: FinalState,
            ribbonOperation: RibbonOperationEnum.ADD_NEW_FINAL_STATE
        }
    ];

    const onElementDragStart = (event: React.DragEvent, ribbonOperation: RibbonOperationEnum) => {
        event.dataTransfer.setData('elementType', ribbonOperation);
    };

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
        <div id='elements'>
            {allElements}
        </div>
    );
};

export default StateElements;