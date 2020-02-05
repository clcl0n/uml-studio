import IClassDiagramState from './class-diagram/IClassDiagramState';
import ICanvasState from './ICanvasState';
import IRibbonState from './IRibbonState';
import IStateDiagramState from './state-diagram/IStateDiagramState';

export default interface IStoreState {
    ribbon: IRibbonState;
    canvas: ICanvasState;
    classDiagram: IClassDiagramState;
    stateDiagram: IStateDiagramState;
}