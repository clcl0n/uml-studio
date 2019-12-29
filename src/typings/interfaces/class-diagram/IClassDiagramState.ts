import IReduxEntity from '../IReduxEntity';
import IClass from './class/IClass';
import IClassProperty from './class/IClassProperty';
import IClassMethod from './class/IClassMethod';
import IRelationship from './relationships/IRelationship';
import IRelationshipSegment from './relationships/IRelationshipSegment';
import IInterface from './interface/IInterface';
import IInterfaceMethod from './interface/IInterfaceMethod';
import IInterfaceProperty from './interface/IInterfaceProperty';

export default interface IClassDiagramState {
    selectedElementId: string;
    classes: IReduxEntity<IClass>;
    classProperties: IReduxEntity<IClassProperty>;
    classMethods: IReduxEntity<IClassMethod>;
    relationships: IReduxEntity<IRelationship>;
    relationshipSegments: IReduxEntity<IRelationshipSegment>;
    interfaces: IReduxEntity<IInterface>;
    interfaceMethods: IReduxEntity<IInterfaceMethod>;
    interfaceProperties: IReduxEntity<IInterfaceProperty>;
}