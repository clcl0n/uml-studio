import ICCXMLBaseElement from './ICCXMLBaseElement';
import ICCXMLSlot from './ICCXMLSlot';

export default interface ICCXMLObject extends ICCXMLBaseElement {
    slot: Array<ICCXMLSlot>;
}