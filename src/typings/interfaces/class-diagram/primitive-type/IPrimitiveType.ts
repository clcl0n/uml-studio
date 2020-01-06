import IBaseElement from '../common/IBaseElement';
import IPrimitiveData from './IPrimitiveTypeData';
import IBaseElementGraphicData from '../common/IBaseElementGraphicData';

export default interface IPrimitiveType extends IBaseElement<IBaseElementGraphicData<{}>, IPrimitiveData> {}