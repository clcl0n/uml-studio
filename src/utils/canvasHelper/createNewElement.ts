import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import { IClassElementProps } from '@interfaces/IClassElementProps';

const createNewElement = (element: ClassDiagramElementsEnum, event: React.MouseEvent<SVGElement, MouseEvent>): any => {
    switch(element) {
        case ClassDiagramElementsEnum.TABLE:
            const width: number = 100;
            const height: number = 150;
            const xElementCenter: number = event.nativeEvent.offsetX - (width / 2);
            const yElementCenter: number = event.nativeEvent.offsetY - (height / 2);

            const table: IClassElementProps = {
                type: ClassDiagramElementsEnum.TABLE,
                umlClassFrame: {
                    x: xElementCenter,
                    y: yElementCenter,
                    height,
                    width
                },
                umlClassName: {
                    x: event.nativeEvent.offsetX,
                    y: (event.nativeEvent.offsetY - (100 / 2) + 12 + 5),
                    text: 'test-test-test'
                },
                separators: {
                    nameAttrSeparator: {
                        x1: event.nativeEvent.offsetX - (100 / 2),
                        y1: event.nativeEvent.offsetY - 25,
                        x2: event.nativeEvent.offsetX + (100 / 2),
                        y2: event.nativeEvent.offsetY - 25
                    }
                }
            }
            return table;
    }
}

export default createNewElement;