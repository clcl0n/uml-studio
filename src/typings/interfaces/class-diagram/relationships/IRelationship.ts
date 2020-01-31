import ICoordinates from '@interfaces/ICoordinates';
import Direction from '@enums/direction';
import ClassDiagramRelationshipTypesEnum from '@enums/classDiagramRelationshipTypesEnum';

export default interface IRelationship {
    id: string;
    type: ClassDiagramRelationshipTypesEnum;
    fromElementId: string;
    toElementId: string;
    segmentIds: Array<string>;
    head: ICoordinates;
    tail: ICoordinates;
    direction: Direction;
}