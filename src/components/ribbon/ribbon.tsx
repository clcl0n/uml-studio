import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './ribbon.scss';
import RibbonOperationsEnum from '@enums/storeActions/ribbonOperationsEnum';
import NavTools from '@components/navTools';
import { useSelector, useDispatch } from 'react-redux';
import { changeOperation } from '../../store/actions/ribbon';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import CanvasEnum from '@enums/storeActions/canvasEnum';

function Ribbon() {
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
                    <div className='element'>
                        <img
                            draggable={true}
                            onDragStart={(ev) => ev.dataTransfer.setData('elementType', CanvasEnum.ADD_NEW_CLASS)}
                            className='element-svg'
                            src='src/assets/icons/class.svg'
                            alt='table'
                        />
                        <label className='element-label'>Table</label>
                    </div>
                    <div className='element'>
                        <img
                            draggable={true}
                            onDragStart={(ev) => ev.dataTransfer.setData('elementType', CanvasEnum.ADD_NEW_FULL_CLASS)}
                            className='element-svg'
                            src='src/assets/icons/class-full.svg'
                            alt='simple-table'/>
                        <label className='element-label'>Simple Table</label>
                    </div>
                    <div className='element'>
                        <img className='element-svg' src='src/assets/icons/frame-fragment.svg' alt='frame-fragment'/>
                        <label className='element-label'>Frame Fragment</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ribbon;