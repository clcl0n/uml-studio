import ICoordinates from '@interfaces/ICoordinates';
import ICCXML from '@interfaces/ccxml/ICCXML';
import IBaseElement from '@interfaces/class-diagram/common/IBaseElement';
import ICCXMLClass from '@interfaces/ccxml/ICCXMLClass';
import ICCXMLDataType from '@interfaces/ccxml/ICCXMLDataType';
import ICCXMLEnumeration from '@interfaces/ccxml/ICCXMLEnumeration';
import ICCXMLInterface from '@interfaces/ccxml/ICCXMLInterface';
import ICCXMLObject from '@interfaces/ccxml/ICCXMLObject';
import ICCXMLPrimitive from '@interfaces/ccxml/ICCXMLPrimitive';
import ICCXMLUtility from '@interfaces/ccxml/ICCXMLUtility';
import ICCXMLBaseElement from '@interfaces/ccxml/ICCXMLBaseElement';
import ICCXMLTransition from '@interfaces/ccxml/ICCXMLTransition';
import { createNewClassFromCCXML } from './elements/class';
import { createNewUtilityFromCCXML } from './elements/utility';
import IEntry from '@interfaces/class-diagram/common/IEntry';
import { createNewDataTypeFromCCXML } from './elements/dataType';
import { createNewEnumerationFromCCXML } from './elements/enumeration';
import { createNewInterfaceFromCCXML } from './elements/interface';
import { createNewObjectFromCCXML } from './elements/object';
import { createNewPrimitiveTypeFromCCXML } from './elements/primitiveType';
import { parseClassDiagram as parse } from './classxmlParse';

const isCCXMLValid = (ccxml: ICCXML) => {
    let error = '';
    let warning = '';
    let isValid = true;

    return {
        isValid,
        error,
        warning
    };
};

export const parseClassDiagram = async (ccxml: ICCXML, canvasDimensions: ICoordinates) => {
    const { newElements, newEntries, newRelationShipSegments, newRelationShips } = await parse(ccxml, canvasDimensions);

    return {
        newElements,
        newRelationShips,
        newRelationShipSegments,
        newEntries
    };
};