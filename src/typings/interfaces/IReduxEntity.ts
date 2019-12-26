import IDictionary from './IDictionary';

export default interface IReduxEntity<T> {
    byId: IDictionary<T>;
    allIds: Array<string>;
}