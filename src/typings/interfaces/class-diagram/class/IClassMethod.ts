import AccessModifierEnum from '@enums/accessModifierEnum';

export default interface IClassMethod {
    id: string;
    accessModifier: AccessModifierEnum;
    name: string;
}