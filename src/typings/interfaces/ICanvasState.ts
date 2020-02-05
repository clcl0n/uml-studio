import ICanvasOperation from './ICanvasOperation';
import ClassDiagramRelationshipTypesEnum from '@enums/classDiagramRelationshipTypesEnum';
import DiagramTypeEnum from '@enums/diagramTypeEnum';

export default interface ICanvasState {
    selectedElementId: string;
    isMouseDown: boolean;
    canvasOperation: ICanvasOperation;
    defaultRelationshipType: ClassDiagramRelationshipTypesEnum;
    diagramType: DiagramTypeEnum;
}