import IReduxEntity from '@interfaces/IReduxEntity';
import IStateElement from './state/IStateElement';

export default interface IStateDiagramState {
    elements: IReduxEntity<IStateElement>;
}