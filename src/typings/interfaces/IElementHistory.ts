import IBaseElement from './class-diagram/common/IBaseElement';
import IEntry from './class-diagram/common/IEntry';

export default interface IElementHistory {
    element: IBaseElement<any>;
    entries: Array<IEntry>;
}