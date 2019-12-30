import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IClassAttribute from '@interfaces/class-diagram/class/IClassAttribute';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';
import AccessModifierEnum from '@enums/accessModifierEnum';

const ClassAttribute = (props: { classAttribute: IClassAttribute<IClassMethod | IClassProperty> }) => {
    const { data, graphicData } = props.classAttribute;

    const classAttributeToString = () => {
        switch (data.accessModifier) {
            case AccessModifierEnum.PUBLIC:
                return `+ ${data.name}`;
            case AccessModifierEnum.PROTECTED:
                return `# ${data.name}`;
            case AccessModifierEnum.PRIVATE:
                return `- ${data.name}`;
        }
    };

    return (
        <text className='umlClassName' x={graphicData.text.x} y={graphicData.text.y}>
            {classAttributeToString()}
        </text>
    );
};

export default ClassAttribute;