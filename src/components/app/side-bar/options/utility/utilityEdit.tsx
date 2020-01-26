import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IUtility from '@interfaces/class-diagram/utility/IUtility';
import {  useDispatch } from 'react-redux';
import IUtilityProperty from '@interfaces/class-diagram/utility/IUtilityProperty';
import IUtilityMethod from '@interfaces/class-diagram/utility/IUtilityMethod';
import AccessModifierEnum from '@enums/accessModifierEnum';
import ClassAttributeRow from '../class/classAttributeRow';
import log = require('loglevel');
import { v4 } from 'uuid';
import FrameEdit from '../common/frameEdit';
import ClassMethodEdit from '../class/classMethodEdit';
import ClassProperyEdit from '../class/classPropertyEdit';
import { updateUtilityGraphicData } from '@utils/elements/utility';
import { updateElement, addNewElementEntry, removeElementEntry, updateElementEntry } from '@store/actions/classDiagram.action';
import EntryTypeEnum from '@enums/EntryTypeEnum';

const UtilityEdit = (props: { utility: IUtility, properties: Array<IUtilityProperty>, methods: Array<IUtilityMethod> }) => {
    const dispatch = useDispatch();
    const { data } = props.utility;
    const { methods, properties } = props;

    const updateGraphic = (utilityElement: IUtility): IUtility => updateUtilityGraphicData(utilityElement, properties.length, methods.length);
    
    const removeEntry = (entry: IUtilityProperty | IUtilityMethod) => {
        const updatedInterface = {...props.utility};
        updatedInterface.data.entryIds.splice(updatedInterface.data.entryIds.indexOf(entry.id), 1);
        dispatch(updateElement(updateGraphic(updatedInterface)));
        dispatch(removeElementEntry(entry));
    };
    
    const updateEntry = (newMethodName: string, entry: IUtilityMethod | IUtilityProperty) => {
        dispatch(updateElementEntry({
            ...entry,
            name: newMethodName
        }));
    };
   
    const editProperties = () => {
        return properties.map((property, index) => {
            const newClassProperty = {...property};
            const onSelectNewOption = (newAccessModifier: AccessModifierEnum) => {
                newClassProperty.accessModifier = newAccessModifier;
                updateEntry(newClassProperty.name, newClassProperty);
            };

            return (
                <ClassAttributeRow
                    key={index}
                    classAttribute={property}
                    placeHolder='Property'
                    removeAttribute={removeEntry}
                    onSelectNewOption={onSelectNewOption}
                    updateAttribute={updateEntry}
                />
            );
        });        
    };
    
    const editMethods = () => {
        return methods.map((method, index) => {
            const newClassMethod = {...method};
            const onSelectNewOption = (newAccessModifier: AccessModifierEnum) => {
                newClassMethod.accessModifier = newAccessModifier;
                updateEntry(newClassMethod.name, newClassMethod);
            };
            
            return (
                <ClassAttributeRow
                    key={index}
                    classAttribute={method}
                    placeHolder='Methods'
                    removeAttribute={removeEntry}
                    onSelectNewOption={onSelectNewOption}
                    updateAttribute={updateEntry}
                />
            );
        });
    };
    const addNewProperty = () => {
        log.debug(`Added new Utility Property. Class Id: ${props.utility.id}`);
        const newPropertyId = v4();
        dispatch(addNewElementEntry({
            id: newPropertyId,
            value: '',
            type: EntryTypeEnum.PROPERTY,
            accessModifier: AccessModifierEnum.PUBLIC,
        }));
        const updatedClass = {...props.utility};
        updatedClass.data.entryIds.push(newPropertyId);
        dispatch(updateElement(updateGraphic(updatedClass)));
    };

    const addNewMethod = () => {
        log.debug(`Added new Utility Method. Class Id: ${props.utility.id}`);
        const newMethodId = v4();
        dispatch(addNewElementEntry({
            id: newMethodId,
            value: '',
            type: EntryTypeEnum.METHOD,
            accessModifier: AccessModifierEnum.PUBLIC
        }));
        const updatedUtility = {...props.utility};
        updatedUtility.data.entryIds.push(newMethodId);
        dispatch(updateElement(updateGraphic(updatedUtility)));
    };

    const onClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedUtility = {...props.utility};
        updatedUtility.data.elementName = event.target.value;
        dispatch(updateElement(updateGraphic(updatedUtility)));
    };

    return (
        <FrameEdit inputLabel='Utility Name' frameName={data.elementName} onNameChange={(ev) => onClassNameChange(ev)}>
            <ClassMethodEdit addNewProperty={addNewProperty} editProperties={editProperties}/>
            <ClassProperyEdit addNewMethod={addNewMethod} editMethods={editMethods}/>
        </FrameEdit>
    );
};

export default UtilityEdit;