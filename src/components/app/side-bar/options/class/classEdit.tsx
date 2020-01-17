import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as log from 'loglevel';
import IClass from '@interfaces/class-diagram/class/IClass';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import { addNewClassProperty, updateClass, addNewClassMethod, updateClassMethod, updateClassProperty, removeClassMethod, removeClassProperty } from '@store/actions/classDiagram';
import { v4 } from 'uuid';
import IStoreState from '@interfaces/IStoreState';
import AccessModifierEnum from '@enums/accessModifierEnum';
import './class-edit.scss';
import FrameEdit from '../common/frameEdit';
import ClassMethodEdit from './classMethodEdit';
import ClassProperyEdit from './classPropertyEdit';
import ClassAttributeRow from './classAttributeRow';
import { updateClassGraphicData } from '@utils/elements/class';

const ClassEditOptions = (props: { class: IClass }) => {
    const dispatch = useDispatch();
    const { data } = props.class;
    const selectedClassMethods = useSelector((state: IStoreState) => data.classMethodIds.map((id) => {
        return state.umlClassDiagram.classMethods.byId[id];
    }));
    const selectedClassProperties = useSelector((state: IStoreState) => data.classPropertyIds.map((id) => {
        return state.umlClassDiagram.classProperties.byId[id];
    }));

    const updateGraphic = (classElement: IClass): IClass =>  updateClassGraphicData(classElement);

    const removeProperty = (classProperty: IClassProperty) => {
        const updatedClass = {...props.class};
        updatedClass.data.classPropertyIds.splice(updatedClass.data.classPropertyIds.indexOf(classProperty.id), 1);
        dispatch(updateClass(updateGraphic(updatedClass)));
        dispatch(removeClassProperty(classProperty));
    };

    const removeMethod = (classMethod: IClassMethod) => {
        const updatedClass = {...props.class};
        updatedClass.data.classMethodIds.splice(updatedClass.data.classMethodIds.indexOf(classMethod.id), 1);
        dispatch(updateClass(updateGraphic(updatedClass)));
        dispatch(removeClassMethod(classMethod));
    };
    
    const updateMethod = (newMethodName: string, classMethod: IClassMethod) => {
        dispatch(updateClassMethod({
            ...classMethod,
            name: newMethodName
        }));
    };

    const updateProperty = (newPropertyName: string, classProperty: IClassProperty) => {
        dispatch(updateClassProperty({
            ...classProperty,
            name: newPropertyName
        }));
    };

    const editProperties = () => {
        return selectedClassProperties.map((property, index) => {
            const newClassProperty = {...property};
            const onSelectNewOption = (newAccessModifier: AccessModifierEnum) => {
                newClassProperty.accessModifier = newAccessModifier;
                updateProperty(newClassProperty.name, newClassProperty);
            };

            return (
                <ClassAttributeRow
                    key={index}
                    classAttribute={property}
                    placeHolder='Property'
                    removeAttribute={removeProperty}
                    onSelectNewOption={onSelectNewOption}
                    updateAttribute={updateProperty}
                />
            );
        });        
    };

    const editMethods = () => {
        return selectedClassMethods.map((method, index) => {
            const newClassMethod = {...method};
            const onSelectNewOption = (newAccessModifier: AccessModifierEnum) => {
                newClassMethod.accessModifier = newAccessModifier;
                updateMethod(newClassMethod.name, newClassMethod);
            };
            
            return (
                <ClassAttributeRow
                    key={index}
                    classAttribute={method}
                    placeHolder='Methods'
                    removeAttribute={removeMethod}
                    onSelectNewOption={onSelectNewOption}
                    updateAttribute={updateMethod}
                />
            );
        });
    };

    const addNewProperty = () => {
        log.debug(`Added new Class Property. Class Id: ${props.class.id}`);
        const newPropertyId = v4();
        dispatch(addNewClassProperty({
            id: newPropertyId,
            accessModifier: AccessModifierEnum.PUBLIC,
            name: ''
        }));
        const updatedClass: IClass = {...props.class};
        updatedClass.data.classPropertyIds.push(newPropertyId);
        dispatch(updateClass(updateGraphic(updatedClass)));
    };

    const addNewMethod = () => {
        log.debug(`Added new Class Method. Class Id: ${props.class.id}`);
        const newMethodId = v4();
        dispatch(addNewClassMethod({
            id: newMethodId,
            accessModifier: AccessModifierEnum.PUBLIC,
            name: ''
        }));
        const updatedClass: IClass = {...props.class};
        updatedClass.data.classMethodIds.push(newMethodId);
        dispatch(updateClass(updateGraphic(updatedClass)));
    };

    const onClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedClass: IClass = {...props.class};
        updatedClass.data.className = event.target.value;
        dispatch(updateClass(updateGraphic(updatedClass)));
    };

    return (
        <FrameEdit inputLabel='Class Name' frameName={data.className} onNameChange={(ev) => onClassNameChange(ev)}>
            <ClassMethodEdit addNewProperty={addNewProperty} editProperties={editProperties}/>
            <ClassProperyEdit addNewMethod={addNewMethod} editMethods={editMethods}/>
        </FrameEdit>
    );
};

export default ClassEditOptions;