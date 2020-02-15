import IReduxEntity from '@interfaces/IReduxEntity';
import IStateElement from './state/IStateElement';
import IInitialStateElement from './initial-state/IInitialStateElement';
import IFinalStateElement from './final-state/IFinalStateElement';
import IForkJoinElement from './IForkJoinElement';
import IChoiceElement from './IChoiceElement';

export default interface IStateDiagramState {
    elements: IReduxEntity<IStateElement>;
    initialStateElements: IReduxEntity<IInitialStateElement>;
    finalStateElements: IReduxEntity<IFinalStateElement>;
    forkJoinElements: IReduxEntity<IForkJoinElement>;
    choiceElements: IReduxEntity<IChoiceElement>;
}