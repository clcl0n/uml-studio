import RibbonActionEnum from "@enums/ribbonActionEnum";
import IReducerPayload from '@interfaces/IReducerPayload';

const defaultZoom: number = 100; 
const zoomMin: number = 25;
const zoomMax: number = 400;
const canvasZoomState: number = defaultZoom;

export const canvasZoomReducer = (state = canvasZoomState, payload: IReducerPayload<RibbonActionEnum, number>) => {
    let newZoom: number = 0;
    switch(payload.type) {
        case RibbonActionEnum.CANVAS_ZOOM_IN:
            newZoom = state + payload.data;
            if (newZoom < zoomMin) {
                return zoomMin;
            } else {
                return newZoom;
            }
        case RibbonActionEnum.CANVAS_ZOOM_OUT:
            newZoom = state - payload.data;
            if (newZoom > zoomMax) {
                return zoomMax;
            } else {
                return newZoom;
            }
        case RibbonActionEnum.CANVAS_DEFAULT_ZOOM:
            return defaultZoom;
        default:
            return state;
    }
};