import IForkJoinElement from '@interfaces/state-diagram/IForkJoinElement';
import { v4 } from 'uuid';
import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';
import ICoordinates from '@interfaces/ICoordinates';

export const moveForkJoinElement = (element: IForkJoinElement, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IForkJoinElement => {

    return {
        ...element,
        graphicData: {
            ...element.graphicData,
            x: coordinates.x,
            y: coordinates.y
        }
    };
};

export const createNewFork = (coordinates: ICoordinates, type: StateDiagramElementsEnum.FORK | StateDiagramElementsEnum.JOIN) => {
    const width = 7;
    const height = 100;

    const newForkJoin: IForkJoinElement = {
        id: v4(),
        type,
        graphicData: {
            width,
            height,
            x: coordinates.x,
            y: coordinates.y
        }
    };

    return {
        newForkJoin
    };
};