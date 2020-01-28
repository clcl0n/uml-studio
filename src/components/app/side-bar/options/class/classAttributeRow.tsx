import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import AccessModifierEnum from '@enums/accessModifierEnum';
import TextOptions from '@components/app/common/textOptions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ClassAttributeRow = (props: {
    classAttribute: IClassProperty | IClassMethod,
    placeHolder: string,
    removeAttribute: (attribute: IClassProperty | IClassMethod) => void,
    onSelectNewOption: (option: AccessModifierEnum) => void,
    updateAttribute: (newPropertyName: string, classProperty: IClassProperty) => void
}) => {
    const { classAttribute, placeHolder, removeAttribute, onSelectNewOption, updateAttribute } = props;
    const accessModifiers = Object.values(AccessModifierEnum).map((value) => value.toLowerCase());

    return (
        <tr>
            <td>
                <TextOptions onSelectNewOption={(option) => onSelectNewOption(option.toUpperCase() as AccessModifierEnum)} defaultOption={classAttribute.accessModifier.toLowerCase()} options={accessModifiers}/>
            </td>
            <td>
                <input
                    type='text'
                    className='input'
                    placeholder={placeHolder}
                    value={classAttribute.value}
                    onChange={(ev) => updateAttribute(ev.target.value, classAttribute)}
                />
            </td>
            <td>
                <FontAwesomeIcon onClick={(ev) => removeAttribute(classAttribute)} className='icon' icon='trash-alt'/>
            </td>
        </tr>
    );
};

export default ClassAttributeRow;