import ICoordinates from '@interfaces/ICoordinates';
import IClassMethodData from '@interfaces/class-diagram/class/IClassMethodData';
import { v4 } from 'uuid';
import IClassPropertyData from '@interfaces/class-diagram/class/IClassPropertyData';
import IClass from '@interfaces/class-diagram/class/IClass';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';

const createNewClass = (coordinates: ICoordinates) => {
    const width: number = 100;
    const rowHeight: number = 25;
    const height: number = 3 * rowHeight;
    const xElementCenter: number = coordinates.x;
    const yElementCenter: number = coordinates.y;
    const x: number = xElementCenter - (width / 2);
    const y: number = yElementCenter - (height / 2);
    const fontPixelSize: number = 12;
    const fontMargin: number = 5;

    const classPropertyId = v4();
    const newClassProperty: IClassPropertyData = {
        id: classPropertyId,
        accessModifier: 'public',
        name: 'property_1'
    };

    const classMethodId = v4();
    const newClassMethod: IClassMethodData = {
        id: classMethodId,
        accessModifier: 'public',
        name: 'method_1'
    };

    const newClass: IClass = {
        id: v4(),
        className: 'class Name',
        type: ClassDiagramElementsEnum.CLASS,
        classMethodIds: [classMethodId],
        classPropertyIds: [classPropertyId],
        fontMargin,
        fontPixelSize,
        rowHeight,
        height,
        width,
        x,
        y,
        xCenter: xElementCenter,
        yCenter: yElementCenter,
        sections: {
            head: {
                y
            },
            properties: {
                y: y + rowHeight
            },
            methods: {
                y: y + (2 * rowHeight)
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