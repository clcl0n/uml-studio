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
            alt: 'state',
            label: 'State',
            src: State,
            ribbonOperation: RibbonOperationEnum.ADD_NEW_STATE
        },
        {
            alt: 'initial state',
            label: 'Initial State',
            src: InitialState,
            ribbonOperation: RibbonOperationEnum.ADD_NEW_INITIAL_STATE
        },
        {
            alt: 'final state',
            label: 'Final State',
            src: FinalState,
            ribbonOperation: RibbonOperationEnum.ADD_NEW_FINAL_STATE
        },
        {
            alt: 'fork join',
            label: 'Fork/Join',
            src: ForkJoin,
            ribbonOperation: RibbonOperationEnum.ADD_NEW_FORK_JOIN
        },
        {
            alt: 'choice',
            label: 'Choice',
            src: Choice,
            ribbonOperation: RibbonOperationEnum.ADD_NEW_CHOICE
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