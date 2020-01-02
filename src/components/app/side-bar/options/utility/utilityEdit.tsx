import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IUtility from '@interfaces/class-diagram/utility/IUtility';
import { useSelector, useDispatch } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import IUtilityProperty from '@interfaces/class-diagram/utility/IUtilityProperty';
import { updateUtility, removeUtilityProperty, updateUtilityMethod, updateUtilityProperty, addNewUtilityProperty, addNewUtilityMethod } from '@store/actions/classDiagram';
import IUtilityMethod from '@interfaces/class-diagram/utility/IUtilityMethod';
import AccessModifierEnum from '@enums/accessModifierEnum';
import ClassAttributeRow from '../class/classAttributeRow';
import log = require('loglevel');
import { v4 } from 'uuid';
import FrameEdit from '../common/frameEdit';
import ClassMethodEdit from '../class/classMethodEdit';
import ClassProperyEdit from '../class/classPropertyEdit';

const UtilityEdit = (props: { utility: IUtility }) => {
    const dispatch = useDispatch();
    const { data } = props.utility;
    const selectedMethods = useSelector((state: IStoreState) => data.utilityMethodIds.map((id) => {
        return state.umlClassDiagram.utilityMethods.byId[id];
    }));
    const selectedProperties = useSelector((state: IStoreState) => data.utilityPropertyIds.map((id) => {
        return state.umlClassDiagram.utilityProperties.byId[id];
    }));
    const updateGraphic = (interfaceElement: IUtility): IUtility => {
        interfaceElement.graphicData.sections.methods.y = interfaceElement.graphicData.frame.y + (
            (data.utilityPropertyIds.length + 1) * interfaceElement.graphicData.frame.rowHeight
        );

        interfaceElement.graphicData.frame.height = (
            data.utilityPropertyIds.length + data.utilityMethodIds.length + 1
        ) * interfaceElement.graphicData.frame.rowHeight;
        
        return interfaceElement;
    };
    const removeProperty = (classProperty: IUtilityProperty) => {
        const updatedInterface = {...props.utility};
        updatedInterface.data.utilityPropertyIds.splice(updatedInterface.data.utilityPropertyIds.indexOf(classProperty.id), 1);
        dispatch(updateUtility(updateGraphic(updatedInterface)));
        dispatch(removeUtilityProperty(classProperty));
    };
    const removeMethod = (interfaceMethod: IUtilityMethod) => {
        const updatedInterface = {...props.utility};
        updatedInterface.data.utilityMethodIds.splice(updatedInterface.data.utilityMethodIds.indexOf(interfaceMethod.id), 1);
        dispatch(updateUtility(updateGraphic(updatedInterface)));
    };
    const updateMethod = (newMethodName: string, classMethod: IUtilityMethod) => {
        dispatch(updateUtilityMethod({
            ...classMethod,
            name: newMethodName
        }));
    };

    const updateProperty = (newPropertyName: string, classProperty: IUtilityProperty) => {
        dispatch(updateUtilityProperty({
            ...classProperty,
            name: newPropertyName
        }));
    };   
    const editProperties = () => {
        return selectedProperties.map((property, index) => {
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
        return selectedMethods.map((method, index) => {
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
        log.debug(`Added new Utility Property. Class Id: ${props.utility.id}`);
        const newPropertyId = v4();
        dispatch(addNewUtilityProperty({
            id: newPropertyId,
            accessModifier: AccessModifierEnum.PUBLIC,
            name: ''
        }));
        const updatedClass = {...props.utility};
        updatedClass.data.utilityPropertyIds.push(newPropertyId);
        dispatch(updateUtility(updateGraphic(updatedClass)));
    };
    const addNewMethod = () => {
        log.debug(`Added new Utility Method. Class Id: ${props.utility.id}`);
        const newMethodId = v4();
        dispatch(addNewUtilityMethod({
            id: newMethodId,
            accessModifier: AccessModifierEnum.PUBLIC,
            name: ''
        }));
        const updatedUtility = {...props.utility};
        updatedUtility.data.utilityMethodIds.push(newMethodId);
        dispatch(updateUtility(updateGraphic(updatedUtility)));
    };

    const onClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedUtility = {...props.utility};
        updatedUtility.data.utilityName = event.target.value;
        dispatch(updateUtility(updateGraphic(updatedUtility)));
    };

    return (
        <FrameEdit inputLabel='Utility Name' frameName={data.utilityName} onNameChange={(ev) => onClassNameChange(ev)}>
            <ClassMethodEdit addNewProperty={addNewProperty} editProperties={editProperties}/>
            <ClassProperyEdit addNewMethod={addNewMethod} editMethods={editMethods}/>
        </FrameEdit>
    );
};

export default UtilityEdit;