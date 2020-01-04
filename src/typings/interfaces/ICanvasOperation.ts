import CanvasOperationEnum from '@enums/canvasOperationEnum';

export default interface ICanvasOperation {
    type: CanvasOperationEnum;
    elementId: string;
}