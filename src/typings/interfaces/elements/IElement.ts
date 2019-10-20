import IElementData from './IElementData';
import IElementGraphicData from './IElementGraphicData';

export default interface IElement<T, H> {
    elementData: IElementData & T;
    elementGraphicData: IElementGraphicData & H;
}