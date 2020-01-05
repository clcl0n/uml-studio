import IBaseElement from '../common/IBaseElement';
import IClassGraphicData from './IClassGraphicData';
import IClassData from './IClassData';
import IBaseElementGraphicData from '../common/IBaseElementGraphicData';
import IClassFrameSections from './IClassFrameSections';

export default interface IClass extends IBaseElement<IBaseElementGraphicData<IClassFrameSections>, IClassData> {}