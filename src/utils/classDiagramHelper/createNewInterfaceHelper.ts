import ICoordinates from '@interfaces/ICoordinates';
import createFrameHelper from './createFrameHelper';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import { v4 } from 'uuid';
import AccessModifierEnum from '@enums/accessModifierEnum';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';

const createNewInterfaceHelper = (coordinates: ICoordinates) => {
    const frame = createFrameHelper(coordinates);

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

    const newInterface: IInterface = {
        id: v4(),
        className: 'interface Name',
        type: ClassDiagramElementsEnum.INTERFACE,
        classMethodIds: [interfaceMethodId],
        classPropertyIds: [interfacePropertyId],
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
        newInterface,
        newInterfaceProperty,
        newInterfaceMethod
    };
};

export default createNewInterfaceHelper;