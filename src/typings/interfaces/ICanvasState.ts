import ICanvasOperation from './ICanvasOperation';

export default interface ICanvasState {
    selectedElementId: string;
    isMouseDown: boolean;
    canvasOperation: ICanvasOperation;
}