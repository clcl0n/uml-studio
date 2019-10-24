import CanvasEnum from '@enums/storeActions/canvasEnum';

export function drawNewElement(element: CanvasEnum, event: React.DragEvent<HTMLDivElement> | React.MouseEvent<SVGGElement | HTMLDivElement, MouseEvent>) {
    return {
        type: element,
        payload: { 
            event
        }
    }
}