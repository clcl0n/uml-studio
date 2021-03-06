import IDataType from './IDataType';
import IDataTypeEntry from './IDataTypeEntry';

export default interface IDataTypeProps {
    dataType: IDataType;
    entries: Array<IDataTypeEntry>;
}