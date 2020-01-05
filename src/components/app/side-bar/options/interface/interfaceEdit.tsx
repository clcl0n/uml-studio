import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import { useDispatch, useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import AccessModifierEnum from '@enums/accessModifierEnum';
import IInterfaceMethod from '@interfaces/class-diagram/interface/IInterfaceMethod';
import IInterfaceProperty from '@interfaces/class-diagram/interface/IInterfaceProperty';
import { updateInterface, removeInterfaceProperty, removeInterfaceMethod, updateInterfaceMethod, updateInterfaceProperty, addNewInterfaceProperty, addNewInterfaceMethod } from '@store/actions/classDiagram';
import ClassAttributeRow from '../class/classAttributeRow';
import log = require('loglevel');
import { v4 } from 'uuid';
import FrameEdit from '../common/frameEdit';
import ClassMethodEdit from '../class/classMethodEdit';
import ClassProperyEdit from '../class/classPropertyEdit';
import updateInterfaceGraphicDataHelper from 'utils/classDiagramHelper/interface/updateInterfaceGraphicDataHelper';

const InterfaceEdit = (props: { interface: IInterface }) => {
    const dispatch = useDispatch();
    const { data } = props.interface;
    const selectedInterfaceMethods = useSelector((state: IStoreState) => data.interfaceMethodIds.map((id) => {
        return state.umlClassDiagram.interfaceMethods.byId[id];
    }));
    const selectedInterfaceProperties = useSelector((state: IStoreState) => data.interfacePropertyIds.map((id) => {
        return state.umlClassDiagram.interfaceProperties.byId[id];
    }));
    const updateGraphic = (interfaceElement: IInterface): IInterface => updateInterfaceGraphicDataHelper(interfaceElement);        
        
    const removeProperty = (classProperty: IInterfaceProperty) => {
        const updatedInterface = {...props.interface};
        updatedInterface.data.interfacePropertyIds.splice(updatedInterface.data.interfacePropertyIds.indexOf(classProperty.id), 1);
        dispatch(updateInterface(updateGraphic(updatedInterface)));
        dispatch(removeInterfaceProperty(classProperty));
    };

    const removeMethod = (interfaceMethod: IInterfaceMethod) => {
        const updatedInterface = {...props.interface};
        updatedInterface.data.interfaceMethodIds.splice(updatedInterface.data.interfaceMethodIds.indexOf(interfaceMethod.id), 1);
        dispatch(updateInterface(updateGraphic(updatedInterface)));
        dispatch(removeInterfaceMethod(interfaceMethod));
    };
    
    const updateMethod = (newMethodName: string, classMethod: IInterfaceMethod) => {
        dispatch(updateInterfaceMethod({
            ...classMethod,
            name: newMethodName
        }));
    };

    const updateProperty = (newPropertyName: string, classProperty: IInterfaceProperty) => {
        dispatch(updateInterfaceProperty({
            ...classProperty,
            name: newPropertyName
        }));
    };

    const editProperties = () => {
        return selectedInterfaceProperties.map((property, index) => {
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
        return selectedInterfaceMethods.map((method, index) => {
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
        log.debug(`Added new Interface Property. Class Id: ${props.interface.id}`);
        const newPropertyId = v4();
        dispatch(addNewInterfaceProperty({
            id: newPropertyId,
            accessModifier: AccessModifierEnum.PUBLIC,
            name: ''
        }));
        const updatedClass = {...props.interface};
        updatedClass.data.interfacePropertyIds.push(newPropertyId);
        dispatch(updateInterface(updateGraphic(updatedClass)));
    };

    const addNewMethod = () => {
        log.debug(`Added new Interface Method. Class Id: ${props.interface.id}`);
        const newMethodId = v4();
        dispatch(addNewInterfaceMethod({
            id: newMethodId,
            accessModifier: AccessModifierEnum.PUBLIC,
            name: ''
        }));
        const updatedInterface = {...props.interface};
        updatedInterface.data.interfaceMethodIds.push(newMethodId);
        dispatch(updateInterface(updateGraphic(updatedInterface)));
    };

    const onClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedInterface = {...props.interface};
        updatedInterface.data.interfaceName = event.target.value;
        dispatch(updateInterface(updateGraphic(updatedInterface)));
    };

    return (
        <FrameEdit inputLabel='Interface Name' frameName={data.interfaceName} onNameChange={(ev) => onClassNameChange(ev)}>
            <ClassMethodEdit addNewProperty={addNewProperty} editProperties={editProperties}/>
            <ClassProperyEdit addNewMethod={addNewMethod} editMethods={editMethods}/>
        </FrameEdit>
    );
};

export default InterfaceEdit;