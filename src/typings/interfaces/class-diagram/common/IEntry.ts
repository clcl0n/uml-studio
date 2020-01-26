import EntryTypeEnum from '@enums/EntryTypeEnum';

export default interface IEntry {
    id: string;
    type: EntryTypeEnum;
    value: string;
    [key: string]: any;
}