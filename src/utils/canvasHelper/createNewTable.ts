import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IClassElement from '@interfaces/elements/IClassElement';
import IClassElementProperty from '@interfaces/elements/class/IClassElementProperty';
import IClassElementMethod from '@interfaces/elements/class/IClassElementMethod';
import { v4 } from 'uuid';

const createNewTableElement = (graphicData: {x: number, y: number}): IClassElement => {
    const width: number = 100;
    const rowHeight: number = 25;
    const height: number = 3 * rowHeight;
    const xElementCenter: number = graphicData.x;
    const yElementCenter: number = graphicData.y;
    const x: number = xElementCenter - (width / 2);
    const y: number = yElementCenter - (height / 2);
    // const x: number = event.nativeEvent.offsetX;
    // const y: number = event.nativeEvent.offsetY;
    // const xElementCenter: number = event.nativeEvent.offsetX - (width / 2);
    // const yElementCenter: number = event.nativeEvent.offsetY - (height / 2);
    const fontPixelSize: number = 12;
    const fontMargin: number = 5;

    const classMethods: Array<IClassElementMethod> = [
        {
            accessModifier: 'public',
            name: 'method_1'
        }
    ]
    const classProperties: Array<IClassElementProperty> = [
        {
            accessModifier: 'public',
            name: 'method_2'
        }
    ]

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
    // const table: IUMLClassElementProps = {
    //     id: 'id',
    //     type: ClassDiagramElementsEnum.TABLE,
    //     height,
    //     width,
    //     classMethods: [{
    //         name: 'method'
    //     }],
    //     classProperties: [
    //         {
    //             name: 'field'
    //         },
    //         {
    //             name: 'field2'  
    //         }
    //     ],
    //     frame: {
    //         x: xElementCenter,
    //         y: yElementCenter,
    //     },
    //     row: {
    //         height: rowHeight
    //     },
    //     className: {
    //         x: event.nativeEvent.offsetX,
    //         y: (event.nativeEvent.offsetY - (height / 2) + fontPixelSize + fontMargin),
    //         text: 'test-test-test'
    //     },
    //     separators: {
    //         properties: {
    //             x: xElementCenter,
    //             y: event.nativeEvent.offsetY - (height / 2) + fontPixelSize + fontMargin * 2,
    //         },
    //         methods: {
    //             x: 0,
    //             y: 0,
    //         }
    //     }
    // }
    // return table;
}

export default createNewTableElement;