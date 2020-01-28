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
import { updateUtilityGraphicData } from '@utils/elements/utility';
import { updateElement, addNewElementEntry, removeElementEntry, updateElementEntry } from '@store/actions/classDiagram.action';
import EntryTypeEnum from '@enums/EntryTypeEnum';
import ClassPropertyEdit from '../class/classPropertyEdit';
import ClassMethodEdit from '../class/classMethodEdit';

const UtilityEdit = (props: { utility: IUtility, properties: Array<IUtilityProperty>, methods: Array<IUtilityMethod> }) => {
    const dispatch = useDispatch();
    const { data } = props.utility;
    const { methods, properties } = props;

    const updateGraphic = (utilityElement: IUtility, propertiesLength: number, methodsLength: number): IUtility => {
        return updateUtilityGraphicData(utilityElement, propertiesLength, methodsLength);
    };
    
    const removeEntry = (entry: IUtilityProperty | IUtilityMethod) => {
        const updatedInterface = {...props.utility};
        let propertiesLength = properties.length;
        let methodsLength = methods.length;
        entry.type === EntryTypeEnum.PROPERTY ? propertiesLength-- : methodsLength--;
        updatedInterface.data.entryIds.splice(updatedInterface.data.entryIds.indexOf(entry.id), 1);
        dispatch(updateElement(updateGraphic(updatedInterface, propertiesLength, methodsLength)));
        dispatch(removeElementEntry(entry));
    };
    
    const updateEntry = (newMethodName: string, entry: IUtilityMethod | IUtilityProperty) => {
        dispatch(updateElementEntry({
            ...entry,
            value: newMethodName
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
    const addNewEntry = (entryType: EntryTypeEnum) => {
        log.debug(`Added new Utility Entry. Class Id: ${props.utility.id}`);
        const newPropertyId = v4();
        dispatch(addNewElementEntry({
            id: newPropertyId,
            value: '',
            type: entryType,
            accessModifier: AccessModifierEnum.PUBLIC,
        }));
        const updatedClass = {...props.utility};
        updatedClass.data.entryIds.push(newPropertyId);
        let propertiesLength = properties.length;
        let methodsLength = methods.length;
        entryType === EntryTypeEnum.PROPERTY ? propertiesLength++ : methodsLength++;
        dispatch(updateElement(updateGraphic(updatedClass, propertiesLength, methodsLength)));
    };

    const onClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedUtility = {...props.utility};
        updatedUtility.data.elementName = event.target.value;
        dispatch(updateElement(updateGraphic(updatedUtility, properties.length, methods.length)));
    };

    return (
        <FrameEdit inputLabel='Utility Name' frameName={data.elementName} onNameChange={(ev) => onClassNameChange(ev)}>
            <ClassPropertyEdit addNewEntry={addNewEntry} editProperties={editProperties}/>
            <ClassMethodEdit addNewEntry={addNewEntry} editMethods={editMethods}/>
        </FrameEdit>
    );
};

export default UtilityEdit;