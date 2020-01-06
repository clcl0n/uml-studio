import ICoordinates from '@interfaces/ICoordinates';
import IObjectSlot from './IObjectSlot';

export default interface IObjectSlotProps {
    graphicData: {
        text: ICoordinates;
    };
    slot: IObjectSlot;
};