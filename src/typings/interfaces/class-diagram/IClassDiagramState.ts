import IReduxEntity from '../IReduxEntity';
import IEntry from './common/IEntry';
import IBaseElement from './common/IBaseElement';
import INewRelationship from './INewRelationship';
import IRelationshipSegment from './relationships/IRelationshipSegment';
import IRelationship from './relationships/IRelationship';
import HistoryTypeEnum from '@enums/historyTypeEnum';
import IElementHistory from '@interfaces/IElementHistory';
import IRelationshipHistory from '@interfaces/IRelationshipHistory';

export default interface IClassDiagramState {
    elements: IReduxEntity<IBaseElement<any>>;
    elementEntries: IReduxEntity<IEntry>;
    relationships: IReduxEntity<IRelationship>;
    relationshipSegments: IReduxEntity<IRelationshipSegment>;
    newRelationship: INewRelationship;
    undoHistory: IReduxEntity<{type: HistoryTypeEnum, data: IElementHistory | IRelationshipHistory}>;
    redoHistory: IReduxEntity<{type: HistoryTypeEnum, data: IElementHistory | IRelationshipHistory}>;
}