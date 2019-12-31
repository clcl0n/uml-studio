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
import TextOptions from '@components/app/common/textOptions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './class-edit.scss';

const ClassEditOptions = (props: { class: IClass }) => {
    const dispatch = useDispatch();
    const { data } = props.class;
    const selectedClassMethods = useSelector((state: IStoreState) => data.classMethodIds.map((id) => {
        return state.umlClassDiagram.classMethods.byId[id];
    }));
    const accessModifiers = Object.values(AccessModifierEnum).map((value) => value.toLowerCase());
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
        updatedClass.data.classPropertyIds.splice(updatedClass.data.classPropertyIds.indexOf(classProperty.id), 1);
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

    const classAttributeRow = (
        key: number,
        classAttribute: IClassProperty | IClassMethod,
        placeHolder: string,
        removeAttribute: (attribute: IClassProperty | IClassMethod) => void,
        onSelectNewOption: (option: AccessModifierEnum) => void,
        updateAttribute: (newPropertyName: string, classProperty: IClassProperty) => void
    ) => {
        return (
            <tr key={key}>
                <td>
                    <TextOptions onSelectNewOption={(option) => onSelectNewOption(option.toUpperCase() as AccessModifierEnum)} defaultOption={classAttribute.accessModifier.toLowerCase()} options={accessModifiers}/>
                </td>
                <td>
                    <input
                        type='text'
                        className='input'
                        placeholder={placeHolder}
                        value={classAttribute.name}
                        onChange={(ev) => updateAttribute(ev.target.value, classAttribute)}
                    />
                </td>
                <td>
                    <FontAwesomeIcon onClick={(ev) => removeAttribute(classAttribute)} className='icon' icon='trash-alt'/>
                </td>
            </tr>
        );
    };

    const editProperties = () => {
        return selectedClassProperties.map((classProperty, index) => {
            const newClassProperty = {...classProperty};
            const onSelectNewOption = (newAccessModifier: AccessModifierEnum) => {
                newClassProperty.accessModifier = newAccessModifier;
                updateProperty(newClassProperty.name, newClassProperty);
            };

            return classAttributeRow(
                index,
                classProperty,
                'Property',
                removeProperty,
                onSelectNewOption,
                updateProperty
            );  
        });        
    };

    const editMethods = () => {
        return selectedClassMethods.map((classMethod, index) => {
            const newClassMethod = {...classMethod};
            const onSelectNewOption = (newAccessModifier: AccessModifierEnum) => {
                newClassMethod.accessModifier = newAccessModifier;
                updateMethod(newClassMethod.name, newClassMethod);
            };
            
            return classAttributeRow(
                index,
                classMethod,
                'Methods',
                removeMethod,
                onSelectNewOption,
                updateMethod
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
        <div className='container' style={{margin: '10px'}}>
            <div className='field'>
                <label className='label'>Class Name</label>
                <div className='control'>
                    <input
                        value={data.className}
                        onChange={(ev) => onClassNameChange(ev)}
                        type='text'
                        className='input'
                        placeholder='Class name'
                    />
                </div>
            </div>
            <label className='label'>Properties</label>
            <table className='table is-fullwidth'>
                <thead className='has-background-grey-light is-size-6'>
                    <tr>
                        <th>Modifier</th>
                        <th>Property</th>
                        <th>
                            <FontAwesomeIcon onClick={(ev) => addNewClassProperties()} icon='plus'/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {editProperties()}
                </tbody>
            </table>
            <label className='label'>Methods</label>
            <table className='table is-fullwidth'>
                <thead className='has-background-grey-light is-size-6'>
                    <tr>
                        <th>Modifier</th>
                        <th>Property</th>
                        <th>
                            <FontAwesomeIcon onClick={(ev) => addNewClassMethods()} icon='plus'/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {editMethods()}
                </tbody>
            </table>
        </div>
    );
};

export default ClassEditOptions;