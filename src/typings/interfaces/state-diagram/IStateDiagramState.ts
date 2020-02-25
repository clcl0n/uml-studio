import IReduxEntity from '@interfaces/IReduxEntity';
import IStateElement from './state/IStateElement';
import IInitialStateElement from './initial-state/IInitialStateElement';
import IFinalStateElement from './final-state/IFinalStateElement';
import IForkJoinElement from './IForkJoinElement';
import IChoiceElement from './IChoiceElement';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import INewRelationship from '@interfaces/class-diagram/INewRelationship';

export default interface IStateDiagramState {
    elements: IReduxEntity<IStateElement>;
    initialStateElements: IReduxEntity<IInitialStateElement>;
    finalStateElements: IReduxEntity<IFinalStateElement>;
    forkJoinElements: IReduxEntity<IForkJoinElement>;
    choiceElements: IReduxEntity<IChoiceElement>;
    relationships: IReduxEntity<IRelationship>;
    relationshipSegments: IReduxEntity<IRelationshipSegment>;
    newRelationship: INewRelationship;
}