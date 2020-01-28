import AccessModifierEnum from '@enums/accessModifierEnum';
import IEntry from '../common/IEntry';

export default interface IClassMethod extends IEntry {
    accessModifier: AccessModifierEnum;
}