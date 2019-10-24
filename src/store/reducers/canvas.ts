import ICanvasStoreState from '@interfaces/ICanvasStoreState';
import CanvasEnum from '@enums/storeActions/canvasEnum';
import ICanvasReducerPayload from '@interfaces/ICanvasReducerPayload';
import createNewTable from 'utils/canvasHelper/createNewTable';
import createNewAssociation from 'utils/canvasHelper/createNewAssociation';

const initialState: ICanvasStoreState = {
    currentlyDrawingRelationship: null,
    elements: []
}

const canvasReducer = (state = initialState, payload: ICanvasReducerPayload) => {
    switch (payload.type) {
        case CanvasEnum.ADD_NEW_CLASS:
            const newTableElement = createNewTable(payload.payload.event);
            state.elements.push(newTableElement);
            return state;
        case CanvasEnum.ADD_NEW_ASSOCIATION:
            // const newAssociationElement = createNewAssociation();
            state.elements.push(state.currentlyDrawingRelationship);
            state.currentlyDrawingRelationship = null;
            return state;
        case CanvasEnum.ADD_NEW_CURRENTLY_DRAWING_RELATIONSHIP:
            state.currentlyDrawingRelationship = createNewAssociation(payload.payload.event);
            return state;
        case CanvasEnum.EDIT_CURRENTLY_DRAWING_RELATIONSHIP:
            const event = payload.payload.event as React.MouseEvent<HTMLDivElement, MouseEvent>;
            state.currentlyDrawingRelationship.elementGraphicData.x2 = event.nativeEvent.offsetX;
            state.currentlyDrawingRelationship.elementGraphicData.y2 = event.nativeEvent.offsetY;
            return state;
        default:
            return state;
    }
}

export default canvasReducer;