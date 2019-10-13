import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './ribbon.scss';
import RibbonOperationsEnum from '@enums/storeActions/ribbonOperationsEnum';
import NavTools from '@components/navTools';
import { useSelector, useDispatch } from 'react-redux';
import { changeOperation } from '../../store/actions/ribbon';

function Ribbon() {
    const ribbon = useSelector((state: any) => state.ribbon);
    const dispatch = useDispatch();
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
                    <div onClick={() => dispatch(changeOperation(RibbonOperationsEnum.ADD_NEW_TABLE))} className='element'>
                        <img className='element-svg' src='src/assets/icons/table.svg' alt='table'/>
                        <label className='element-label'>Table</label>
                    </div>
                    <div className='element'>
                        <img className='element-svg' src='src/assets/icons/simple-table.svg' alt='simple-table'/>
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