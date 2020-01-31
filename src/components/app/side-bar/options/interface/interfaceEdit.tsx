import React from 'react';
import ReactDOM from 'react-dom';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import { useDispatch } from 'react-redux';
import AccessModifierEnum from '@enums/accessModifierEnum';
import IInterfaceMethod from '@interfaces/class-diagram/interface/IInterfaceMethod';
import IInterfaceProperty from '@interfaces/class-diagram/interface/IInterfaceProperty';
import ClassAttributeRow from '../class/classAttributeRow';
import log = require('loglevel');
import { v4 } from 'uuid';
import FrameEdit from '../common/frameEdit';
import { updateInterfaceGraphicData } from '@utils/elements/interface';
import { removeElementEntry, updateElement, updateElementEntry, addNewElementEntry } from '@store/actions/classDiagram.action';
import EntryTypeEnum from '@enums/EntryTypeEnum';
import ClassPropertyEdit from '../class/classPropertyEdit';
import ClassMethodEdit from '../class/classMethodEdit';

const InterfaceEdit = (props: { interface: IInterface, properties: Array<IInterfaceProperty>, methods: Array<IInterfaceMethod> }) => {
    const dispatch = useDispatch();
    const { data } = props.interface;
    const { methods, properties } = props;

    const updateGraphic = (interfaceElement: IInterface, propertiesLength: number, methodsLength: number): IInterface => {
        return updateInterfaceGraphicData(interfaceElement, propertiesLength, methodsLength);
    };       
        
    const removeEntry = (entry: IInterfaceProperty | IInterfaceMethod) => {
        const updatedInterface = {...props.interface};
        let propertiesLength = properties.length;
        let methodsLength = methods.length;
        entry.type === EntryTypeEnum.PROPERTY ? propertiesLength-- : methodsLength--;
        updatedInterface.data.entryIds.splice(updatedInterface.data.entryIds.indexOf(entry.id), 1);
        dispatch(updateElement(updateGraphic(updatedInterface, propertiesLength, methodsLength)));
        dispatch(removeElementEntry(entry));
    };
    
    const updateEntry = (newMethodName: string, classMethod: IInterfaceMethod | IInterfaceProperty) => {
        dispatch(updateElementEntry({
            ...classMethod,
            value: newMethodName
        }));
    };

    const editProperties = () => {
        return properties.map((property, index) => {
            const newClassProperty = {...property};
            const onSelectNewOption = (newAccessModifier: AccessModifierEnum) => {
                newClassProperty.accessModifier = newAccessModifier;
                updateEntry(newClassProperty.value, newClassProperty);
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
                updateEntry(newClassMethod.value, newClassMethod);
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
        log.debug(`Added new Interface Entry. Class Id: ${props.interface.id}`);
        const newMethodId = v4();
        dispatch(addNewElementEntry({
            id: newMethodId,
            value: '',
            type: entryType,
            accessModifier: AccessModifierEnum.PUBLIC
        }));
        const updatedInterface = {...props.interface};
        updatedInterface.data.entryIds.push(newMethodId);
        let propertiesLength = properties.length;
        let methodsLength = methods.length;
        entryType === EntryTypeEnum.PROPERTY ? propertiesLength++ : methodsLength++;
        dispatch(updateElement(updateGraphic(updatedInterface, propertiesLength, methodsLength)));
    };

    const onClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedInterface = {...props.interface};
        updatedInterface.data.elementName = event.target.value;
        dispatch(updateElement(updateGraphic(updatedInterface, properties.length, methods.length)));
    };

    return (
        <FrameEdit inputLabel='Interface Name' frameName={data.elementName} onNameChange={(ev) => onClassNameChange(ev)}>
            <ClassPropertyEdit addNewEntry={addNewEntry} editProperties={editProperties}/>
            <ClassMethodEdit addNewEntry={addNewEntry} editMethods={editMethods}/>
        </FrameEdit>
    );
};

export default InterfaceEdit;