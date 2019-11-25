import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './sideBar.scss';
import { useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import ClassEditOptions from './classEditOptions';
import IClassElement from '@interfaces/elements/IClassElement';

function SideBar() {
    const selectedElementId = useSelector((state: IStoreState) => state.canvas.selectedElementId);
    const selectedElement = useSelector((state: IStoreState) => state.canvas.elements.find((element) => element.elementData.id === selectedElementId));
    let editOptions = <div/>;
    if (selectedElement) {
        if (selectedElement.elementData.type === ClassDiagramElementsEnum.TABLE) {
            editOptions = <ClassEditOptions {...selectedElement as IClassElement} />
        }
    }

     return (
        <div id='sideBar'>
            {/* <p>{selectedElement && selectedElement.elementData.id}</p> */}
            {editOptions}
        </div>
    )
}

export default SideBar;