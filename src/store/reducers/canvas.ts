import ICanvasStoreState from '@interfaces/ICanvasStoreState';
import CanvasEnum from '@enums/storeActions/canvasEnum';
import ICanvasReducerPayload from '@interfaces/ICanvasReducerPayload';
import createNewTableElement from 'utils/canvasHelper/createNewTableElement';
import createNewAssociationElement from 'utils/canvasHelper/createNewAssociationElement';
import RibbonModeEnum from '@enums/storeActions/ribbonOperationsEnum';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';

const initialState: ICanvasStoreState = {
    elements: []
}

const canvasReducer = (state = initialState, payload: ICanvasReducerPayload) => {
    switch (payload.type) {
        case RibbonModeEnum.ADD_NEW_TABLE:
            const newTableElement = createNewTableElement(payload.payload.event);
            state.elements.push(newTableElement);
            return state;
        case RibbonModeEnum.ADD_NEW_ASSOCIATION:
            const newAssociationElement = createNewAssociationElement();
            state.elements.push(newAssociationElement);
            return state;
        default:
            return state;
    }
}

export default canvasReducer;