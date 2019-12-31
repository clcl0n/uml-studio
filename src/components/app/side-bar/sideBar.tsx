import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './sideBar.scss';
import { useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import ClassEdit from './options/classEdit';

const SideBar = () => {
    const selectedElementId = useSelector((state: IStoreState) => state.canvas.selectedElementId);
    const selectedElement = useSelector((state: IStoreState) => state.umlClassDiagram.classes.byId[selectedElementId]);
    
    let editOptions = <div/>;
    if (selectedElement) {
        if (selectedElement.type === ClassDiagramElementsEnum.CLASS) {
            editOptions = <ClassEdit {...{ class: selectedElement }}/>;
        }
    }

     return (
        <div id='sideBar'>
            {editOptions}
        </div>
    );
}

export default SideBar;