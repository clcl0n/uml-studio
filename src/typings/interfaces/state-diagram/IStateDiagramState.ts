import IReduxEntity from '@interfaces/IReduxEntity';
import IStateElement from './state/IStateElement';
import IInitialStateElement from './initial-state/IInitialStateElement';
import IFinalStateElement from './final-state/IFinalStateElement';
import IRelationshipHistory from '@interfaces/IRelationshipHistory';
import StateHistoryTypeEnum from '@enums/stateHistoryTypeEnum';

export default interface IStateDiagramState {
    elements: IReduxEntity<IStateElement>;
    initialStateElements: IReduxEntity<IInitialStateElement>;
    finalStateElements: IReduxEntity<IFinalStateElement>;
    undoHistory: IReduxEntity<{type: StateHistoryTypeEnum, data: IInitialStateElement | IFinalStateElement | IStateElement | IRelationshipHistory}>;
    redoHistory: IReduxEntity<{type: StateHistoryTypeEnum, data: IInitialStateElement | IFinalStateElement | IStateElement | IRelationshipHistory}>;
}