import ICanvasOperation from '@interfaces/ICanvasOperation';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import IReducerPayload from '@interfaces/IReducerPayload';
import CanvasActionEnum from '@enums/canvasActionEnum';

const canvasOperationState: ICanvasOperation = {
    type: CanvasOperationEnum.NONE,
    elementId: ''     
};

const canvasOperationReducer = (state = canvasOperationState, payload: IReducerPayload<CanvasActionEnum, ICanvasOperation>) => {
    switch(payload.type) {
        case CanvasActionEnum.NEW_CANVAS_OPERATION:
            return {...payload.data};
        default:
            return state;
    }
};

export default canvasOperationReducer;