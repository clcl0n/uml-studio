import ICCXML from '@interfaces/ccxml/ICCXML';
import ICoordinates from '@interfaces/ICoordinates';
import ICCXMLClass from '@interfaces/ccxml/ICCXMLClass';
import ICCXMLDataType from '@interfaces/ccxml/ICCXMLDataType';
import ICCXMLEnumeration from '@interfaces/ccxml/ICCXMLEnumeration';
import ICCXMLInterface from '@interfaces/ccxml/ICCXMLInterface';
import ICCXMLObject from '@interfaces/ccxml/ICCXMLObject';
import ICCXMLPrimitive from '@interfaces/ccxml/ICCXMLPrimitive';
import ICCXMLUtility from '@interfaces/ccxml/ICCXMLUtility';
import ICCXMLBaseElement from '@interfaces/ccxml/ICCXMLBaseElement';
import { createNewClassFromCCXML } from './elements/class';
import { createNewUtilityFromCCXML } from './elements/utility';
import { createNewDataTypeFromCCXML } from './elements/dataType';
import { createNewEnumerationFromCCXML } from './elements/enumeration';
import { createNewInterfaceFromCCXML } from './elements/interface';
import { createNewObjectFromCCXML } from './elements/object';
import { createNewPrimitiveTypeFromCCXML } from './elements/primitiveType';
import IBaseElement from '@interfaces/class-diagram/common/IBaseElement';
import IEntry from '@interfaces/class-diagram/common/IEntry';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';

