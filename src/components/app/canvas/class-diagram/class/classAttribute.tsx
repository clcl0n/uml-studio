import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IClassAttribute from '@interfaces/class-diagram/class/IClassAttribute';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';

const ClassAttribute = (props: { classAttribute: IClassAttribute<IClassMethod | IClassProperty> }) => {
    const { data, graphicData } = props.classAttribute;
    
    return (
        <text
            className='umlClassName'
            x={graphicData.textX}
            y={graphicData.textY}
        >
            {data.name}
        </text>
    );
};

export default ClassAttribute;