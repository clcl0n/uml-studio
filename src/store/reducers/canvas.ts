import ICanvasStoreState from '@interfaces/ICanvasStoreState';
import CanvasEnum from '@enums/storeActions/canvasEnum';
import ICanvasReducerPayload from '@interfaces/ICanvasReducerPayload';
import createNewClassElement from 'utils/canvasHelper/createNewClassElement';
import createNewAssociation from 'utils/canvasHelper/createNewAssociation';
import updateTable from 'utils/canvasHelper/updateTable';
import * as log from 'loglevel';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import I2DCoordinates from '@interfaces/I2DCoordinates';

const initialState: ICanvasStoreState = {
    elements: [],
    selectedElementId: null
}

const canvasReducer = (state = initialState, payload: ICanvasReducerPayload) => {
    switch (payload.type) {
        case CanvasEnum.ADD_NEW_CLASS:
            const newClassElement = createNewClassElement(payload.data as I2DCoordinates, true);
            log.debug(`Redux - added new class with id: ${newClassElement.elementData.id}`);
            state.elements.push(newClassElement);
            return state;
        case CanvasEnum.ADD_NEW_FULL_CLASS:
            const newFullClassElement = createNewClassElement(payload.data as I2DCoordinates, false);
            log.debug(`Redux - added new full class with id: ${newFullClassElement.elementData.id}`);
            state.elements.push(newFullClassElement);
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