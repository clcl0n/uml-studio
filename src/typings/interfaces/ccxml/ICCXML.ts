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
    classes: Array<{ class: Array<ICCXMLClass> }>;
    utilities: Array<{ utility: Array<ICCXMLUtility> }>;
    primitives: Array<{ primitive: Array<ICCXMLPrimitive> }>;
    objects: Array<{ object: Array<ICCXMLObject> }>;
    interfaces: Array<{ interface: Array<ICCXMLInterface> }>;
    enumerations: Array<{ enumeration: Array<ICCXMLEnumeration> }>;
    dataTypes: Array<{ dataType: Array<ICCXMLDataType> }>;
}