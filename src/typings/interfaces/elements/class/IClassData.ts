import IClassElementMethod from './IClassMethodData';
import IClassElementProperty from './IClassPropertyData';

export default interface IClassData {
    className: string;
    classMethods: Array<IClassElementMethod>;
    classProperties: Array<IClassElementProperty>;
}