import IElement from './elements/IElement';
import IElementData from './elements/IElementData';
import IElementGraphicData from './elements/IElementGraphicData';
import IRelationElement from './elements/IRelationElement';

export default interface ICanvasStoreState {
    currentlyDrawingRelationship: IRelationElement;
    elements: Array<IElement<IElementData, IElementGraphicData>>;
}