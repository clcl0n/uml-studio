import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './canvas.scss';
import { useSelector, useDispatch } from 'react-redux';
import createNewElement from 'utils/canvasHelper/createNewElement';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import { drawNewElement } from 'store/actions/canvas';

function Canvas() {
    const ribbon = useSelector((state: any) => state.ribbon);
    const dispatch = useDispatch();
    
    return (
        <div id='canvas'>
            <svg onClick={(event) => dispatch(drawNewElement(ClassDiagramElementsEnum.TABLE, event))} id='svg-canvas' viewBox='0 0 100 100' width='100%' height='100%'/>
        </div>
    );
}

export default Canvas;