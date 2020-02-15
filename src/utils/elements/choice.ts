import ICoordinates from '@interfaces/ICoordinates';
import IChoiceElement from '@interfaces/state-diagram/IChoiceElement';
import { v4 } from 'uuid';
import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';

const width = 50;
const height = width;

export const moveChoiceElement = (element: IChoiceElement, coordinates: ICoordinates, oldCursorPosition: ICoordinates): IChoiceElement => {

    const xShift = coordinates.x - oldCursorPosition.x;
    const yShift = coordinates.y - oldCursorPosition.y;

    return {
        ...element,
        graphicData: {
            ...element.graphicData,
            xCenter: coordinates.x + xShift,
            yCenter: coordinates.y + yShift,
            x: coordinates.x - (width / 2),
            y: coordinates.y - (height / 2)
        }
    };
};

export const createNewChoice = (coordinates: ICoordinates) => {

    const newChoice: IChoiceElement = {
        id: v4(),
        type: StateDiagramElementsEnum.CHOICE,
        graphicData: {
            height,
            width,
            xCenter: coordinates.x,
            yCenter: coordinates.y,
            x: coordinates.x - (width / 2),
            y: coordinates.y - (height / 2)
        }
    };

    return {
        newChoice
    };
};