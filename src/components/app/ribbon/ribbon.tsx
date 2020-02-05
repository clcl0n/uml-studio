import React from 'react';
import ReactDOM from 'react-dom';
import './ribbon.scss';
import NavTools from './nav-tools';
import RibbonOperationEnum from '@enums/ribbonOperationEnum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import { canvasZoomIn, canvasZoomOut } from '@store/actions/ribbon.action';
import Options from '../common/options';
import Aggregation from '../canvas/diagrams/class-diagram/relationship-heads/aggregation';
import Composition from '../canvas/diagrams/class-diagram/relationship-heads/composition';
import Extension from '../canvas/diagrams/class-diagram/relationship-heads/extension';
import Direction from '@enums/direction';
import Association from '../canvas/diagrams/class-diagram/relationship-heads/association';
import ClassDiagramRelationshipTypesEnum from '@enums/classDiagramRelationshipTypesEnum';
import useCanvasDefaultRelationshipType from 'hooks/useCanvasDefaultRelationshipType';
import ClassElements from './class-elements/classElements';
import useDiagram from 'hooks/useDiagram';
import DiagramTypeEnum from '@enums/diagramTypeEnum';
import StateElements from './state-elements/stateElements';

const Ribbon = () => {  
    const dispatch = useDispatch();
    const canvasZoom: number = useSelector((state: IStoreState) => state.ribbon.canvasZoom);
    const { canvasDefaultRelationshipType, setCanvasDefaultRelationshipType } = useCanvasDefaultRelationshipType();
    const { diagramType } = useDiagram();

    const relationshipTypes = [ 
        ClassDiagramRelationshipTypesEnum.AGGREGATION,
        ClassDiagramRelationshipTypesEnum.ASSOCIATION,
        ClassDiagramRelationshipTypesEnum.COMPOSITION,
        ClassDiagramRelationshipTypesEnum.EXTENSION 
    ];
    const relationshipOptions = () => {
        return relationshipTypes.map((relationshipType, index) => {
            switch (relationshipType) {
                case ClassDiagramRelationshipTypesEnum.AGGREGATION:
                return (
                    <svg key={index} height='20' width='30'>
                        <Aggregation direction={Direction.RIGHT} coordinates={{ x: 0, y: 10 }}/>
                    </svg>
                );
            case ClassDiagramRelationshipTypesEnum.COMPOSITION:
                return (
                    <svg key={index} height='20' width='30'>
                        <Composition direction={Direction.RIGHT} coordinates={{ x: 0, y: 10 }}/>;
                    </svg>
                );
            case ClassDiagramRelationshipTypesEnum.EXTENSION:
                return (
                    <svg key={index} height='20' width='30'>
                        <Extension direction={Direction.RIGHT} coordinates={{ x: 0, y: 10 }}/>;
                    </svg>
                );
            case ClassDiagramRelationshipTypesEnum.ASSOCIATION:
                return (
                    <svg key={index} height='20' width='30'>
                        <Association direction={Direction.RIGHT} coordinates={{ x: 10, y: 10 }}/>;
                    </svg>
                );
            }
        });
    };
    const onRelationshipHeadSelect = (index: number) => {
        setCanvasDefaultRelationshipType(relationshipTypes[index]);
    };
    const zoomStep = 5;

    const getDiagramElements = () => {
        if (diagramType === DiagramTypeEnum.NONE) {
            return <div/>;
        } else {
            return diagramType === DiagramTypeEnum.CLASS ? (
                <ClassElements/>
            ) : (
                <StateElements/>
            );
        }
    };

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
                    <Options
                        defaultSelectedOptionIndex={relationshipTypes.findIndex((type) => type === canvasDefaultRelationshipType)}
                        onSelectNewOption={(optionIndex) => onRelationshipHeadSelect(optionIndex)}
                    >
                        {relationshipOptions()}
                    </Options>
                </div>
                {getDiagramElements()}
            </div>
        </div>
    );
};

export default Ribbon;