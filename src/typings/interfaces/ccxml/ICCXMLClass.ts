import ICCXMLBaseElement from './ICCXMLBaseElement';
import ICCXMLProperty from './ICCXMLProperty';
import ICCXMLMethod from './ICCXMLMethod';

export default interface ICCXMLClass extends ICCXMLBaseElement {
    property: Array<ICCXMLProperty>;
    method: Array<ICCXMLMethod>;
}