export const parseClassDiagram = async (classXML: ICCXML, canvasDimensions: ICoordinates) => {
    const elementsToReturn: Array<IBaseElement<any>> = [];
    const entriesToReturn: Array<IEntry> = [];
    const newRelationShips: Array<IRelationship> = [];
    const newRelationShipSegments: Array<IRelationshipSegment> = [];
    
    const classes = classXML.classes?.[0]?.class ?? [];
    const dataTypes = classXML.dataTypes?.[0]?.dataType ?? [];
    const enumerations = classXML.enumerations?.[0]?.enumeration ?? [];
    const interfaces = classXML.interfaces?.[0]?.interface ?? [];
    const objects = classXML.objects?.[0]?.object ?? [];
    const primitiveTypes = classXML.primitives?.[0]?.primitive ?? [];
    const utilities = classXML.utilities?.[0]?.utility ?? [];

    const allElements: Array<ICCXMLBaseElement> = [...classes, ...dataTypes, ...enumerations, ...interfaces, ...objects, ...primitiveTypes, ...utilities];

    const canvasMiddle: ICoordinates = { x: canvasDimensions.x / 2, y: canvasDimensions.y / 2 };
    const coordinates: ICoordinates = { x: canvasMiddle.x, y: canvasMiddle.y };

    const layerDistance = 200;
    const elementsDistance = 50;

    const { diagrams } = analizeClassDiagram([...allElements]);

    diagrams.sort((a, b) => a.length > b.length ? -1 : 0).forEach(diagram => {
        const diagramClasses: Array<{ element: ICCXMLClass, type: ClassDiagramElementsEnum }> = [];
        const diagramDataTypes: Array<{ element: ICCXMLDataType, type: ClassDiagramElementsEnum }> = [];
        const diagramEnumerations: Array<{ element: ICCXMLEnumeration, type: ClassDiagramElementsEnum }> = [];
        const diagramInterfaces: Array<{ element: ICCXMLInterface, type: ClassDiagramElementsEnum }> = [];
        const diagramObjects: Array<{ element: ICCXMLObject, type: ClassDiagramElementsEnum }> = [];
        const diagramPrimitiveTypes: Array<{ element: ICCXMLPrimitive, type: ClassDiagramElementsEnum }> = [];
        const diagramUtilities: Array<{ element: ICCXMLUtility, type: ClassDiagramElementsEnum }> = [];

        diagram.forEach(elementId => {
            if (classes.some(c => c.$.id === elementId)) {
                diagramClasses.push({ 
                    element: allElements.find(all => all.$.id === elementId) as ICCXMLClass,
                    type: ClassDiagramElementsEnum.CLASS
                });
            } else if (dataTypes.some(c => c.$.id === elementId)) {
                diagramDataTypes.push({
                    element: allElements.find(all => all.$.id === elementId) as ICCXMLDataType,
                    type: ClassDiagramElementsEnum.DATA_TYPE
                });
            } else if (enumerations.some(c => c.$.id === elementId)) {
                diagramEnumerations.push({
                    element: allElements.find(all => all.$.id === elementId) as ICCXMLEnumeration,
                    type: ClassDiagramElementsEnum.ENUMERATION
                });
            } else if (interfaces.some(c => c.$.id === elementId)) {
                diagramInterfaces.push({
                    element: allElements.find(all => all.$.id === elementId) as ICCXMLInterface,
                    type: ClassDiagramElementsEnum.INTERFACE
                });
            } else if (objects.some(c => c.$.id === elementId)) {
                diagramObjects.push({
                    element: allElements.find(all => all.$.id === elementId) as ICCXMLObject,
                    type: ClassDiagramElementsEnum.OBJECT
                });
            } else if (primitiveTypes.some(c => c.$.id === elementId)) {
                diagramPrimitiveTypes.push({
                    element: allElements.find(all => all.$.id === elementId) as ICCXMLPrimitive,
                    type: ClassDiagramElementsEnum.PRIMITIVE_TYPE
                });
            } else if (utilities.some(c => c.$.id === elementId)) {
                diagramUtilities.push({
                    element: allElements.find(all => all.$.id === elementId) as ICCXMLUtility,
                    type: ClassDiagramElementsEnum.UTILITY
                });
            }
        });

        const diagramAllElements = [...diagramClasses, ...diagramDataTypes, ...diagramEnumerations, ...diagramInterfaces, ...diagramObjects, ...diagramPrimitiveTypes, ...diagramUtilities];

        

        // pociatocni element je element ktory ma najviac transitions
        const initialElement = diagramAllElements.filter(all => !diagramAllElements
            .some(a => getElementTransitions(a.element)
            .some(t => t.$.target === all.element.$.id)))
            .sort((a, b) => {
                return getElementTransitions(a.element).length > getElementTransitions(b.element).length ? -1 : 0;
        })[0];
        diagramAllElements.splice(diagramAllElements.findIndex(e => e.element.$.id === initialElement.element.$.id), 1);
        let currentLayer: Array<{ element: ICCXMLBaseElement, type: ClassDiagramElementsEnum }> = [initialElement];
        let nextLayer: Array<{ element: ICCXMLBaseElement, type: ClassDiagramElementsEnum }> = [];

        while (currentLayer.length > 0) {
            nextLayer = [];
            currentLayer.forEach(elementToProcess => {
                let { element: newElement, entries, target } = addNewElement(elementToProcess, coordinates);
                elementsToReturn.push(newElement);
                entriesToReturn.push(...entries);
                coordinates.y += elementsDistance + newElement.graphicData.frame.height;
                if (elementHasTransitions(elementToProcess.element)) {
                    // este nevykreslene elementy
                    const elementIdsToAdd = getElementTransitions(elementToProcess.element).filter(t => !elementsToReturn.some(e => e.id === t.$.target)).map(t => t.$.target);
                    // element ma transitions do ineho elementu ale moze sa stat ze aj iny element ide do akurat zvoleneho elementu
                    elementIdsToAdd.push(...diagramAllElements.filter(e => getElementTransitions(e.element).some(t => t.$.target === elementToProcess.element.$.id)).map(r => r.element.$.id));
                    if (elementIdsToAdd.length > 0) {
                        const dependetElements = diagramAllElements.filter(e => elementIdsToAdd.some(id => id === e.element.$.id));
                        dependetElements.forEach(de => {
                            diagramAllElements.splice(diagramAllElements.findIndex(e => e.element.$.id === de.element.$.id), 1);
                            if (!nextLayer.some(nl => nl.element.$.id === de.element.$.id)) {
                                nextLayer.push(de);
                            }
                        });
                    }
                } else {
                    // ???
                }
            });
            coordinates.y = canvasMiddle.y;
            coordinates.x += layerDistance;
            currentLayer = nextLayer;
        }
    });

    return {
        newElements: elementsToReturn,
        newEntries: entriesToReturn,
        newRelationShips,
        newRelationShipSegments
    }
}

