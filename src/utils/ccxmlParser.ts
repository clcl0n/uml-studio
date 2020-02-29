import ICoordinates from '@interfaces/ICoordinates';
import ICCXML from '@interfaces/ccxml/ICCXML';
import IBaseElement from '@interfaces/class-diagram/common/IBaseElement';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import ICCXMLClass from '@interfaces/ccxml/ICCXMLClass';
import ICCXMLDataType from '@interfaces/ccxml/ICCXMLDataType';
import ICCXMLEnumeration from '@interfaces/ccxml/ICCXMLEnumeration';
import ICCXMLInterface from '@interfaces/ccxml/ICCXMLInterface';
import ICCXMLObject from '@interfaces/ccxml/ICCXMLObject';
import ICCXMLPrimitive from '@interfaces/ccxml/ICCXMLPrimitive';
import ICCXMLUtility from '@interfaces/ccxml/ICCXMLUtility';
import ICCXMLBaseElement from '@interfaces/ccxml/ICCXMLBaseElement';
import ICCXMLTransition from '@interfaces/ccxml/ICCXMLTransition';
import { createNewBaseClass, createNewClassFromCCXML } from './elements/class';
import { createNewUtility, createNewUtilityFromCCXML } from './elements/utility';
import IEntry from '@interfaces/class-diagram/common/IEntry';
import { createNewDataType, createNewDataTypeFromCCXML } from './elements/dataType';
import { createNewEnumeration, createNewEnumerationFromCCXML } from './elements/enumeration';
import { createNewInterface, createNewInterfaceFromCCXML } from './elements/interface';
import { createNewObject, createNewObjectFromCCXML } from './elements/object';
import { createNewPrimitiveType, createNewPrimitiveTypeFromCCXML } from './elements/primitiveType';

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

const elementsToAdd = (
    ccxmlClass: Array<ICCXMLClass>,
    ccxmlDatatype: Array<ICCXMLDataType>,
    ccxmlEnumeration: Array<ICCXMLEnumeration>,
    ccxmlInterface: Array<ICCXMLInterface>,
    ccxmlObject: Array<ICCXMLObject>,
    ccxmlPrimitive: Array<ICCXMLPrimitive>,
    ccxmlUtility: Array<ICCXMLUtility>,
    ccxmlExistingElements: Array<string>
) => {
    const filter = (toFilter: Array<ICCXMLBaseElement>) => {
        return toFilter.filter((element) => ccxmlExistingElements.indexOf(element.$.id) === -1);
    };

    return [
        ...filter(ccxmlClass),
        ...filter(ccxmlDatatype),
        ...filter(ccxmlEnumeration),
        ...filter(ccxmlInterface),
        ...filter(ccxmlObject),
        ...filter(ccxmlPrimitive),
        ...filter(ccxmlUtility)
    ];
};

const createNewElement = (
    ccxmlClass: ICCXMLClass,
    ccxmlDatatype: ICCXMLDataType,
    ccxmlEnumeration: ICCXMLEnumeration,
    ccxmlInterface: ICCXMLInterface,
    ccxmlObject: ICCXMLObject,
    ccxmlPrimitive: ICCXMLPrimitive,
    ccxmlUtility: ICCXMLUtility,
    coordinates: ICoordinates
) => {
    if (ccxmlClass) {
        const { entries, newClass } = createNewClassFromCCXML(coordinates, ccxmlClass);
        return {
            target: ccxmlClass,
            element: newClass,
            entries
        };
    } else if (ccxmlUtility) {
        const { newUtility, entries } = createNewUtilityFromCCXML(coordinates, ccxmlUtility);
        return {
            target: ccxmlUtility,
            element: newUtility,
            entries
        };
    } else if (ccxmlDatatype) {
        const { newDataType, entries } = createNewDataTypeFromCCXML(coordinates, ccxmlDatatype);
        return {
            target: ccxmlDatatype,
            element: newDataType,
            entries
        };
    } else if (ccxmlEnumeration) {
        const { entries, newEnumeration } = createNewEnumerationFromCCXML(coordinates, ccxmlEnumeration);
        return {
            target: ccxmlEnumeration,
            element: newEnumeration,
            entries
        };
    } else if (ccxmlInterface) {
        const { newInterface, entries } = createNewInterfaceFromCCXML(coordinates, ccxmlInterface);
        return {
            target: ccxmlInterface,
            element: newInterface,
            entries
        };
    } else if (ccxmlObject) {
        const { newObject, entries } = createNewObjectFromCCXML(coordinates, ccxmlObject);
        return {
            target: ccxmlObject,
            element: newObject,
            entries
        };
    } else {
        const { newPrimitiveType } = createNewPrimitiveTypeFromCCXML(coordinates, ccxmlPrimitive);
        return {
            target: ccxmlPrimitive,
            element: newPrimitiveType,
            entries: [] as any
        };
    }
};

