import IReducerPayload from '@interfaces/IReducerPayload';
import CanvasActionEnum from '@enums/canvasActionEnum';

export const selectNewElement = (elementId: string): IReducerPayload<CanvasActionEnum, string> => {
    return {
        type: CanvasActionEnum.SELECT_NEW_ELEMENT,
        data: elementId
    };
};