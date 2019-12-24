import IReducerPayload from '@interfaces/IReducerPayload';
import CanvasActionEnum from '@enums/canvasActionEnum';

const selectedElementId = '';

const selectedElementIdReducer = (state = selectedElementId, payload: IReducerPayload<CanvasActionEnum, string>) => {
    switch(payload.type){
        case CanvasActionEnum.SELECT_NEW_ELEMENT:
            return payload.data;
        default:
            return state;
    }
};

export default selectedElementIdReducer;