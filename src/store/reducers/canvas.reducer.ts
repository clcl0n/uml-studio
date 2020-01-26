import CanvasActionEnum from '@enums/canvasActionEnum';
import ICanvasOperation from '@interfaces/ICanvasOperation';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import IReducerPayload from '@interfaces/IReducerPayload';

const isMouseDownState = false;
const selectedElementId = '';
const canvasOperationState: ICanvasOperation = {
    type: CanvasOperationEnum.NONE,
    elementId: ''     
};

export const canvasOperationReducer = (state = canvasOperationState, payload: IReducerPayload<CanvasActionEnum, ICanvasOperation>) => {
    switch(payload.type) {
        case CanvasActionEnum.NEW_CANVAS_OPERATION:
            return {...payload.data};
        default:
            return state;
    }
};

export const isMouseDownReducer = (state = isMouseDownState, payload: IReducerPayload<CanvasActionEnum, Boolean>) => {
    switch(payload.type) {
        case CanvasActionEnum.IS_MOUSE_DOWN:
            return payload.data;
        default:
            return state;
    }
};

export const selectedElementIdReducer = (state = selectedElementId, payload: IReducerPayload<CanvasActionEnum, string>) => {
    switch(payload.type){
        case CanvasActionEnum.SELECT_NEW_ELEMENT:
            return payload.data;
        default:
            return state;
    }
};
