import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as log from 'loglevel';
import IClass from '@interfaces/class-diagram/class/IClass';
import IClassPropertyData from '@interfaces/class-diagram/class/IClassPropertyData';
import IClassMethodData from '@interfaces/class-diagram/class/IClassMethodData';
import { addNewClassProperty, updateClass, addNewClassMethod, updateClassMethod, updateClassPropetry, removeClassMethod, removeClassProperty } from '@store/actions/classDiagram';
import { v4 } from 'uuid';
import IStoreState from '@interfaces/IStoreState';

const ClassEditOptions = (props: { class: IClass }) => {
    const dispatch = useDispatch();
    const selectedClassMethods = useSelector((state: IStoreState) => props.class.classMethodIds.map((id) => {
        return state.umlClassDiagram.classMethods.byId[id];
    }));
    const selectedClassProperties = useSelector((state: IStoreState) => props.class.classPropertyIds.map((id) => {
        return state.umlClassDiagram.classProperties.byId[id];
    }));

    const updateClassGraphic = (classElement: IClass): IClass => {
        classElement.sections.methods.y = classElement.y + (
            (classElement.classPropertyIds.length + 1) * classElement.rowHeight
        );

        classElement.height = (
            classElement.classPropertyIds.length + classElement.classMethodIds.length + 1
        ) * classElement.rowHeight;
        
        return classElement;
    };

    const removeProperty = (classProperty: IClassPropertyData) => {
        const updatedClass = {...props.class};
        updatedClass.classPropertyIds.splice(updatedClass.classPropertyIds.indexOf(classProperty.id, 1));
        dispatch(updateClass(updateClassGraphic(updatedClass)));
        dispatch(removeClassProperty(classProperty));
    };

    const removeMethod = (classMethod: IClassMethodData) => {
        const updatedClass = {...props.class};
        updatedClass.classMethodIds.splice(updatedClass.classMethodIds.indexOf(classMethod.id), 1);
        dispatch(updateClass(updateClassGraphic(updatedClass)));
        dispatch(removeClassMethod(classMethod));
    };
    
    const updateMethod = (newMethodName: string, classMethod: IClassMethodData) => {
        dispatch(updateClassMethod({
            ...classMethod,
            name: newMethodName
        }));
    };

    const updateProperty = (newPropertyName: string, classProperty: IClassPropertyData) => {
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
            accessModifier: 'public',
            name: ''
        }));
        const updatedClass: IClass = {...props.class};
        updatedClass.classPropertyIds.push(newPropertyId);
        dispatch(updateClass(updateClassGraphic(updatedClass)));
    };

    const addNewClassMethods = () => {
        log.debug(`Added new Class Method. Class Id: ${props.class.id}`);
        const newMethodId = v4();
        dispatch(addNewClassMethod({
            id: newMethodId,
            accessModifier: 'public',
            name: ''
        }));
        const updatedClass: IClass = {...props.class};
        updatedClass.classMethodIds.push(newMethodId);
        dispatch(updateClass(updateClassGraphic(updatedClass)));
    };

    const onClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedClass: IClass = {...props.class};
        updatedClass.className = event.target.value;
        dispatch(updateClass(updateClassGraphic(updatedClass)));
    };

    return (
        <div>
            <p>{props.class.type}</p>
            <p>Class Name</p>
            <input
                value={props.class.className}
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