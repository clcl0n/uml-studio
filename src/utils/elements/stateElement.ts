import ICoordinates from '@interfaces/ICoordinates';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import { v4 } from 'uuid';
import { createFrame, moveFrame } from './frame';
import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';

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