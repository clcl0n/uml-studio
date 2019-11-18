import ICanvasStoreState from '@interfaces/ICanvasStoreState';
import CanvasEnum from '@enums/storeActions/canvasEnum';
import ICanvasReducerPayload from '@interfaces/ICanvasReducerPayload';
import createNewTable from 'utils/canvasHelper/createNewTable';
import createNewAssociation from 'utils/canvasHelper/createNewAssociation';

const initialState: ICanvasStoreState = {
    elements: []
}

const canvasReducer = (state = initialState, payload: ICanvasReducerPayload) => {
    switch (payload.type) {
        case CanvasEnum.ADD_NEW_CLASS:
            const newTableElement = createNewTable(payload.payload.event);
            state.elements.push(newTableElement);
            return state;
        case CanvasEnum.ADD_NEW_ASSOCIATION:
            // to-do
            // state.elements.push();
            return state;
        default:
            return state;
    }
}

export default canvasReducer;