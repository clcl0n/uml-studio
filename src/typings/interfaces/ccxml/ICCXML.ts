import ICCXMLClass from './ICCXMLClass';
import ICCXMLUtility from './ICCXMLUtility';
import ICCXMLPrimitive from './ICCXMLPrimitive';
import ICCXMLObject from './ICCXMLObject';
import ICCXMLInterface from './ICCXMLInterface';
import ICCXMLEnumeration from './ICCXMLEnumeration';
import ICCXMLDataType from './ICCXMLDataType';

export default interface ICCXML {
    $: {
        name?: string;
        version?: string;
        initialclass?: string;
        coordinates?: string;
    };
    class: Array<ICCXMLClass>;
    utility: Array<ICCXMLUtility>;
    primitive: Array<ICCXMLPrimitive>;
    object: Array<ICCXMLObject>;
    interface: Array<ICCXMLInterface>;
    enumeration: Array<ICCXMLEnumeration>;
    datatype: Array<ICCXMLDataType>;
}