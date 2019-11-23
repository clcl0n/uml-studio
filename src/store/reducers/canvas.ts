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
            const newTableElement = createNewTable(payload.graphicData as {x: number, y: number});
            state.elements.push(newTableElement);
            return state;
        case CanvasEnum.ADD_NEW_ASSOCIATION:
            const newAssociationElement = createNewAssociation(payload.graphicData as {x1: number, y1: number, x2: number, y2: number});
            state.elements.push(newAssociationElement);
            return state;
        default:
            return state;
    }
}

export default canvasReducer;