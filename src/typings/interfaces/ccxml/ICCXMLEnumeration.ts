import ICCXMLEntry from './ICCXMLEntry';
import ICCXMLBaseElement from './ICCXMLBaseElement';

export default interface ICCXMLEnumeration extends ICCXMLBaseElement {
    entry: Array<ICCXMLEntry>;
}