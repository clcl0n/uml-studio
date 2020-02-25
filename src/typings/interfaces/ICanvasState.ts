import ICanvasOperation from './ICanvasOperation';
import ClassDiagramRelationshipTypesEnum from '@enums/classDiagramRelationshipTypesEnum';
import DiagramTypeEnum from '@enums/diagramTypeEnum';
import ICoordinates from './ICoordinates';

export default interface ICanvasState {
    selectedElementId: string;
    isMouseDown: boolean;
    canvasOperation: ICanvasOperation;
    defaultRelationshipType: ClassDiagramRelationshipTypesEnum;
    diagramType: DiagramTypeEnum;
    canvasDimensions: ICoordinates;
}