export const createTargetedElement = (
    ccxmlClass: Array<ICCXMLClass>,
    ccxmlDatatype: Array<ICCXMLDataType>,
    ccxmlEnumeration: Array<ICCXMLEnumeration>,
    ccxmlInterface: Array<ICCXMLInterface>,
    ccxmlObject: Array<ICCXMLObject>,
    ccxmlPrimitive: Array<ICCXMLPrimitive>,
    ccxmlUtility: Array<ICCXMLUtility>,
    transition: ICCXMLTransition,
    coordinates: ICoordinates
): { target: ICCXMLBaseElement, element: IBaseElement<any>, entries: Array<IEntry> } => {
    const targetedClass = ccxmlClass.find((e) => e.$.id === transition.$.target);
    const targetedDataType = ccxmlDatatype.find((e) => e.$.id === transition.$.target);
    const targetedEnumeration = ccxmlEnumeration.find((e) => e.$.id === transition.$.target);
    const targetedInterface = ccxmlInterface.find((e) => e.$.id === transition.$.target);
    const targetedObject = ccxmlObject.find((e) => e.$.id === transition.$.target);
    const targetedPrimitive = ccxmlPrimitive.find((e) => e.$.id === transition.$.target);
    const targetedUtility = ccxmlUtility.find((e) => e.$.id === transition.$.target);

    return createNewElement(
        targetedClass,
        targetedDataType,
        targetedEnumeration,
        targetedInterface,
        targetedObject,
        targetedPrimitive,
        targetedUtility,
        coordinates
    );
};

export const parseClassDiagram = async (ccxml: ICCXML, canvasDimensions: ICoordinates) => {
    const newElements: Array<IBaseElement<any>> = [];
    const newEntries: Array<IEntry> = [];
    const newRelationShips: Array<IRelationship> = [];
    const newRelationShipSegments: Array<IRelationshipSegment> = [];
    const ccxmlExistingElements: Array<string> = [];

    const canvasMiddle: ICoordinates = { x: canvasDimensions.x / 2, y: canvasDimensions.y / 2 };
    const coordinates: ICoordinates = { x: canvasMiddle.x, y: canvasMiddle.y };

    const layerDistance = 300;
    const elementDistance = 120;

    const { isValid, warning, error } = isCCXMLValid(ccxml);

    if (ccxml && isValid) {
        const ccxmlClass = ccxml.class ?? [];
        const ccxmlDatatype = ccxml.datatype ?? [];
        const ccxmlEnumeration = ccxml.enumeration ?? [];
        const ccxmlInterface = ccxml.interface ?? [];
        const ccxmlObject = ccxml.object ?? [];
        const ccxmlPrimitive = ccxml.primitive ?? [];
        const ccxmlUtility = ccxml.utility ?? [];

        let toAdd = elementsToAdd(
            ccxmlClass,
            ccxmlDatatype,
            ccxmlEnumeration,
            ccxmlInterface,
            ccxmlObject,
            ccxmlPrimitive,
            ccxmlUtility,
            ccxmlExistingElements
        );

        const initialElement = ccxml.$.initialclass ? toAdd.find((e) => e.$.id === ccxml.$.initialclass) : toAdd[0];
        const {element, entries} = createTargetedElement(
            ccxmlClass,
            ccxmlDatatype,
            ccxmlEnumeration,
            ccxmlInterface,
            ccxmlObject,
            ccxmlPrimitive,
            ccxmlUtility,
            {
                $: {
                    head: '',
                    tail: '',
                    value: '',
                    target: initialElement.$.id
                }
            },
            coordinates
        );
        newElements.push(element);
        newEntries.push(...entries);
        ccxmlExistingElements.push(initialElement.$.id);
        toAdd = elementsToAdd(
            ccxmlClass,
            ccxmlDatatype,
            ccxmlEnumeration,
            ccxmlInterface,
            ccxmlObject,
            ccxmlPrimitive,
            ccxmlUtility,
            ccxmlExistingElements
        );

        let previousLayer: Array<ICCXMLBaseElement> = [initialElement];
        let currentLayer: Array<ICCXMLBaseElement> = [];
        while (toAdd.length > 0) {
            currentLayer = [];
            coordinates.x += layerDistance;
            let transitions: Array<ICCXMLTransition> = [];
            let transitionToAdd: Array<{
                transition: ICCXMLTransition,
                from: string;
            }> = [];

            previousLayer.forEach((ccxmlElement) => {
                if (ccxmlElement.transition && ccxmlElement.transition.length > 0) {
                    const transitionDependentElements = ccxmlElement.transition.filter((transition) => toAdd.findIndex((t) => t.$.id === transition.$.target) !== -1);
                    transitions.push(...transitionDependentElements);
                    transitionToAdd.push(
                        ...ccxmlElement.transition.map((t) => {
                            return {
                                transition: t,
                                from: ccxmlElement.$.id
                            };
                        })
                    );
                    ccxmlExistingElements.push(...transitionDependentElements.map((t) => t.$.target));
                    toAdd = elementsToAdd(
                        ccxmlClass,
                        ccxmlDatatype,
                        ccxmlEnumeration,
                        ccxmlInterface,
                        ccxmlObject,
                        ccxmlPrimitive,
                        ccxmlUtility,
                        ccxmlExistingElements
                    );
                }
            });
            
            if (transitions.length % 2 === 0) {
                coordinates.y -= elementDistance * (transitions.length / 2);
            } else if (transitions.length > 1) {
                coordinates.y -= elementDistance * ((transitions.length - 1) / 2);
            }

            transitions.forEach((transition) => {
                const {element, target, entries} = createTargetedElement(
                    ccxmlClass,
                    ccxmlDatatype,
                    ccxmlEnumeration,
                    ccxmlInterface,
                    ccxmlObject,
                    ccxmlPrimitive,
                    ccxmlUtility,
                    transition,
                    coordinates
                );
                coordinates.y += elementDistance;
                newEntries.push(...entries);
                newElements.push(element);
                currentLayer.push(target);
            });

            coordinates.y = canvasMiddle.y;
            previousLayer = currentLayer;
        }
    }

    return {
        newElements,
        newRelationShips,
        newRelationShipSegments,
        newEntries
    };
};