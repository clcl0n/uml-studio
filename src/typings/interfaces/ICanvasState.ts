import ICanvasOperation from './ICanvasOperation';
import ClassDiagramRelationshipTypesEnum from '@enums/classDiagramRelationshipTypesEnum';

export default interface ICanvasState {
    selectedElementId: string;
    isMouseDown: boolean;
    canvasOperation: ICanvasOperation;
    defaultRelationshipType: ClassDiagramRelationshipTypesEnum;
}