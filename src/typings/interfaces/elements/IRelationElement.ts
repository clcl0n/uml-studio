import IElement from './IElement';
import IAssociationGraphicData from './association/IAssociationGraphicData';

export default interface IRelationElement extends IElement<{}, IAssociationGraphicData> {}