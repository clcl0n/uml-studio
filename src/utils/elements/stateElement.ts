import ICoordinates from '@interfaces/ICoordinates';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import { v4 } from 'uuid';
import { createFrame, moveFrame } from './frame';
import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';
import IInitialStateElement from '@interfaces/state-diagram/initial-state/IInitialStateElement';
import IFinalStateElement from '@interfaces/state-diagram/final-state/IFinalStateElement';

export const moveStateElement = (element: IStateElement, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IStateElement => {
    const newFrame = moveFrame(element, coordinates, oldCursorPosition);

    return {
        ...element,
        graphicData: {
            frame: newFrame,
            rx: element.graphicData.rx
        }
    };
};

export const createNewStateElement = (coordinates: ICoordinates) => {
    const stateElement: IStateElement = {
        id: v4(),
        type: StateDiagramElementsEnum.STATE,
        data: {
            name: 'state',
            regions: ['region_1'],
            internalActions: []
        },
        graphicData: {
            frame: {
                ...createFrame(coordinates, 1, 75),
            },
            rx: 20
        }
    };

    return {
        stateElement
    };
};

export const createNewFinalStateElement = (coordinates: ICoordinates) => {
    const finalStateElement: IFinalStateElement = {
        id: v4(),
        type: StateDiagramElementsEnum.FINAL_STATE,
        graphicData: {
            x: coordinates.x,
            y: coordinates.y,
            r: 10,
            r2: 15
        }
    };

    return {
        finalStateElement
    };
};  

export const moveFinalStateElement = (element: IFinalStateElement, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IFinalStateElement => {

    return {
        ...element,
        graphicData: {
            ...element.graphicData,
            x: coordinates.x,
            y: coordinates.y
        }
    };
};

export const moveInitialStateElement = (element: IInitialStateElement, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IInitialStateElement => {

    return {
        ...element,
        graphicData: {
            ...element.graphicData,
            x: coordinates.x,
            y: coordinates.y
        }
    };
};

export const createNewInitialStateElement = (coordinates: ICoordinates) => {
    const initialStateElement: IInitialStateElement = {
        id: v4(),
        type: StateDiagramElementsEnum.INITIAL_STATE,
        graphicData: {
            x: coordinates.x,
            y: coordinates.y,
            r: 10
        }
    };

    return {
        initialStateElement
    };
};  

export const createNewSimpleStateElement = (coordinates: ICoordinates) => {
    const simpleStateElement: IStateElement = {
        id: v4(),
        type: StateDiagramElementsEnum.STATE,
        data: {
            name: 'state',
            regions: [],
            internalActions: [],
        },
        graphicData: {
            frame: {
                ...createFrame(coordinates, 1, 75),
            },
            rx: 20
        }
    };

    return {
        simpleStateElement
    };
};