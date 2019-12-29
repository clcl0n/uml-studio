import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';

export default interface IBaseElement<T, H> {
    id: string;
    type: ClassDiagramElementsEnum;
    graphicData: T;
    data: H;
}