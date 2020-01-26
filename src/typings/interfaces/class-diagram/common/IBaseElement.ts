import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IBaseElementGraphicData from './IBaseElementGraphicData';
import IBaseElementData from './IBaseElementData';

export default interface IBaseElement<T> {
    id: string;
    type: ClassDiagramElementsEnum;
    graphicData: T;
    data: IBaseElementData;
}