import CanvasEnum from '@enums/storeActions/canvasEnum';
import IElement from '@interfaces/elements/IElement';
import IElementData from '@interfaces/elements/IElementData';
import IElementGraphicData from '@interfaces/elements/IElementGraphicData';

export function drawNewElement(type: CanvasEnum, graphicData: {x: number, y: number} | {x1: number, y1: number, x2: number, y2: number}) {
    return {
        type,
        data: graphicData
    }
}

export function selectElement(elementId: string) {
    return {
        type: CanvasEnum.SELECT_ELEMENT,
        data: elementId
    }
}

export function updateElement(data: IElement<IElementData, IElementGraphicData>) {
    return {
        type: CanvasEnum.UPDATE_ELEMENT,
        data
    }
}