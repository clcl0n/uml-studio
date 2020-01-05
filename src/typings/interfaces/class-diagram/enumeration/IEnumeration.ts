import IBaseElement from '../common/IBaseElement';
import IEnumerationData from './IEnumerationData';
import IBaseElementGraphicData from '../common/IBaseElementGraphicData';

export default interface IEnumeration extends IBaseElement<IBaseElementGraphicData<{}>, IEnumerationData> {}