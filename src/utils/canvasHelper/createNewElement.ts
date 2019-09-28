import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import { IClassProps } from '@interfaces/IClassProps';

const createNewElement = (element: ClassDiagramElementsEnum, event: React.MouseEvent<SVGElement, MouseEvent>): any => {
    switch(element) {
        case ClassDiagramElementsEnum.TABLE:
            const table: IClassProps = {
                umlClassFrame: {
                    x: event.nativeEvent.offsetX,
                    y: event.nativeEvent.offsetY,
                    height: 100,
                    width: 50
                },
                umlClassName: {
                    x: event.nativeEvent.offsetX,
                    y: (event.nativeEvent.offsetY - (100 / 2) + 12 + 5),
                    text: 'test-test-test'
                },
                separators: {
                    nameAttrSeparator: {
                        x1: event.nativeEvent.offsetX - (50 / 2),
                        y1: event.nativeEvent.offsetY - 25,
                        x2: event.nativeEvent.offsetX + (50 / 2),
                        y2: event.nativeEvent.offsetY - 25
                    }
                }
            }
            return table;
    }
}

export default createNewElement;