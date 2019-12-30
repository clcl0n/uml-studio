import IEnumerationEntry from './IEnumerationEntry';
import ICoordinates from '@interfaces/ICoordinates';

export default interface IEnumerationEntryProps {
    graphicData: {
        text: ICoordinates;
    };
    entry: IEnumerationEntry;
}