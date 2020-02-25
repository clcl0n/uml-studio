import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDiagramType } from '@store/actions/canvas.action';
import DiagramTypeEnum from '@enums/diagramTypeEnum';
import { diagramTypeReducer } from '@store/reducers/canvas.reducers';
import  { parseString } from 'xml2js';
import ISCXMLState from '@interfaces/scxml/ISCXMLState';
import ISCXML from '@interfaces/scxml/ISCXML';
import { addNewStateElement, addNewFinalStateElement } from '@store/actions/stateDiagram.action';
import { createNewStateElementFromSCXML } from '@utils/elements/stateElement';
import IStoreState from '@interfaces/IStoreState';
import ICoordinates from '@interfaces/ICoordinates';
import { parseStateDiagram } from '@utils/scxmlParser';
import { addNewRelationship, addNewRelationshipSegment } from '@store/actions/classDiagram.action';

const DiagramChooserModal = () => {
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(true);
    const { x: canvasWidth, y: canvasHeight } = useSelector((store: IStoreState) => store.canvas.canvasDimensions);

    const createNewClassDiagram = () => {
        dispatch(setDiagramType(DiagramTypeEnum.CLASS));
        setIsActive(false);
    };

    const createNewStateDiagram = () => {
        dispatch(setDiagramType(DiagramTypeEnum.STATE));
        setIsActive(false);
    };

    const createTargetState = () => {

    };

    const openExistingDiagram = async () => {
        var xml = `<scxml name="Scxml" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initialstate="Generator">
        <state id="Generator">
            <onentry>
                <assign expr="os.clock()" location="tm_ELAPSED"/>
            </onentry>
            <transition event="Start" target="1"/>
        </state>
        <state id="1">
            <onentry>
                <assign expr="os.clock()" location="tm_ELAPSED"/>
            </onentry>
            <transition event="Start" target="2"/>
            <transition event="Start" target="7"/>
            <transition event="Start" target="8"/>
            <transition event="Start" target="9"/>
            <transition event="Start" target="10"/>
            <transition event="Start" target="11"/>
            <transition event="Start" target="12"/>
            <transition event="Start" target="13"/>
            <transition event="Start" target="14"/>
            <transition event="Start" target="15"/>
            <transition event="Start" target="Generator"/>
        </state>
        <state id="3">
            
            <onentry>
                <assign expr="os.clock()" location="tm_ELAPSED"/>
            </onentry>
        </state>
        <state id="4">
        <transition event="Start" target="2"/>
        </state>
        <state id="5">
        <transition event="Start" target="4"/>
        <transition event="Start" target="2"/>
        <transition event="Start" target="6"/>
        </state>
        <state id="6">
        <transition event="Start" target="2"/>
        </state>
        <state id="7">
        <transition event="Start" target="5"/>
        <transition event="Start" target="1"/>
        </state>
        <state id="8">
        </state>
        <state id="9">
        </state>
        <state id="12">
        </state>
        <state id="13">
        </state>
        <state id="14">
        </state>
        <state id="15">
        </state>
        <state id="11">
        <transition event="Start" target="1"/>
        </state>
        <state id="10">
        <transition event="Start" target="2"/>
        <transition event="Start" target="1"/>
        </state>
        <state id="2">
            
            <onentry>
                <assign expr="os.clock()" location="tm_ELAPSED"/>
            </onentry>
            <transition event="Start" target="3"/>
            <transition event="Start" target="4"/>
            <transition event="Start" target="1"/>
            <transition event="Start" target="5"/>
            <transition event="Start" target="6"/>
        </state>
    </scxml>`;

        const { newStateElements, newFinalStateElements, newRelationShipSegments, newRelationShips } = await parseStateDiagram(xml, { x: canvasWidth, y: canvasHeight });
        newStateElements.forEach((newStateElement) => {
            dispatch(addNewStateElement(newStateElement));
        });
        newFinalStateElements.forEach((newFinalStateElement) => {
            dispatch(addNewFinalStateElement(newFinalStateElement));
        });
        newRelationShipSegments.forEach((segment) => {
            dispatch(addNewRelationshipSegment(segment));
        });
        newRelationShips.forEach((relationship) => {
            dispatch(addNewRelationship(relationship));
        });
        dispatch(setDiagramType(DiagramTypeEnum.STATE));
        setIsActive(false);
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