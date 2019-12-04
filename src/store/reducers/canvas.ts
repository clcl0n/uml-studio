import ICanvasStoreState from '@interfaces/ICanvasStoreState';
import CanvasEnum from '@enums/storeActions/canvasEnum';
import ICanvasReducerPayload from '@interfaces/ICanvasReducerPayload';
import createNewTable from 'utils/canvasHelper/createNewTable';
import createNewAssociation from 'utils/canvasHelper/createNewAssociation';
import updateTable from 'utils/canvasHelper/updateTable';
import * as log from 'loglevel';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';

const initialState: ICanvasStoreState = {
    elements: [],
    selectedElementId: null
}

const canvasReducer = (state = initialState, payload: ICanvasReducerPayload) => {
    switch (payload.type) {
        case CanvasEnum.ADD_NEW_CLASS:
            const newTableElement = createNewTable(payload.data as {x: number, y: number});
            log.debug(`Redux - added new class with id: ${newTableElement.elementData.id}`);
            state.elements.push(newTableElement);
            return state;
        case CanvasEnum.ADD_NEW_ASSOCIATION:
            const newAssociationElement = createNewAssociation(payload.data as {x1: number, y1: number, x2: number, y2: number});
            log.debug(`Redux - added new association with id: ${newAssociationElement.elementData.id}`);
            state.elements.push(newAssociationElement);
            return state;
        case CanvasEnum.SELECT_ELEMENT:
            state.selectedElementId = payload.data;
            log.debug(`Redux - selected element with id: ${payload.data}`);
            return state;
        case CanvasEnum.UPDATE_ELEMENT:
            const index = state.elements.findIndex((element) => element.elementData.id == payload.data.elementData.id);
            switch (payload.data.elementData.type as ClassDiagramElementsEnum) {
                case ClassDiagramElementsEnum.TABLE:
                    state.elements[index] = updateTable(payload.data);
                    log.debug(`Redux - updated class element with id: ${payload.data.elementData.id}`);
                    return state;
                case ClassDiagramElementsEnum.ASSOCIATION:
                    state.elements[index] = payload.data;
                    return state;
                default:
                    return state;
            }
        default:
            return state;
    }
}

export default canvasReducer;