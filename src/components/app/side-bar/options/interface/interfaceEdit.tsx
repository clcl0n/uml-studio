import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import { useDispatch, useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import AccessModifierEnum from '@enums/accessModifierEnum';
import IInterfaceMethod from '@interfaces/class-diagram/interface/IInterfaceMethod';
import IInterfaceProperty from '@interfaces/class-diagram/interface/IInterfaceProperty';
import ClassAttributeRow from '../class/classAttributeRow';
import log = require('loglevel');
import { v4 } from 'uuid';
import FrameEdit from '../common/frameEdit';
import ClassMethodEdit from '../class/classMethodEdit';
import ClassProperyEdit from '../class/classPropertyEdit';
import { updateInterfaceGraphicData } from '@utils/elements/interface';
import { removeElementEntry, updateElement, updateElementEntry, addNewElementEntry } from '@store/actions/classDiagram.action';
import EntryTypeEnum from '@enums/EntryTypeEnum';

const InterfaceEdit = (props: { interface: IInterface, properties: Array<IInterfaceProperty>, methods: Array<IInterfaceMethod> }) => {
    const dispatch = useDispatch();
    const { data } = props.interface;
    const { methods, properties } = props;

    const updateGraphic = (interfaceElement: IInterface): IInterface => updateInterfaceGraphicData(interfaceElement, properties.length, methods.length);        
        
    const removeEntry = (classProperty: IInterfaceProperty | IInterfaceMethod) => {
        const updatedInterface = {...props.interface};
        updatedInterface.data.entryIds.splice(updatedInterface.data.entryIds.indexOf(classProperty.id), 1);
        dispatch(updateElement(updateGraphic(updatedInterface)));
        dispatch(removeElementEntry(classProperty));
    };
    
    const updateEntry = (newMethodName: string, classMethod: IInterfaceMethod | IInterfaceProperty) => {
        dispatch(updateElementEntry({
            ...classMethod,
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
        log.debug(`Added new Interface Property. Class Id: ${props.interface.id}`);
        const newPropertyId = v4();
        dispatch(addNewElementEntry({
            id: newPropertyId,
            value: '',
            type: EntryTypeEnum.PROPERTY,
            accessModifier: AccessModifierEnum.PUBLIC
        }));
        const updatedClass = {...props.interface};
        updatedClass.data.entryIds.push(newPropertyId);
        dispatch(updateElement(updateGraphic(updatedClass)));
    };

    const addNewMethod = () => {
        log.debug(`Added new Interface Method. Class Id: ${props.interface.id}`);
        const newMethodId = v4();
        dispatch(addNewElementEntry({
            id: newMethodId,
            value: '',
            type: EntryTypeEnum.METHOD,
            accessModifier: AccessModifierEnum.PUBLIC
        }));
        const updatedInterface = {...props.interface};
        updatedInterface.data.entryIds.push(newMethodId);
        dispatch(updateElement(updateGraphic(updatedInterface)));
    };

    const onClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedInterface = {...props.interface};
        updatedInterface.data.elementName = event.target.value;
        dispatch(updateElement(updateGraphic(updatedInterface)));
    };

    return (
        <FrameEdit inputLabel='Interface Name' frameName={data.elementName} onNameChange={(ev) => onClassNameChange(ev)}>
            <ClassMethodEdit addNewProperty={addNewProperty} editProperties={editProperties}/>
            <ClassProperyEdit addNewMethod={addNewMethod} editMethods={editMethods}/>
        </FrameEdit>
    );
};

export default InterfaceEdit;