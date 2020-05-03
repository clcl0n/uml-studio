import IClassDiagramState from '@interfaces/class-diagram/IClassDiagramState';
import ICCXML from '@interfaces/ccxml/ICCXML';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IBaseElement from '@interfaces/class-diagram/common/IBaseElement';
import EntryTypeEnum from '@enums/EntryTypeEnum';
import ICCXMLClass from '@interfaces/ccxml/ICCXMLClass';
import ICCXMLMethod from '@interfaces/ccxml/ICCXMLMethod';
import IEntry from '@interfaces/class-diagram/common/IEntry';
import ICCXMLProperty from '@interfaces/ccxml/ICCXMLProperty';
import ICCXMLTransition from '@interfaces/ccxml/ICCXMLTransition';
import { Builder } from 'xml2js';
import ICCXMLDataType from '@interfaces/ccxml/ICCXMLDataType';
import ICCXMLEntry from '@interfaces/ccxml/ICCXMLEntry';
import ICCXMLEnumeration from '@interfaces/ccxml/ICCXMLEnumeration';
import ICCXMLInterface from '@interfaces/ccxml/ICCXMLInterface';
import ICCXMLObject from '@interfaces/ccxml/ICCXMLObject';
import ICCXMLSlot from '@interfaces/ccxml/ICCXMLSlot';
import ICCXMLPrimitive from '@interfaces/ccxml/ICCXMLPrimitive';
import ICCXMLUtility from '@interfaces/ccxml/ICCXMLUtility';

const getElementEntries = (classDiagram: IClassDiagramState, element: IBaseElement<any>) => {
    return element.data.entryIds.map((id) => classDiagram.elementEntries.byId[id]);
};

const getElementsByType = (classDiagram: IClassDiagramState, elementType: ClassDiagramElementsEnum) => {
    return classDiagram.elements.allIds.filter((id) => classDiagram.elements.byId[id].type === elementType).map((id) => classDiagram.elements.byId[id]);
};

const convertEntriesToCCXMLSlot = (entries: Array<IEntry>) => {
    return entries.filter((entry) => entry.type === EntryTypeEnum.SLOT).map((entry): ICCXMLSlot => {
        return {
            $: {
                feature: entry.featureName,
                value: entry.value
            }
        };
    });
};

const convertEntriesToCCXMLEntries = (entries: Array<IEntry>) => {
    return entries.filter((entry) => entry.type === EntryTypeEnum.BASE).map((entry): ICCXMLEntry => {
        return {
            $: {
                value: entry.value
            }
        };
    });
};

const convertEntriesToCCXMLProperties = (entries: Array<IEntry>) => {
    return entries.filter((entry) => entry.type === EntryTypeEnum.PROPERTY).map((entry): ICCXMLProperty => {
        return {
            $: {
                accessModifier: entry.accessModifier.toLowerCase(),
                name: entry.value.split(': ')[0],
                dataType: entry.value.split(': ')[1]
            }
        };
    });
};

const convertEntriesToCCXMLMethods = (entries: Array<IEntry>) => {
    return entries.filter((entry) => entry.type === EntryTypeEnum.METHOD).map((entry): ICCXMLMethod => {
        return {
            $: {
                accessModifier: entry.accessModifier.toLowerCase(),
                name: entry.value.split(': ')[0],
                dataType: entry.value.split(': ')[1]
            }
        };
    });
};

const getElementName = (classDiagram: IClassDiagramState, elementId: string) => {
    return classDiagram.elements.byId[elementId].data.elementName;
};

const getElementsTransitions = (classDiagram: IClassDiagramState, element: IBaseElement<any>): Array<ICCXMLTransition> => {
    return classDiagram.relationships.allIds
        .filter((id) => classDiagram.relationships.byId[id].fromElementId === element.id)
        .map((id) => classDiagram.relationships.byId[id])
        .map((relationship): ICCXMLTransition => {
            const segmentsCoord = relationship.segmentIds.map((segmentId) => {
                const segment = classDiagram.relationshipSegments.byId[segmentId];

                return `${segment.x}:${segment.y}:${segment.lineToX}:${segment.lineToY}:${segment.isStart}:${segment.isEnd}:${segment.direction.toLowerCase()}:${segment.id}:${segment.fromSegmentId}:${segment.toSegmentId}`;
            });


            return {
                $: {
                    multiplicity: relationship.headValue,
                    tail: relationship.tailValue,
                    target: getElementName(classDiagram, relationship.toElementId),
                    headCoord: `${relationship.head.x}:${relationship.head.y}`,
                    tailCoord: `${relationship.tail.x}:${relationship.tail.y}`,
                    segments: segmentsCoord.join(';'),
                    value: relationship.relationshipValue,
                    direction: relationship.direction.toLowerCase(),
                    relationType: relationship.type.toLowerCase()
                }
            };
        });
}; 

