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
import { createNewClassFromCCXML } from './elements/class';
import { createNewUtilityFromCCXML } from './elements/utility';
import IEntry from '@interfaces/class-diagram/common/IEntry';
import { createNewDataTypeFromCCXML } from './elements/dataType';
import { createNewEnumerationFromCCXML } from './elements/enumeration';
import { createNewInterfaceFromCCXML } from './elements/interface';
import { createNewObjectFromCCXML } from './elements/object';
import { createNewPrimitiveTypeFromCCXML } from './elements/primitiveType';
import Direction from '@enums/direction';
import { createNewRelationship } from './elements/relationship';
import ClassDiagramRelationshipTypesEnum from '@enums/classDiagramRelationshipTypesEnum';
import { v4 } from 'uuid';
import SegmentDirection from '@enums/segmentDirection';
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

    const all = [
        ...ccxmlClass,
        ...ccxmlDatatype,
        ...ccxmlEnumeration,
        ...ccxmlInterface,
        ...ccxmlObject,
        ...ccxmlPrimitive,
        ...ccxmlUtility
    ];

    const result = [
        ...filter(ccxmlClass),
        ...filter(ccxmlDatatype),
        ...filter(ccxmlEnumeration),
        ...filter(ccxmlInterface),
        ...filter(ccxmlObject),
        ...filter(ccxmlPrimitive),
        ...filter(ccxmlUtility)
    ];

    const depending = result.filter(ccxmlElement => all.some(e => e.transitions?.[0].transition?.some(t => t.$.target === ccxmlElement.$.id)));
    return {
        alone: result.filter(e => !depending.some(de => de.$.id === e.$.id)),
        depending
    };
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
    const { newElements, newEntries, newRelationShipSegments, newRelationShips } = await parse(ccxml, canvasDimensions);
    // const newElements: Array<IBaseElement<any>> = [];
    // const newEntries: Array<IEntry> = [];
    // const newRelationShips: Array<IRelationship> = [];
    // const newRelationShipSegments: Array<IRelationshipSegment> = [];
    // const ccxmlExistingElements: Array<string> = [];

    // const canvasMiddle: ICoordinates = { x: canvasDimensions.x / 2, y: canvasDimensions.y / 2 };
    // const coordinates: ICoordinates = { x: canvasMiddle.x, y: canvasMiddle.y };

    // const layerDistance = 300;
    // const elementDistance = 120;

    // const { isValid, warning, error } = isCCXMLValid(ccxml);

    // if (ccxml && isValid && !ccxml.$.coordinates) {
    //     const ccxmlClass = ccxml.classes?.[0].class ?? [];
    //     const ccxmlDatatype = ccxml.dataTypes?.[0].dataType ?? [];
    //     const ccxmlEnumeration = ccxml.enumerations?.[0].enumeration ?? [];
    //     const ccxmlInterface = ccxml.interfaces?.[0].interface ?? [];
    //     const ccxmlObject = ccxml.objects?.[0].object ?? [];
    //     const ccxmlPrimitive = ccxml.primitives?.[0].primitive ?? [];
    //     const ccxmlUtility = ccxml.utilities?.[0].utility ?? [];

    //     let toAdd = elementsToAdd(
    //         ccxmlClass,
    //         ccxmlDatatype,
    //         ccxmlEnumeration,
    //         ccxmlInterface,
    //         ccxmlObject,
    //         ccxmlPrimitive,
    //         ccxmlUtility,
    //         ccxmlExistingElements
    //     );

    //     const initialElement = ccxml.$.initialclass ? toAdd.depending.find((e) => e.$.id === ccxml.$.initialclass) : toAdd.depending[0];
    //     const {element, entries} = createTargetedElement(
    //         ccxmlClass,
    //         ccxmlDatatype,
    //         ccxmlEnumeration,
    //         ccxmlInterface,
    //         ccxmlObject,
    //         ccxmlPrimitive,
    //         ccxmlUtility,
    //         {
    //             $: {
    //                 head: '',
    //                 tail: '',
    //                 value: '',
    //                 headCoord: '',
    //                 tailCoord: '',
    //                 target: initialElement.$.id,
    //                 segments: '',
    //                 direction: '',
    //                 type: ''
    //             }
    //         },
    //         coordinates
    //     );
    //     newElements.push(element);
    //     newEntries.push(...entries);
    //     ccxmlExistingElements.push(initialElement.$.id);
    //     toAdd = elementsToAdd(
    //         ccxmlClass,
    //         ccxmlDatatype,
    //         ccxmlEnumeration,
    //         ccxmlInterface,
    //         ccxmlObject,
    //         ccxmlPrimitive,
    //         ccxmlUtility,
    //         ccxmlExistingElements
    //     );
    //     const existingAlone: Array<string> = [];
    //     let previousLayer: Array<ICCXMLBaseElement> = [initialElement];
    //     let currentLayer: Array<ICCXMLBaseElement> = [];
    //     while (toAdd.depending.length > 0) {
    //         currentLayer = [];
    //         coordinates.x += layerDistance;
    //         let transitions: Array<ICCXMLTransition> = [];
    //         let transitionToAdd: Array<{
    //             transition: ICCXMLTransition,
    //             from: string;
    //         }> = [];

    //         previousLayer.forEach((ccxmlElement) => {
    //             if (ccxmlElement.transitions && ccxmlElement.transitions[0].transition.length > 0) {
    //                 const transitionDependentElements = ccxmlElement.transitions[0].transition.filter((transition) => toAdd.depending.findIndex((t) => t.$.id === transition.$.target) !== -1);
    //                 transitions.push(...transitionDependentElements);
    //                 transitionToAdd.push(
    //                     ...ccxmlElement.transitions[0].transition.map((t) => {
    //                         return {
    //                             transition: t,
    //                             from: ccxmlElement.$.id
    //                         };
    //                     })
    //                 );
    //                 ccxmlExistingElements.push(...transitionDependentElements.map((t) => t.$.target));
    //                 toAdd = elementsToAdd(
    //                     ccxmlClass,
    //                     ccxmlDatatype,
    //                     ccxmlEnumeration,
    //                     ccxmlInterface,
    //                     ccxmlObject,
    //                     ccxmlPrimitive,
    //                     ccxmlUtility,
    //                     ccxmlExistingElements
    //                 );
    //             }
    //         });
            
    //         if (transitions.length % 2 === 0) {
    //             coordinates.y -= elementDistance * (transitions.length / 2);
    //         } else if (transitions.length > 1) {
    //             coordinates.y -= elementDistance * ((transitions.length - 1) / 2);
    //         }

    //         transitions.forEach((transition) => {
    //             const {element, target, entries} = createTargetedElement(
    //                 ccxmlClass,
    //                 ccxmlDatatype,
    //                 ccxmlEnumeration,
    //                 ccxmlInterface,
    //                 ccxmlObject,
    //                 ccxmlPrimitive,
    //                 ccxmlUtility,
    //                 transition,
    //                 coordinates
    //             );
    //             coordinates.y += elementDistance;
    //             const alone = toAdd.alone.find(e => e.transitions?.[0].transition?.some(t => t.$.target === element.data.elementName));
    //             newEntries.push(...entries);
    //             newElements.push(element);
    //             currentLayer.push(target);
    //             if (alone && !existingAlone.includes(alone.$.id)) {
    //                 existingAlone.push(alone.$.id);
    //                 const {element: e, target: t, entries: en} = createTargetedElement(
    //                     ccxmlClass,
    //                     ccxmlDatatype,
    //                     ccxmlEnumeration,
    //                     ccxmlInterface,
    //                     ccxmlObject,
    //                     ccxmlPrimitive,
    //                     ccxmlUtility,
    //                     {
    //                         $: {
    //                             head: '',
    //                             tail: '',
    //                             target: alone.$.id,
    //                             type: '',
    //                             value: ''
    //                         }
    //                     },
    //                     coordinates
    //                 );
    //                 coordinates.y += elementDistance;
    //                 newEntries.push(...en);
    //                 newElements.push(e);
    //                 currentLayer.push(t);
    //             }
    //         });

    //         coordinates.y = canvasMiddle.y;
    //         previousLayer = currentLayer;
    //     }

    //     toAdd = elementsToAdd(
    //         ccxmlClass,
    //         ccxmlDatatype,
    //         ccxmlEnumeration,
    //         ccxmlInterface,
    //         ccxmlObject,
    //         ccxmlPrimitive,
    //         ccxmlUtility,
    //         []
    //     );
        
    //     const allElements = [
    //         ...toAdd.depending.map((a) => {
    //             return {
    //                 name: a.$.id,
    //                 upOffset: 0,
    //                 downOffset: 0,
    //                 transition: a.transitions[0].transition
    //             };
    //         }),
    //         ...toAdd.alone.map(a => {
    //             return {
    //                 name: a.$.id,
    //                 upOffset: 0,
    //                 downOffset: 0,
    //                 transition: a.transitions[0].transition
    //             };
    //         })
    //     ];
    //     allElements.forEach((ccxmlElement) => {
    //         let relationshipCenterOffsetUp = 0;
    //         let relationshipCenterOffsetDown = 0;
    //         let offsetRelation = 0;
    //         const fromElement = newElements.find((newElement) => newElement.data.elementName === ccxmlElement.name);
    //         const { graphicData } = fromElement;
    //         const ccxmlTransitions = ccxmlElement.transition;
    //         const out_1: ICoordinates = {
    //             x: graphicData.frame.x + graphicData.frame.width,
    //             y: graphicData.frame.y
    //         };
    //         const out_2: ICoordinates = {
    //             x: graphicData.frame.x + graphicData.frame.width,
    //             y: graphicData.frame.y + graphicData.frame.height
    //         };

    //         if (ccxmlTransitions?.length > 0) {
    //             ccxmlTransitions.forEach((ccxmlTransition) => {
    //                 let toStateElementPosition: Direction;
    //                 let toStateElementPositionY: Direction;
    //                 let toStateX = 0;
    //                 let fromStateX = 0;
    //                 let offsetJoin = 0;
    //                 const toElement = newElements.find((newElement) => newElement.data.elementName === ccxmlTransition.$.target);
    //                 toStateX = toElement.graphicData.frame.x;
    //                 fromStateX = fromElement.graphicData.frame.x;
    //                 toStateElementPositionY = fromElement.graphicData.frame.y >= toElement.graphicData.frame.y ? Direction.UP : Direction.DOWN;
    //                 toStateElementPosition = fromElement.graphicData.frame.x > toElement.graphicData.frame.x ? Direction.LEFT : Direction.RIGHT;

    //                 if (toStateElementPositionY === Direction.UP) {
    //                     if (toStateElementPosition === Direction.RIGHT) {
    //                         if (relationshipCenterOffsetUp > -80) {
    //                             relationshipCenterOffsetUp -= 15;
    //                         }
    //                         offsetRelation = relationshipCenterOffsetUp;
    //                     } else {
    //                         let t = allElements.find((s) => s.name === ccxmlTransition.$.target);
    //                         if (t.upOffset < 80) {
    //                             t.upOffset += 15;
    //                         }
    //                         offsetRelation = t.upOffset;
    //                     }
    //                 } else {
    //                     if (toStateElementPosition === Direction.RIGHT) {
    //                         if (relationshipCenterOffsetDown > -80) {
    //                             relationshipCenterOffsetDown -= 15;
    //                         }
    //                         offsetRelation = relationshipCenterOffsetDown;
    //                     } else {
    //                         let t = allElements.find((s) => s.name === ccxmlTransition.$.target);
    //                         if (t.downOffset < 80) {
    //                             t.downOffset += 15;
    //                         }
    //                         offsetRelation = t.downOffset;
    //                     }
    //                 }
    //                 const fromSegmentOffsets = (fromElement.graphicData.frame.height / 3);
    //                 const snapPoint: ICoordinates = {
    //                     x: toElement.graphicData.frame.x,
    //                     y: fromElement.graphicData.frame.y + (fromElement.graphicData.frame.height / 3)
    //                 };
    //                 const snapPoint2: ICoordinates = {
    //                     x: toElement.graphicData.frame.x,
    //                     y: fromElement.graphicData.frame.y + ((fromElement.graphicData.frame.height / 3) * 2)
    //                 };

    //                 // TODO:
    //                 offsetJoin = toElement.graphicData.frame.height / 3;
    //                 snapPoint.y = toElement.graphicData.frame.y;

    //                 if (toStateX === fromStateX) {
    //                     const { relationship, relationshipSegments } = createNewRelationship(
    //                         ClassDiagramRelationshipTypesEnum.ASSOCIATION,
    //                         {
    //                             x1: toStateElementPosition === Direction.LEFT ? graphicData.frame.x : out_1.x,
    //                             y1: toStateElementPosition === Direction.LEFT ? out_1.y : 
    //                                 toStateElementPositionY === Direction.UP ? out_1.y : out_2.y,
    //                             x2: toStateX + toElement.graphicData.frame.width,
    //                             y2: toStateElementPositionY === Direction.UP ? snapPoint.y + (offsetJoin * 3) : snapPoint.y
    //                         },
    //                         fromElement.id,
    //                         toElement.id,
    //                         20
    //                     );
    //                     newRelationShips.push(relationship);
    //                     newRelationShipSegments.push(...relationshipSegments);
    //                 } else {
    //                     const { relationship, relationshipSegments } = createNewRelationship(
    //                         ClassDiagramRelationshipTypesEnum.ASSOCIATION,
    //                         {
    //                             x1: toStateElementPosition === Direction.LEFT ? graphicData.frame.x : out_1.x,
    //                             y1: toStateElementPosition === Direction.LEFT ? 
    //                                 toStateElementPositionY === Direction.UP ? graphicData.frame.y + fromSegmentOffsets : graphicData.frame.y + (fromSegmentOffsets * 2)
    //                                 : toStateElementPositionY === Direction.UP ? out_1.y : out_2.y,
    //                             x2: toStateElementPosition === Direction.LEFT ? toStateX + toElement.graphicData.frame.width : snapPoint.x,
    //                             y2: toStateElementPosition === Direction.LEFT ?
    //                                 toStateElementPositionY === Direction.UP ? snapPoint.y + (offsetJoin * 2) : snapPoint.y + offsetJoin
    //                                 : snapPoint.y
    //                         },
    //                         fromElement.id,
    //                         toElement.id,
    //                         offsetRelation,
    //                         ccxmlTransition.$.value
    //                     );
    //                     newRelationShips.push(relationship);
    //                     newRelationShipSegments.push(...relationshipSegments);
    //                 }
    //             }); 
    //         }
    //     });
    // } else if (ccxml.$.coordinates === 'true') {
    //     ccxml?.classes[0]?.class.forEach(c => {
    //         const { entries, newClass } = createNewClassFromCCXML({ x: Number.parseFloat(c.$.x), y: Number.parseFloat(c.$.y) }, c);
    //             newElements.push(newClass);
    //             newEntries.push(...entries);
    //     });

    //     ccxml?.dataTypes[0]?.dataType.forEach(c => {
    //             const { entries, newDataType } = createNewDataTypeFromCCXML({ x: Number.parseFloat(c.$.x), y: Number.parseFloat(c.$.y) }, c);
    //             newElements.push(newDataType);
    //             newEntries.push(...entries);
    //     });

    //     ccxml?.enumerations[0]?.enumeration.forEach(c => {
    //             const { entries, newEnumeration } = createNewEnumerationFromCCXML({ x: Number.parseFloat(c.$.x), y: Number.parseFloat(c.$.y) }, c);
    //             newElements.push(newEnumeration);
    //             newEntries.push(...entries);
    //     });

    //     ccxml?.interfaces[0]?.interface.forEach(c => {
    //             const { entries, newInterface } = createNewInterfaceFromCCXML({ x: Number.parseFloat(c.$.x), y: Number.parseFloat(c.$.y) }, c);
    //             newElements.push(newInterface);
    //             newEntries.push(...entries);
    //     });

    //     ccxml?.objects[0]?.object.forEach(c => {
    //             const { entries, newObject } = createNewObjectFromCCXML({ x: Number.parseFloat(c.$.x), y: Number.parseFloat(c.$.y) }, c);
    //             newElements.push(newObject);
    //             newEntries.push(...entries);
    //     });

    //     ccxml?.primitives[0]?.primitive.forEach(c => {
    //             const { newPrimitiveType } = createNewPrimitiveTypeFromCCXML({ x: Number.parseFloat(c.$.x), y: Number.parseFloat(c.$.y) }, c);
    //             newElements.push(newPrimitiveType);
    //     });

    //     ccxml?.utilities[0]?.utility.forEach(c => {
    //             const { entries, newUtility } = createNewUtilityFromCCXML({ x: Number.parseFloat(c.$.x), y: Number.parseFloat(c.$.y) }, c);
    //             newElements.push(newUtility);
    //             newEntries.push(...entries);
    //     });

    //     const createRelationships = (element: ICCXMLBaseElement) => {
    //         element?.transitions[0]?.transition.forEach(t => {
    //             const fromElement = newElements.find(e => e.data.elementName === element.$.id);
    //             const toElement = newElements.find(e => e.data.elementName === t.$.target);
    //             const relationshipId = v4();
    //             const headCoord: ICoordinates = { x: Number.parseFloat(t.$.headCoord.split(':')[0]), y: Number.parseFloat(t.$.headCoord.split(':')[1]) }; 
    //             const tailCoord: ICoordinates = { x: Number.parseFloat(t.$.tailCoord.split(':')[0]), y: Number.parseFloat(t.$.tailCoord.split(':')[1]) };
    //             const relationshipSegmentIds: Array<string> = [];
                
    //             const segments = t.$.segments.split(';');

    //             segments.forEach((segment) => {
    //                 const segmentSplit = segment.split(':');
    //                 const x = Number.parseFloat(segmentSplit[0]);
    //                 const y = Number.parseFloat(segmentSplit[1]);
    //                 const lineToX = Number.parseFloat(segmentSplit[2]);
    //                 const lineToY = Number.parseFloat(segmentSplit[3]);
    //                 const isStart = segmentSplit[4] === 'true';
    //                 const isEnd = segmentSplit[5] === 'true';
    //                 const direction = segmentSplit[6].toUpperCase() as SegmentDirection;
    //                 const newId = segmentSplit[7];
    //                 const fromElementId = segmentSplit[8];
    //                 const toElementId = segmentSplit[9];
    //                 newRelationShipSegments.push({
    //                     id: newId,
    //                     x,
    //                     y,
    //                     lineToX,
    //                     lineToY,
    //                     isEnd,
    //                     isStart,
    //                     direction,
    //                     relationshipId,
    //                     fromSegmentId: fromElementId,
    //                     toSegmentId: toElementId
    //                 });
    //                 relationshipSegmentIds.push(newId);
    //             });


    //             newRelationShips.push({
    //                 id: relationshipId,
    //                 fromElementId: fromElement.id,
    //                 toElementId: toElement.id,
    //                 direction: t.$.direction.toUpperCase() as Direction,
    //                 headValue: t.$.head,
    //                 tailValue: t.$.tail,
    //                 relationshipValue: t.$.value,
    //                 segmentIds: relationshipSegmentIds,
    //                 type: t.$.type.toUpperCase() as ClassDiagramRelationshipTypesEnum,
    //                 head: headCoord,
    //                 tail: tailCoord
    //             });
    //         });
    //     };

    //     ccxml?.classes[0]?.class.forEach(c => createRelationships(c));
    //     ccxml?.dataTypes[0]?.dataType.forEach(c => createRelationships(c));
    //     ccxml?.enumerations[0]?.enumeration.forEach(c => createRelationships(c));
    //     ccxml?.interfaces[0]?.interface.forEach(c => createRelationships(c));
    //     ccxml?.objects[0]?.object.forEach(c => createRelationships(c));
    //     ccxml?.primitives[0]?.primitive.forEach(c => createRelationships(c));
    //     ccxml?.utilities[0]?.utility.forEach(c => createRelationships(c));
    // }


    return {
        newElements,
        newRelationShips,
        newRelationShipSegments,
        newEntries
    };
};