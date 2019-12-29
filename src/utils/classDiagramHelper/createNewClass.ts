import ICoordinates from '@interfaces/ICoordinates';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import { v4 } from 'uuid';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';
import IClass from '@interfaces/class-diagram/class/IClass';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import AccessModifierEnum from '@enums/accessModifierEnum';
import createFrameHelper from './createFrameHelper';

const createNewClass = (coordinates: ICoordinates) => {
    const frame = createFrameHelper(coordinates);

    const classPropertyId = v4();
    const newClassProperty: IClassProperty = {
        id: classPropertyId,
        accessModifier: AccessModifierEnum.PUBLIC,
        name: 'property_1'
    };

    const classMethodId = v4();
    const newClassMethod: IClassMethod = {
        id: classMethodId,
        accessModifier: AccessModifierEnum.PUBLIC,
        name: 'method_1'
    };

    const newClass: IClass = {
        id: v4(),
        className: 'class Name',
        type: ClassDiagramElementsEnum.CLASS,
        classMethodIds: [classMethodId],
        classPropertyIds: [classPropertyId],
        graphicData: {
            frame,
            sections: {
                head: {
                    y: frame.y
                },
                properties: {
                    y: frame.y + frame.rowHeight
                },
                methods: {
                    y: frame.y + (2 * frame.rowHeight)
                }
            }
        }
    };

    return {
        newClass,
        newClassProperty,
        newClassMethod
    };
};

export default createNewClass;