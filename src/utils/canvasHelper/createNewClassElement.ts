import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IClassElement from '@interfaces/elements/IClassElement';
import IClassElementMethod from '@interfaces/elements/class/IClassMethodData';
import { v4 } from 'uuid';
import IClassPropertyData from '@interfaces/elements/class/IClassPropertyData';
import I2DCoordinates from '@interfaces/I2DCoordinates';

const createNewClassElement = (graphicData: I2DCoordinates, basic: boolean): IClassElement => {
    const width: number = 100;
    const rowHeight: number = 25;
    const height: number = 3 * rowHeight;
    const xElementCenter: number = graphicData.x;
    const yElementCenter: number = graphicData.y;
    const x: number = xElementCenter - (width / 2);
    const y: number = yElementCenter - (height / 2);
    const fontPixelSize: number = 12;
    const fontMargin: number = 5;

    let classMethods = new Array<IClassElementMethod>();
    let classProperties = new Array<IClassPropertyData>(); 

    if (!basic) {
        classMethods.push(
            {
                accessModifier: 'public',
                name: 'method_1'
            }
        );
        classProperties.push(
            {
                accessModifier: 'public',
                name: 'method_2'
            }
        );
    }

    const newTable: IClassElement = {
        elementData: {
            id: v4(),
            type: ClassDiagramElementsEnum.TABLE,
            className: 'class Name',
            classProperties,
            classMethods
        },
        elementGraphicData: {
            fontPixelSize: fontPixelSize,
            fontMargin: fontMargin,
            rowHeight: rowHeight,
            frame: {
                height: height,
                width: width,
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
                        y: y + ((classProperties.length + 1) * rowHeight)
                    }
                }
            }
        },
        elementFunctionality: {}
    };

    return newTable;
}

export default createNewClassElement;