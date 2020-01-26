import IClassDiagramState from './class-diagram/IClassDiagramState';
import ICanvasState from './ICanvasState';
import IRibbonState from './IRibbonState';

export default interface IStoreState {
    ribbon: IRibbonState;
    canvas: ICanvasState;
    classDiagram: IClassDiagramState;
}