import AccessModifierEnum from '@enums/accessModifierEnum';

export default interface IClassProperty {
    id: string;
    accessModifier: AccessModifierEnum;
    name: string;
}