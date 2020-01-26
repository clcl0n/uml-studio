import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as log from 'loglevel';
import IClass from '@interfaces/class-diagram/class/IClass';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import { v4 } from 'uuid';
import IStoreState from '@interfaces/IStoreState';
import AccessModifierEnum from '@enums/accessModifierEnum';
import './class-edit.scss';
import FrameEdit from '../common/frameEdit';
import ClassMethodEdit from './classMethodEdit';
import ClassProperyEdit from './classPropertyEdit';
import ClassAttributeRow from './classAttributeRow';
import { updateClassGraphicData } from '@utils/elements/class';
import { addNewElementEntry, updateElement, removeElementEntry, updateElementEntry } from '@store/actions/classDiagram.action';
import EntryTypeEnum from '@enums/EntryTypeEnum';

const ClassEditOptions = (props: { class: IClass, properties: Array<IClassProperty>, methods: Array<IClassMethod> }) => {
    const dispatch = useDispatch();
    const { data } = props.class;
    const { methods, properties } = props;

    const updateGraphic = (classElement: IClass): IClass =>  updateClassGraphicData(classElement, properties.length, methods.length);

    const removeProperty = (classProperty: IClassProperty) => {
        const updatedClass = {...props.class};
        updatedClass.data.entryIds.splice(updatedClass.data.entryIds.indexOf(classProperty.id), 1);
        dispatch(updateElement(updateGraphic(updatedClass)));
        dispatch(removeElementEntry(classProperty));
    };

    const removeMethod = (classMethod: IClassMethod) => {
        const updatedClass = {...props.class};
        updatedClass.data.entryIds.splice(updatedClass.data.entryIds.indexOf(classMethod.id), 1);
        dispatch(updateElement(updateGraphic(updatedClass)));
        dispatch(removeElementEntry(classMethod));
    };
    
    const updateMethod = (newMethodName: string, classMethod: IClassMethod) => {
        dispatch(updateElementEntry({
            ...classMethod,
            name: newMethodName
        }));
    };

    const updateProperty = (newPropertyName: string, classProperty: IClassProperty) => {
        dispatch(updateElementEntry({
            ...classProperty,
            name: newPropertyName
        }));
    };

    const editProperties = () => {
        return properties.map((property, index) => {
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
        return methods.map((method, index) => {
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
        dispatch(addNewElementEntry({
            id: newPropertyId,
            value: '',
            type: EntryTypeEnum.PROPERTY,
            accessModifier: AccessModifierEnum.PUBLIC,
        }));
        const updatedClass: IClass = {...props.class};
        updatedClass.data.entryIds.push(newPropertyId);
        dispatch(updateElement(updateGraphic(updatedClass)));
    };

    const addNewMethod = () => {
        log.debug(`Added new Class Method. Class Id: ${props.class.id}`);
        const newMethodId = v4();
        dispatch(addNewElementEntry({
            id: newMethodId,
            value: '',
            type: EntryTypeEnum.METHOD,
            accessModifier: AccessModifierEnum.PUBLIC,
        }));
        const updatedClass: IClass = {...props.class};
        updatedClass.data.entryIds.push(newMethodId);
        dispatch(updateElement(updateGraphic(updatedClass)));
    };

    const onClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedClass: IClass = {...props.class};
        updatedClass.data.elementName = event.target.value;
        dispatch(updateElement(updateGraphic(updatedClass)));
    };

    return (
        <FrameEdit inputLabel='Class Name' frameName={data.elementName} onNameChange={(ev) => onClassNameChange(ev)}>
            <ClassMethodEdit addNewProperty={addNewProperty} editProperties={editProperties}/>
            <ClassProperyEdit addNewMethod={addNewMethod} editMethods={editMethods}/>
        </FrameEdit>
    );
};

export default ClassEditOptions;