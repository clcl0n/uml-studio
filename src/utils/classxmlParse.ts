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
import IBaseElementGraphicData from '@interfaces/class-diagram/common/IBaseElementGraphicData';
import { createNewRelationship } from './elements/relationship';
import ClassDiagramRelationshipTypesEnum from '@enums/classDiagramRelationshipTypesEnum';

export const parseClassDiagram = async (classXML: ICCXML, canvasDimensions: ICoordinates) => {
    const elementsToReturn: Array<IBaseElement<IBaseElementGraphicData<any>>> = [];
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

    const canvasMiddle: ICoordinates = { x: canvasDimensions.x / 2, y: canvasDimensions.x / 2 };
    const coordinates: ICoordinates = { x: canvasMiddle.x, y: canvasMiddle.y };

    const layerDistance = 400;
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

        const diagramAllElementsOrigin = [...diagramClasses, ...diagramDataTypes, ...diagramEnumerations, ...diagramInterfaces, ...diagramObjects, ...diagramPrimitiveTypes, ...diagramUtilities];        
        const diagramAllElements = [...diagramAllElementsOrigin];
        // pociatocni element je element ktory ma najviac transitions
        let initialElement = diagramAllElements.filter(all => !diagramAllElements
            .some(a => getElementTransitions(a.element)
            .some(t => t.$.target === all.element.$.id)))
            .sort((a, b) => {
                return getElementTransitions(a.element).length > getElementTransitions(b.element).length ? -1 : 0;
        })[0];

        initialElement = initialElement ?? diagramAllElements.sort((a, b) => getElementTransitions(a.element).length > getElementTransitions(b.element).length ? -1 : 0)[0];

        diagramAllElements.splice(diagramAllElements.findIndex(e => e.element.$.id === initialElement.element.$.id), 1);
        let currentLayer: Array<{ element: ICCXMLBaseElement, type: ClassDiagramElementsEnum }> = [initialElement];
        let nextLayer: Array<{ element: ICCXMLBaseElement, type: ClassDiagramElementsEnum }> = [];

        // draw element
        while (currentLayer.length > 0) {
            nextLayer = [];
            if (currentLayer.length > 1) {
                const currentLayerHeight = currentLayer.map((e) => {
                    let { element: newElement, entries, target } = addNewElement(e, coordinates);
                    return newElement.graphicData.frame.height;
                }).reduce((p, c) => p + c);
                coordinates.y -= currentLayerHeight / 2;
                console.warn(currentLayerHeight);
            }
            currentLayer.forEach((elementToProcess, index) => {
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
                }
            });
            coordinates.y = canvasMiddle.y;
            coordinates.x += layerDistance;
            currentLayer = nextLayer;
        }

        const offsetStep = 15;
        // draw relationships
        elementsToReturn.forEach(elementsToProcess => {
            const transitions = getElementTransitions((diagramAllElementsOrigin.find(all => all.element.$.id === elementsToProcess.data.elementName).element));
            let offsetUp1 = offsetStep;
            let offsetDown1 = offsetStep;
            let offsetUp2 = offsetStep;
            let offsetDown2 = offsetStep;
            let offsetUp3 = offsetStep;
            let offsetDown3 = offsetStep;
            transitions.forEach(transition => {
                const transitionTail: ICoordinates = { x: 0, y: 0 };
                const transitionHead: ICoordinates = { x: 0, y: 0 };
                const targetElement = elementsToReturn.find(e => e.data.elementName === transition.$.target);
                let currentOffset = 0;
                if (elementsToProcess.graphicData.frame.x < targetElement.graphicData.frame.x) {
                    // targetElement je v nasledujucej vrstve
                    transitionTail.x = elementsToProcess.graphicData.frame.x + elementsToProcess.graphicData.frame.width;
                    transitionHead.x = targetElement.graphicData.frame.x;
                    transitionHead.y = targetElement.graphicData.frame.y;
                    if (elementsToProcess.graphicData.frame.y >= targetElement.graphicData.frame.y) {
                        // nad y urovnou
                        transitionTail.y = elementsToProcess.graphicData.frame.y;
                        offsetUp1 -= offsetStep;
                        currentOffset = offsetUp1;
                    } else {
                        // pod y
                        transitionTail.y = elementsToProcess.graphicData.frame.y + elementsToProcess.graphicData.frame.height;
                        offsetDown1 -= offsetStep;
                        currentOffset = offsetDown1;
                    }
                    transitionHead.x -= calculateHeadOffset(transition.$.relationType.toUpperCase());
                } else if (elementsToProcess.graphicData.frame.x === targetElement.graphicData.frame.x) {
                    // targetElement je v rovnakej vrstve
                    transitionTail.x = elementsToProcess.graphicData.frame.x + elementsToProcess.graphicData.frame.width;
                    transitionHead.x = targetElement.graphicData.frame.x + targetElement.graphicData.frame.width;
                    if (elementsToProcess.graphicData.frame.y >= targetElement.graphicData.frame.y) {
                        // nad y urovnou
                        transitionTail.y = elementsToProcess.graphicData.frame.y + elementsToProcess.graphicData.frame.height;
                        transitionHead.y = targetElement.graphicData.frame.y + targetElement.graphicData.frame.height;
                        offsetUp1 -= offsetStep;
                        currentOffset = offsetUp1;
                    } else {
                        // pod y
                        transitionTail.y = elementsToProcess.graphicData.frame.y;
                        transitionHead.y = targetElement.graphicData.frame.y;
                        offsetDown1 -= offsetStep;
                        currentOffset = offsetDown1;
                    }
                    transitionHead.x += calculateHeadOffset(transition.$.relationType.toUpperCase());
                } else {
                    // targetElement je v predchadzajucej vrstve
                    transitionTail.x = elementsToProcess.graphicData.frame.x;
                    transitionHead.x = targetElement.graphicData.frame.x + targetElement.graphicData.frame.width;
                    transitionHead.y = targetElement.graphicData.frame.y;

                    if (elementsToProcess.graphicData.frame.y >= targetElement.graphicData.frame.y) {
                        // nad y urovnou
                        transitionTail.y = (elementsToProcess.graphicData.frame.height / 3) + elementsToProcess.graphicData.frame.y;
                        offsetUp1 -= offsetStep;
                        currentOffset = offsetUp1;
                    } else {
                        // pod y
                        transitionTail.y = ((elementsToProcess.graphicData.frame.height / 3) * 2) + elementsToProcess.graphicData.frame.y;
                        offsetDown1 -= offsetStep;
                        currentOffset = offsetDown1;
                    }
                    transitionHead.x += calculateHeadOffset(transition.$.relationType.toUpperCase());
                }
                const { relationship, relationshipSegments } = createNewRelationship(
                    transition.$.relationType.toUpperCase() as ClassDiagramRelationshipTypesEnum,
                    {
                        x1: transitionTail.x,
                        y1: transitionTail.y,
                        x2: transitionHead.x,
                        y2: transitionHead.y
                    },
                    elementsToProcess.id,
                    targetElement.id,
                    currentOffset
                );
                newRelationShips.push(relationship);
                newRelationShipSegments.push(...relationshipSegments);
            });
        });
    });

    return {
        newElements: elementsToReturn,
        newEntries: entriesToReturn,
        newRelationShips,
        newRelationShipSegments
    }
}

const calculateHeadOffset = (type: string) => {
    switch (type as ClassDiagramRelationshipTypesEnum) {
        case ClassDiagramRelationshipTypesEnum.AGGREGATION:
        case ClassDiagramRelationshipTypesEnum.COMPOSITION:
            // 30
            return 30; 
        case ClassDiagramRelationshipTypesEnum.EXTENSION:
            // 20
            return 20;
        default:
            return 0;
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