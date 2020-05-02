import { createFrame, moveFrame } from './frame';
import { v4 } from 'uuid';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';
import AccessModifierEnum from '@enums/accessModifierEnum';
import ICoordinates from '@interfaces/ICoordinates';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import EntryTypeEnum from '@enums/EntryTypeEnum';
import ICCXMLInterface from '@interfaces/ccxml/ICCXMLInterface';
import IInterfaceProperty from '@interfaces/class-diagram/interface/IInterfaceProperty';
import IInterfaceMethod from '@interfaces/class-diagram/interface/IInterfaceMethod';

export const createNewInterfaceFromCCXML = (coordinates: ICoordinates, ccxmlInterface: ICCXMLInterface, width: number = 100) => {
    const methods = ccxmlInterface.methods?.[0]?.method ?? [];
    const properties = ccxmlInterface.properties?.[0]?.property ?? [];
    const frame = createFrame(coordinates, methods.length + properties.length + 1, width);
    frame.height += (frame.rowHeight / 2);

    const entryIds: Array<string> = [];
    const entries: Array<IInterfaceProperty | IInterfaceMethod> = [
        ...methods.map((ccxmlMethod): IInterfaceMethod => {
            const newMethodId = v4();
            entryIds.push(newMethodId);
            return {
                id: newMethodId,
                accessModifier: ccxmlMethod.$.accessModifier.toUpperCase() as AccessModifierEnum,
                type: EntryTypeEnum.METHOD,
                value: ccxmlMethod.$.name
            };
        }),
        ...properties.map((ccxmProperty): IInterfaceProperty => {
            const newPropertyId = v4();
            entryIds.push(newPropertyId);

            return {
                id: newPropertyId,
                accessModifier: ccxmProperty.$.accessModifier.toUpperCase() as AccessModifierEnum,
                type: EntryTypeEnum.PROPERTY,
                value: ccxmProperty.$.name
            };
        })
    ];

    const newInterface: IInterface = {
        id: v4(),
        type: ClassDiagramElementsEnum.INTERFACE,
        data: {
            elementName: ccxmlInterface.$.id,
            entryIds
        },
        graphicData: {
            frame,
            sections: {
                head: {
                    y: frame.y
                },
                properties: {
                    y: frame.y + frame.rowHeight + (frame.rowHeight / 2)
                },
                methods: {
                    y: frame.y + ((1 + properties.length) * frame.rowHeight)+ (frame.rowHeight / 2)
                }
            }
        }
    };

    return {
        newInterface,
        entries
    };
};

export const createNewInterface = (coordinates: ICoordinates) => {
    const frame = createFrame(coordinates, 3);

    const interfacePropertyId = v4();
    const newInterfaceProperty: IClassProperty = {
        id: interfacePropertyId,
        type: EntryTypeEnum.PROPERTY,
        accessModifier: AccessModifierEnum.PUBLIC,
        value: 'property_1'
    };

    const interfaceMethodId = v4();
    const newInterfaceMethod: IClassMethod = {
        id: interfaceMethodId,
        type: EntryTypeEnum.METHOD,
        accessModifier: AccessModifierEnum.PUBLIC,
        value: 'method_1'
    };

    frame.height += (frame.rowHeight / 2);

    const newInterface: IInterface = {
        id: v4(),
        type: ClassDiagramElementsEnum.INTERFACE,
        data: {
            elementName: 'interface Name',
            entryIds: [interfaceMethodId, interfacePropertyId],
        },
        graphicData: {
            frame,
            sections: {
                head: {
                    y: frame.y
                },
                properties: {
                    y: frame.y + frame.rowHeight + (frame.rowHeight / 2)
                },
                methods: {
                    y: frame.y + (2 * frame.rowHeight) + (frame.rowHeight / 2)
                }
            }
        }
    };

    return {
        newInterface,
        newInterfaceProperty,
        newInterfaceMethod
    };
};

export const moveInterface = (element: IInterface, coordinates: ICoordinates, oldCursorPosition: ICoordinates, propertyCount: number): IInterface => {
    const newFrame = moveFrame(element, coordinates, oldCursorPosition);

    return {
        ...element,
        graphicData: {
            frame: newFrame,
            sections: {
                head: {
                    y: newFrame.y
                },
                properties: {
                    y: newFrame.y + newFrame.rowHeight + (newFrame.rowHeight / 2)
                },
                methods: {
                    y: newFrame.y + ((1 + propertyCount) * newFrame.rowHeight) + (newFrame.rowHeight / 2)
                }
            }
        }
    };
};

export const updateInterfaceGraphicData = (interfaceElement: IInterface, propertyCount: number, methodCount: number) => {
    const { graphicData, data } = interfaceElement;

    if (methodCount === 0 && propertyCount === 0) {
        graphicData.frame.height = graphicData.frame.rowHeight + (graphicData.frame.rowHeight / 2);
    } else {
            graphicData.sections.methods.y = graphicData.frame.y + (
                (propertyCount + 1) * graphicData.frame.rowHeight
            ) + (graphicData.frame.rowHeight / 2);
        
            graphicData.frame.height = (
                propertyCount + methodCount + 1
            ) * graphicData.frame.rowHeight + (graphicData.frame.rowHeight / 2);
    }

    return {
        ...interfaceElement,
        graphicData
    };
};