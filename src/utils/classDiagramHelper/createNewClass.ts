import ICoordinates from '@interfaces/ICoordinates';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import { v4 } from 'uuid';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';
import IClass from '@interfaces/class-diagram/class/IClass';
import AccessModifierEnum from '@enums/accessModifierEnum';
import createNewBaseClassHelper from './createNewBaseClassHelper';

const createNewClass = (coordinates: ICoordinates) => {
    const { newBaseClass } = createNewBaseClassHelper(coordinates, 3);

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
        ...newBaseClass,
        data: {
            classMethodIds: [classMethodId],
            classPropertyIds: [classPropertyId],
            className: 'class name'
        }
    };

    return {
        newClass,
        newClassProperty,
        newClassMethod
    };
};

export default createNewClass;