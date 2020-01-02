import IReducerPayload from '@interfaces/IReducerPayload';
import RibbonActionEnum from '@enums/ribbonActionEnum';

export const canvasZoomIn = (data: number): IReducerPayload<RibbonActionEnum, number> => {
    return {
        type: RibbonActionEnum.CANVAS_ZOOM_IN,
        data
    };
};

export const canvasZoomOut = (data: number): IReducerPayload<RibbonActionEnum, number> => {
    return {
        type: RibbonActionEnum.CANVAS_ZOOM_OUT,
        data
    };
};