import IReducerPayload from '@interfaces/IReducerPayload';
import CanvasActionEnum from '@enums/canvasActionEnum';

const isMouseDownState = false;

const isMouseDownReducer = (state = isMouseDownState, payload: IReducerPayload<CanvasActionEnum, Boolean>) => {
    switch(payload.type) {
        case CanvasActionEnum.IS_MOUSE_DOWN:
            return payload.data;
        default:
            return state;
    }
};

export default isMouseDownReducer;