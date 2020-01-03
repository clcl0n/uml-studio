import ICoordinates from '@interfaces/ICoordinates';
import IDataTypeEntry from './IDataTypeEntry';

export default interface IDataTypeEntryProps {
    graphicData: {
        text: ICoordinates;
    };
    entry: IDataTypeEntry;
}