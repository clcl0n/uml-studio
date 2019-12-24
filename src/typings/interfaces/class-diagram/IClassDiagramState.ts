import IReduxEntity from '../IReduxEntity';
import IClass from './class/IClass';
import IClassPropertyData from './class/IClassPropertyData';
import IClassMethodData from './class/IClassMethodData';

export default interface IClassDiagramState {
    selectedElementId: string;
    classes: IReduxEntity<IClass>;
    classProperties: IReduxEntity<IClassPropertyData>;
    classMethods: IReduxEntity<IClassMethodData>;
}