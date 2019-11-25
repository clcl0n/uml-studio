import CanvasEnum from '@enums/storeActions/canvasEnum';

export default interface ICanvasReducerPayload {
    type: CanvasEnum,
    data: any
}