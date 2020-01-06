import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IBaseElementGraphicData from './IBaseElementGraphicData';

export default interface IBaseElement<T, H> {
    id: string;
    type: ClassDiagramElementsEnum;
    graphicData: T;
    data: H;
}