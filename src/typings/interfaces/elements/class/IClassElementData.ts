import IClassElementMethod from './IClassElementMethod';
import IClassElementProperty from './IClassElementProperty';

export default interface ICLassElementData {
    className: string;
    classMethods: Array<IClassElementMethod>;
    classProperties: Array<IClassElementProperty>;
}