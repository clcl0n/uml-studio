import IEnumeration from './IEnumeration';
import IEnumerationEntry from './IEnumerationEntry';

export default interface IEnumerationProps {
    enumeration: IEnumeration;
    entries: Array<IEnumerationEntry>;
}