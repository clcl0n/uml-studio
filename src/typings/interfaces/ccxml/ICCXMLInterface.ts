import ICCXMLBaseElement from './ICCXMLBaseElement';
import ICCXMLProperty from './ICCXMLProperty';
import ICCXMLMethod from './ICCXMLMethod';

export default interface ICCXMLInterface extends ICCXMLBaseElement {
    properties: Array<{ property: Array<ICCXMLProperty>}>;
    methods: Array<{ method: Array<ICCXMLMethod>}>;
}