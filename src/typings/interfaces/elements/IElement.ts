import IElementData from './IElementData';
import IElementGraphicData from './IElementGraphicData';
import IElementFunctionality from './IElementFunctionality';

export default interface IElement<T, H> {
    elementData: IElementData & T;
    elementGraphicData: IElementGraphicData & H;
    elementFunctionality: IElementFunctionality;
}