const addNewElement = (
    elementToAdd: { element: ICCXMLBaseElement, type: ClassDiagramElementsEnum },
    coordinates: ICoordinates
) => {
    let element;
    switch (elementToAdd.type) {
        case ClassDiagramElementsEnum.CLASS:
            element = elementToAdd.element as ICCXMLClass;
            element.methods = element.methods?.[0]?.method ? element.methods : [];
            element.properties = element.properties?.[0]?.property ? element.properties : [];
            const { entries: classEntries, newClass } = createNewClassFromCCXML(coordinates, element);
            return {
                target: elementToAdd.element,
                element: newClass,
                entries: classEntries
            };
        case ClassDiagramElementsEnum.DATA_TYPE:
            element = elementToAdd.element as ICCXMLDataType;
            element.entries = element.entries?.[0]?.entry ? element.entries : [];
            const { newDataType, entries: dataTypeEntries } = createNewDataTypeFromCCXML(coordinates, element);
            return {
                target: elementToAdd.element,
                element: newDataType,
                entries: dataTypeEntries
            };
            case ClassDiagramElementsEnum.ENUMERATION:
                element = elementToAdd.element as ICCXMLEnumeration;
                element.entries = element.entries?.[0]?.entry ? element.entries : [];
                const { entries: enumerationEntries, newEnumeration } = createNewEnumerationFromCCXML(coordinates, element);
                return {
                    target: elementToAdd.element,
                    element: newEnumeration,
                entries: enumerationEntries
            };
            case ClassDiagramElementsEnum.INTERFACE:
                element = elementToAdd.element as ICCXMLInterface;
                element.methods = element.methods?.[0]?.method ? element.methods : [];
                element.properties = element.properties?.[0]?.property ? element.properties : [];
                const { newInterface, entries: interfaceEntries } = createNewInterfaceFromCCXML(coordinates, element);
                return {
                    target: elementToAdd.element,
                    element: newInterface,
                    entries: interfaceEntries
                };
        case ClassDiagramElementsEnum.OBJECT:
            element = elementToAdd.element as ICCXMLObject;
            element.slots = element.slots?.[0]?.slot ? element.slots : [];
            const { newObject, entries: objectEntries } = createNewObjectFromCCXML(coordinates, element);
            return {
                target: elementToAdd.element,
                element: newObject,
                entries: objectEntries
            };
        case ClassDiagramElementsEnum.PRIMITIVE_TYPE:
            element = elementToAdd.element as ICCXMLPrimitive;
            const { newPrimitiveType } = createNewPrimitiveTypeFromCCXML(coordinates, element);
            return {
                target: elementToAdd.element,
                element: newPrimitiveType,
                entries: [] as any
            };
        case ClassDiagramElementsEnum.UTILITY:
            element = elementToAdd.element as ICCXMLUtility;
            element.methods = element.methods?.[0]?.method ? element.methods : [];
            element.properties = element.properties?.[0]?.property ? element.properties : [];
            const { newUtility, entries: utilityEntries } = createNewUtilityFromCCXML(coordinates, element);
            return {
                target: elementToAdd.element,
                element: newUtility,
                entries: utilityEntries
            };
    }
};

const analizeClassDiagram = (
   allElements: Array<ICCXMLBaseElement>
) => {
    const diagrams: Array<Array<string>> = [];
    
    while (allElements.length > 0) {
        const diagram: Array<string> = [];
        let toProcess: Array<ICCXMLBaseElement> = [allElements.pop()];
        while (toProcess.length !== 0) {
            let nextToProcess: Array<ICCXMLBaseElement> = [];
            toProcess.forEach(elementToProcess => {
                diagram.push(elementToProcess.$.id);
                if (elementHasTransitions(elementToProcess)) {
                    // este nepridane elementy
                    const elementIdsToAdd = getElementTransitions(elementToProcess).filter(t => !diagram.some(id => id === t.$.target)).map(t => t.$.target);
                    // element ma transitions do ineho elementu ale moze sa stat ze aj iny element ide do akurat zvoleneho elementu
                    elementIdsToAdd.push(...allElements.filter(e => getElementTransitions(e).some(t => t.$.target === elementToProcess.$.id)).map(r => r.$.id));
                    if (elementIdsToAdd.length > 0) {
                        const dependetElements = allElements.filter(e => elementIdsToAdd.some(id => id === e.$.id));
                        dependetElements.forEach(de => {
                            allElements.splice(allElements.findIndex(e => e.$.id === de.$.id), 1);
                            if (!nextToProcess.some(ntp => ntp.$.id === de.$.id)) {
                                nextToProcess.push(de);
                            }
                        });
                    }
                } else {
                    // nema transitions pozrieme co ma do neho transitions
                    const dependetElements = allElements.filter(e => getElementTransitions(e).some(t => t.$.target === elementToProcess.$.id));
                    dependetElements.forEach(de => {
                        allElements.splice(allElements.findIndex(e => e.$.id === de.$.id), 1);
                        if (!nextToProcess.some(ntp => ntp.$.id === de.$.id)) {
                            nextToProcess.push(de);
                        }
                    });
                }
            });
            toProcess = nextToProcess;
        }
        diagrams.push(diagram);
    }


    return {
        diagrams
    };
}

const elementHasTransitions = (element: ICCXMLBaseElement) => {
    return (element.transitions?.[0]?.transition ?? []).length > 0;
};

const getElementTransitions = (element: ICCXMLBaseElement) => {
    return element.transitions?.[0]?.transition ?? [];
};