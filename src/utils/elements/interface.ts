import { createFrame, moveFrame } from './frame';
import { v4 } from 'uuid';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';
import AccessModifierEnum from '@enums/accessModifierEnum';
import ICoordinates from '@interfaces/ICoordinates';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';

export const createNewInterface = (coordinates: ICoordinates) => {
    const frame = createFrame(coordinates, 3);

    const interfacePropertyId = v4();
    const newInterfaceProperty: IClassProperty = {
        id: interfacePropertyId,
        accessModifier: AccessModifierEnum.PUBLIC,
        name: 'property_1'
    };

    const interfaceMethodId = v4();
    const newInterfaceMethod: IClassMethod = {
        id: interfaceMethodId,
        accessModifier: AccessModifierEnum.PUBLIC,
        name: 'method_1'
    };

    frame.height += (frame.rowHeight / 2);

    const newInterface: IInterface = {
        id: v4(),
        type: ClassDiagramElementsEnum.INTERFACE,
        data: {
            interfaceName: 'interface Name',
            interfaceMethodIds: [interfaceMethodId],
            interfacePropertyIds: [interfacePropertyId],
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

export const moveInterface = (element: IInterface, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IInterface => {
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
                    y: newFrame.y + ((1 + element.data.interfacePropertyIds.length) * newFrame.rowHeight) + (newFrame.rowHeight / 2)
                }
            }
        }
    };
};

export const updateInterfaceGraphicData = (interfaceElement: IInterface) => {
    const { graphicData, data } = interfaceElement;

    if (data.interfaceMethodIds.length === 0 && data.interfacePropertyIds.length === 0) {
        graphicData.frame.height = graphicData.frame.rowHeight + (graphicData.frame.rowHeight / 2);
    } else {
            graphicData.sections.methods.y = graphicData.frame.y + (
                (data.interfacePropertyIds.length + 1) * graphicData.frame.rowHeight
            ) + (graphicData.frame.rowHeight / 2);
        
            graphicData.frame.height = (
                data.interfacePropertyIds.length + data.interfaceMethodIds.length + 1
            ) * graphicData.frame.rowHeight + (graphicData.frame.rowHeight / 2);
    }

    return {
        ...interfaceElement,
        graphicData
    };
};