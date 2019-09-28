import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import CanvasEnum from '@enums/storeActions/canvasEnum';

export function drawNewElement(element: ClassDiagramElementsEnum, event: React.MouseEvent<SVGElement, MouseEvent>) {
    return {
        type: CanvasEnum.ADD_NEW_ELEMENT,
        payload: { element, event }
    }
}