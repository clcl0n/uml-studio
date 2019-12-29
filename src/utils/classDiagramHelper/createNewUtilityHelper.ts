import ICoordinates from '@interfaces/ICoordinates';
import createFrameHelper from './createFrameHelper';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';
import { v4 } from 'uuid';
import AccessModifierEnum from '@enums/accessModifierEnum';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import IUtility from '@interfaces/class-diagram/utility/IUtility';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';

const createNewUtilityHelper = (coordinates: ICoordinates) => {
    const frame = createFrameHelper(coordinates);

    const utilityPropertyId = v4();
    const newUtilityProperty: IClassProperty = {
        id: utilityPropertyId,
        accessModifier: AccessModifierEnum.PUBLIC,
        name: 'property_1'
    };

    const utilityMethodId = v4();
    const newUtilityMethod: IClassMethod = {
        id: utilityMethodId,
        accessModifier: AccessModifierEnum.PUBLIC,
        name: 'method_1'
    };

    frame.height += (frame.rowHeight / 2);

    const newUtility: IUtility = {
        id: v4(),
        className: 'utility Name',
        type: ClassDiagramElementsEnum.UTILITY,
        utilityMethodIds: [utilityMethodId],
        utilityPropertyIds: [utilityPropertyId],
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

export default createNewUtilityHelper;