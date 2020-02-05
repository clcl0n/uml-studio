import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { setDiagramType } from '@store/actions/canvas.action';
import DiagramTypeEnum from '@enums/diagramTypeEnum';
import { diagramTypeReducer } from '@store/reducers/canvas.reducer';

const DiagramChooserModal = () => {
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(true);

    const createNewClassDiagram = () => {
        dispatch(setDiagramType(DiagramTypeEnum.CLASS));
        setIsActive(false);
    };

    const createNewStateDiagram = () => {
        dispatch(setDiagramType(DiagramTypeEnum.STATE));
        setIsActive(false);
    };

    const openExistingDiagram = () => {

    };

    return (
        <div className={'modal' + (isActive ? ' is-active' : '')}>
            <div className='modal-background'/>
            <div className='modal-card'>
                <section className='modal-card-body'>
                    <a
                        className='button'
                        onClick={() => createNewClassDiagram()} 
                    >
                        Create New Class Diagram
                    </a>
                    <a
                        className='button'
                        onClick={() => createNewStateDiagram()}
                    >
                        Create New State Diagram
                    </a>
                    <a 
                        className='button'
                        onClick={() => openExistingDiagram()}
                    >
                        Open Existing Diagram
                    </a>
                </section>
            </div>
            <button className='modal-close is-large' aria-label='close'/>
        </div>
    );
};

export default DiagramChooserModal;