import { createFrame, moveFrame } from './frame';
import ICoordinates from '@interfaces/ICoordinates';
import { v4 } from 'uuid';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';
import AccessModifierEnum from '@enums/accessModifierEnum';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import IUtility from '@interfaces/class-diagram/utility/IUtility';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import EntryTypeEnum from '@enums/EntryTypeEnum';

export const createNewUtility = (coordinates: ICoordinates) => {
    const frame = createFrame(coordinates, 3);

    const utilityPropertyId = v4();
    const newUtilityProperty: IClassProperty = {
        id: utilityPropertyId,
        type: EntryTypeEnum.PROPERTY,
        accessModifier: AccessModifierEnum.PUBLIC,
        value: 'property_1'
    };

    const utilityMethodId = v4();
    const newUtilityMethod: IClassMethod = {
        id: utilityMethodId,
        type: EntryTypeEnum.METHOD,
        accessModifier: AccessModifierEnum.PUBLIC,
        value: 'method_1'
    };

    frame.height += (frame.rowHeight / 2);

    const newUtility: IUtility = {
        id: v4(),
        type: ClassDiagramElementsEnum.UTILITY,
        data: {
            elementName: 'utility Name',
            entryIds: [utilityMethodId, utilityPropertyId]
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
        newUtility,
        newUtilityProperty,
        newUtilityMethod
    };
};

export const moveUtility = (element: IUtility, coordinates: ICoordinates, oldCursorPosition: ICoordinates, propertyCount: number): IUtility => {
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

export const updateUtilityGraphicData = (utilityElement: IUtility, propertyCount: number, methodCount: number) => {
    const { graphicData } = utilityElement;

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
        ...utilityElement,
        graphicData
    };
};