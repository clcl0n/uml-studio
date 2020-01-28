import IReduxEntity from '../IReduxEntity';
import IEntry from './common/IEntry';
import IBaseElement from './common/IBaseElement';
import INewRelationship from './INewRelationship';
import IRelationshipSegment from './relationships/IRelationshipSegment';
import IRelationship from './relationships/IRelationship';

export default interface IClassDiagramState {
    selectedElementId: string;
    elements: IReduxEntity<IBaseElement<any>>;
    elementEntries: IReduxEntity<IEntry>;
    relationships: IReduxEntity<IRelationship>;
    relationshipSegments: IReduxEntity<IRelationshipSegment>;
    newRelationship: INewRelationship;
}