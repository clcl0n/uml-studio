import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import { IUMLClassElementProps } from '@interfaces/IUMLClassElementProps';

const createNewTableElement = (event: React.MouseEvent<SVGElement, MouseEvent>): any => {
    const width: number = 100;
    const height: number = 150;
    const xElementCenter: number = event.nativeEvent.offsetX - (width / 2);
    const yElementCenter: number = event.nativeEvent.offsetY - (height / 2);
    const fontPixelSize: number = 12;
    const fontMargin: number = 5;
    const rowHeight: number = 25;

    const table: IUMLClassElementProps = {
        id: 'id',
        type: ClassDiagramElementsEnum.TABLE,
        height,
        width,
        classMethods: [{
            name: 'method'
        }],
        classProperties: [
            {
                name: 'field'
            },
            {
                name: 'field2'  
            }
        ],
        frame: {
            x: xElementCenter,
            y: yElementCenter,
        },
        row: {
            height: rowHeight
        },
        className: {
            x: event.nativeEvent.offsetX,
            y: (event.nativeEvent.offsetY - (height / 2) + fontPixelSize + fontMargin),
            text: 'test-test-test'
        },
        separators: {
            properties: {
                x: xElementCenter,
                y: event.nativeEvent.offsetY - (height / 2) + fontPixelSize + fontMargin * 2,
            },
            methods: {
                x: 0,
                y: 0,
            }
        }
    }
    return table;
}

export default createNewTableElement;