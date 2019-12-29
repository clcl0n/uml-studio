import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as log from 'loglevel';
import IClass from '@interfaces/class-diagram/class/IClass';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import { addNewClassProperty, updateClass, addNewClassMethod, updateClassMethod, updateClassPropetry, removeClassMethod, removeClassProperty } from '@store/actions/classDiagram';
import { v4 } from 'uuid';
import IStoreState from '@interfaces/IStoreState';
import AccessModifierEnum from '@enums/accessModifierEnum';

const ClassEditOptions = (props: { class: IClass }) => {
    const dispatch = useDispatch();
    const { data } = props.class;
    const selectedClassMethods = useSelector((state: IStoreState) => data.classMethodIds.map((id) => {
        return state.umlClassDiagram.classMethods.byId[id];
    }));
    const selectedClassProperties = useSelector((state: IStoreState) => data.classPropertyIds.map((id) => {
        return state.umlClassDiagram.classProperties.byId[id];
    }));

    const updateClassGraphic = (classElement: IClass): IClass => {
        classElement.graphicData.sections.methods.y = classElement.graphicData.frame.y + (
            (data.classPropertyIds.length + 1) * classElement.graphicData.frame.rowHeight
        );

        classElement.graphicData.frame.height = (
            data.classPropertyIds.length + data.classMethodIds.length + 1
        ) * classElement.graphicData.frame.rowHeight;
        
        return classElement;
    };

    const removeProperty = (classProperty: IClassProperty) => {
        const updatedClass = {...props.class};
        updatedClass.data.classPropertyIds.splice(updatedClass.data.classPropertyIds.indexOf(classProperty.id, 1));
        dispatch(updateClass(updateClassGraphic(updatedClass)));
        dispatch(removeClassProperty(classProperty));
    };

    const removeMethod = (classMethod: IClassMethod) => {
        const updatedClass = {...props.class};
        updatedClass.data.classMethodIds.splice(updatedClass.data.classMethodIds.indexOf(classMethod.id), 1);
        dispatch(updateClass(updateClassGraphic(updatedClass)));
        dispatch(removeClassMethod(classMethod));
    };
    
    const updateMethod = (newMethodName: string, classMethod: IClassMethod) => {
        dispatch(updateClassMethod({
            ...classMethod,
            name: newMethodName
        }));
    };

    const updateProperty = (newPropertyName: string, classProperty: IClassProperty) => {
        dispatch(updateClassPropetry({
            ...classProperty,
            name: newPropertyName
        }));
    };

    const editProperties = () => {
        return selectedClassProperties.map((classProperty, index) => {
            return (
                <div key={index}>
                    <input
                        type='text'
                        value={classProperty.name}
                        onChange={(ev) => updateProperty(ev.target.value, classProperty)}
                    />
                    <button onClick={(ev) => removeProperty(classProperty)}>Remove</button>
                </div>
            );
        });        
    };

    const editMethods = () => {
        return selectedClassMethods.map((classMethod, index) => {
            return (
                <div key={index}>
                    <input
                        type='text'
                        value={classMethod.name}
                        onChange={(ev) => updateMethod(ev.target.value, classMethod)}
                    />
                    <button onClick={(ev) => removeMethod(classMethod)} >Remove</button>
                </div>
            );
        });
    };

    const addNewClassProperties = () => {
        log.debug(`Added new Class Property. Class Id: ${props.class.id}`);
        const newPropertyId = v4();
        dispatch(addNewClassProperty({
            id: newPropertyId,
            accessModifier: AccessModifierEnum.PUBLIC,
            name: ''
        }));
        const updatedClass: IClass = {...props.class};
        updatedClass.data.classPropertyIds.push(newPropertyId);
        dispatch(updateClass(updateClassGraphic(updatedClass)));
    };

    const addNewClassMethods = () => {
        log.debug(`Added new Class Method. Class Id: ${props.class.id}`);
        const newMethodId = v4();
        dispatch(addNewClassMethod({
            id: newMethodId,
            accessModifier: AccessModifierEnum.PUBLIC,
            name: ''
        }));
        const updatedClass: IClass = {...props.class};
        updatedClass.data.classMethodIds.push(newMethodId);
        dispatch(updateClass(updateClassGraphic(updatedClass)));
    };

    const onClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedClass: IClass = {...props.class};
        updatedClass.data.className = event.target.value;
        dispatch(updateClass(updateClassGraphic(updatedClass)));
    };

    return (
        <div>
            <p>{props.class.type}</p>
            <p>Class Name</p>
            <input
                value={data.className}
                onChange={(ev) => onClassNameChange(ev)}
                type='text'
            />
            <p>Class Properties</p>
            {editProperties()}
            <button onClick={(ev) => addNewClassProperties()}>Add</button>
            <p>Class Methods</p>
            {editMethods()}
            <button onClick={(ev) => addNewClassMethods()}>Add</button>
        </div>
    );
}

export default ClassEditOptions;