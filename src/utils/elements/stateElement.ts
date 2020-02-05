import ICoordinates from '@interfaces/ICoordinates';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import { v4 } from 'uuid';
import { createFrame } from './frame';

export const createNewSimpleStateElement = (coordinates: ICoordinates) => {
    const stateElement: IStateElement = {
        id: v4(),
        name: 'state',
        regions: [],
        internalActions: [],
        graphicData: {
            ...createFrame(coordinates, 1, 75),
            rx: 20
        }
    };

    return {
        stateElement
    };
};