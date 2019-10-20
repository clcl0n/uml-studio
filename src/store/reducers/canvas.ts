import ICanvasStoreState from '@interfaces/ICanvasStoreState';
import CanvasEnum from '@enums/storeActions/canvasEnum';
import ICanvasReducerPayload from '@interfaces/ICanvasReducerPayload';
import createNewTable from 'utils/canvasHelper/createNewTable';
import createNewAssociation from 'utils/canvasHelper/createNewAssociation';
import RibbonModeEnum from '@enums/storeActions/ribbonOperationsEnum';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';

const initialState: ICanvasStoreState = {
    elements: []
}

const canvasReducer = (state = initialState, payload: ICanvasReducerPayload) => {
    switch (payload.type) {
        case RibbonModeEnum.ADD_NEW_TABLE:
            const newTableElement = createNewTable(payload.payload.event);
            state.elements.push(newTableElement);
            return state;
        case RibbonModeEnum.ADD_NEW_ASSOCIATION:
            const newAssociationElement = createNewAssociation();
            state.elements.push(newAssociationElement);
            return state;
        default:
            return state;
    }
}

export default canvasReducer;