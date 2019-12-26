import IReduxEntity from '../IReduxEntity';
import IClass from './class/IClass';
import IClassPropertyData from './class/IClassPropertyData';
import IClassMethodData from './class/IClassMethodData';
import IRelationship from './relationships/IRelationship';
import IRelationshipSegment from './relationships/IRelationshipSegment';

export default interface IClassDiagramState {
    selectedElementId: string;
    classes: IReduxEntity<IClass>;
    classProperties: IReduxEntity<IClassPropertyData>;
    classMethods: IReduxEntity<IClassMethodData>;
    relationships: IReduxEntity<IRelationship>;
    relationshipSegments: IReduxEntity<IRelationshipSegment>;
}