export const serializeCCXML = (classDiagram: IClassDiagramState) => {
    const ccxmlClasses: Array<ICCXMLClass> = getElementsByType(classDiagram, ClassDiagramElementsEnum.CLASS).map((classElement): ICCXMLClass  => {
        const entries = getElementEntries(classDiagram, classElement);
        
        return {
            $: {
                id: classElement.data.elementName,
                x: classElement.graphicData.frame.xCenter,
                y: classElement.graphicData.frame.yCenter
            },
            methods: [
                {
                    method: convertEntriesToCCXMLMethods(entries)
                }
            ],
            properties: [
                {
                    property: convertEntriesToCCXMLProperties(entries)
                }
            ],
            transitions: [
                {
                    transition: getElementsTransitions(classDiagram, classElement)
                }
            ]
        };
    });

    const ccxmlDataType: Array<ICCXMLDataType> = getElementsByType(classDiagram, ClassDiagramElementsEnum.DATA_TYPE).map((dataTypeElement): ICCXMLDataType => {
        const entries = getElementEntries(classDiagram, dataTypeElement);

        return {
            $: {
                id: dataTypeElement.data.elementName,
                x: dataTypeElement.graphicData.frame.xCenter,
                y: dataTypeElement.graphicData.frame.yCenter
            },
            entries: [
                {
                   entry: convertEntriesToCCXMLEntries(entries) 
                }
            ],
            transitions: [
                {
                    transition: getElementsTransitions(classDiagram, dataTypeElement)
                }
            ]
        }; 
    });

    const ccxmlEnumeration: Array<ICCXMLEnumeration> = getElementsByType(classDiagram, ClassDiagramElementsEnum.ENUMERATION).map((element): ICCXMLEnumeration => {
        const entries = getElementEntries(classDiagram, element);

        return {
            $: {
                id: element.data.elementName,
                x: element.graphicData.frame.xCenter,
                y: element.graphicData.frame.yCenter
            },
            entries: [
                {
                    entry: convertEntriesToCCXMLEntries(entries)
                }
            ],
            transitions: [
                {
                    transition: getElementsTransitions(classDiagram, element)
                }
            ]
        };
    });

    const ccxmlInterface: Array<ICCXMLInterface> = getElementsByType(classDiagram, ClassDiagramElementsEnum.INTERFACE).map((element): ICCXMLInterface => {
        const entries = getElementEntries(classDiagram, element);

        return {
            $: {
                id: element.data.elementName,
                x: element.graphicData.frame.xCenter,
                y: element.graphicData.frame.yCenter
            },
            methods: [
                {
                    method: convertEntriesToCCXMLMethods(entries)
                }
            ],
            properties: [{
                property: convertEntriesToCCXMLProperties(entries)
            }],
            transitions: [
                {
                    transition: getElementsTransitions(classDiagram, element)
                }
            ] 
        };
    });
    
    const ccxmlObject: Array<ICCXMLObject> = getElementsByType(classDiagram, ClassDiagramElementsEnum.OBJECT).map((element): ICCXMLObject => {
        const entries = getElementEntries(classDiagram, element);

        return {
            $: {
                id: element.data.elementName,
                x: element.graphicData.frame.xCenter,
                y: element.graphicData.frame.yCenter
            },
            slots: [
                {
                    slot: convertEntriesToCCXMLSlot(entries)
                }
            ],
            transitions: [
                {
                    transition: getElementsTransitions(classDiagram, element)
                }
            ] 
        };
    }); 

    const ccxmlPrimitive: Array<ICCXMLPrimitive> = getElementsByType(classDiagram, ClassDiagramElementsEnum.PRIMITIVE_TYPE).map((element): ICCXMLPrimitive => {
        return {
            $: {
                id: element.data.elementName,
                x: element.graphicData.frame.xCenter,
                y: element.graphicData.frame.yCenter
            },
            transitions: [
                {
                    transition: getElementsTransitions(classDiagram, element)
                }
            ] 
        };
    });

    const ccxmlUtility: Array<ICCXMLUtility> = getElementsByType(classDiagram, ClassDiagramElementsEnum.UTILITY).map((element): ICCXMLUtility => {
        const entries = getElementEntries(classDiagram, element);

        return {
            $: {
                id: element.data.elementName,
                x: element.graphicData.frame.xCenter,
                y: element.graphicData.frame.yCenter
            },
            methods: [
                {
                    method: convertEntriesToCCXMLMethods(entries)
                }
            ],
            properties: [
                {
                    property: convertEntriesToCCXMLProperties(entries)
                }
            ],
            transitions: [
                {
                    transition: getElementsTransitions(classDiagram, element)
                }
            ]
        };
    });

    const newCCXML: ICCXML = {
        $: {
            initialclass: '',
            version: '1.0',
            coordinates: 'true'
        },
        classes: [
            {
                class: ccxmlClasses
            }
        ],
        dataTypes: [
            {
                dataType: ccxmlDataType
            }
        ],
        enumerations: [
            {
                enumeration: ccxmlEnumeration
            }
        ],
        interfaces: [
            {
                interface: ccxmlInterface
            }
        ],
        objects: [
            {
                object: ccxmlObject
            }
        ],
        primitives: [
            {
                 primitive: ccxmlPrimitive
            }
        ],
        utilities: [
            {
                utility: ccxmlUtility
            }
        ] 
    };

    const builder = new Builder({
        rootName: 'classxml'
    });
    return builder.buildObject(newCCXML);
};