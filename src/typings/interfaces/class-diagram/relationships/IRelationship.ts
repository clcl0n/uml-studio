import ICoordinates from '@interfaces/ICoordinates';
import Direction from '@enums/direction';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';

export default interface IRelationship {
    id: string;
    type: ClassDiagramElementsEnum;
    fromClassId: string;
    toClassId: string;
    segmentIds: Array<string>;
    head: ICoordinates;
    tail: ICoordinates;
    direction: Direction;
}