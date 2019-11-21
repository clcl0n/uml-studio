import CanvasEnum from '@enums/storeActions/canvasEnum';

export default interface ICanvasReducerPayload {
    type: CanvasEnum,
    graphicData: {x: number, y: number} | {x1: number, y1: number, x2: number, y2: number}
}