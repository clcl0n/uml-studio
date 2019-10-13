import ICanvasStoreState from '@interfaces/ICanvasStoreState';
import CanvasEnum from '@enums/storeActions/canvasEnum';
import ICanvasReducerPayload from '@interfaces/ICanvasReducerPayload';
import createNewElement from 'utils/canvasHelper/createNewElement';

const initialState: ICanvasStoreState = {
    elements: []
}

const canvasReducer = (state = initialState, payload: ICanvasReducerPayload) => {
    switch (payload.type) {
        case CanvasEnum.ADD_NEW_ELEMENT:
            const newElement = createNewElement(payload.payload.element, payload.payload.event);
            state.elements.push(newElement);
        default:
            return state;
    }
}

export default canvasReducer;