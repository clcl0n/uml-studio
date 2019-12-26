import IClassDiagramState from './class-diagram/IClassDiagramState';
import ICanvasState from './ICanvasState';

export default interface IStoreState {
    ribbon: string;
    canvas: ICanvasState;
    umlClassDiagram: IClassDiagramState;
}