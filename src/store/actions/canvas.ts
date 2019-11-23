import CanvasEnum from '@enums/storeActions/canvasEnum';

export function drawNewElement(element: CanvasEnum, graphicData: {x: number, y: number} | {x1: number, y1: number, x2: number, y2: number}) {
    return {
        type: element,
        graphicData
    }
}