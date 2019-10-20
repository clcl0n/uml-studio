import IElement from './elements/IElement';
import IElementData from './elements/IElementData';
import IElementGraphicData from './elements/IElementGraphicData';

export default interface ICanvasStoreState {
    elements: Array<IElement<IElementData, IElementGraphicData>>;
}