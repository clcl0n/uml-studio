import IReducerPayload from '@interfaces/IReducerPayload';
import CanvasActionEnum from '@enums/canvasActionEnum';
import ICanvasOperation from '@interfaces/ICanvasOperation';

export const selectNewElement = (elementId: string): IReducerPayload<CanvasActionEnum, string> => {
    return {
        type: CanvasActionEnum.SELECT_NEW_ELEMENT,
        data: elementId
    };
};

export const isMouseDown = (isMouseDown: boolean): IReducerPayload<CanvasActionEnum, boolean> => {
    return {
        type: CanvasActionEnum.IS_MOUSE_DOWN,
        data: isMouseDown
    };
};

export const newCanvasOperation = (canvasOperation: ICanvasOperation) => {
    return {
        type: CanvasActionEnum.NEW_CANVAS_OPERATION,
        data: canvasOperation
    };
};