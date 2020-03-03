import React from 'react';
import ReactDOM from 'react-dom';
import './sideBar.scss';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import ClassEdit from './options/class/classEdit';
import InterfaceEdit from './options/interface/interfaceEdit';
import IClass from '@interfaces/class-diagram/class/IClass';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import UtilityEdit from './options/utility/utilityEdit';
import IUtility from '@interfaces/class-diagram/utility/IUtility';
import EnumerationEdit from './options/enumeration/enumerationEdit';
import IEnumeration from '@interfaces/class-diagram/enumeration/IEnumeration';
import DataTypeEdit from './options/data-type/dataTypeEdit';
import IDataType from '@interfaces/class-diagram/data-type/IDataType';
import ObjectEdit from './options/object/objectEdit';
import IObject from '@interfaces/class-diagram/object/IObject';
import PrimitiveTypeEdit from './options/primitive-type/primitiveTypeEdit';
import IPrimitiveType from '@interfaces/class-diagram/primitive-type/IPrimitiveType';
import useSelectedElement from 'hooks/useSelectedElement';
import ClassDiagramRelationshipTypesEnum from '@enums/classDiagramRelationshipTypesEnum';
import RelationshipEdit from './options/relationship/relationshipEdit';
import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';
import StateEdit from './options/state/stateEdit';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';
import FinalInitialStateEdit from './options/final-initial-state/finalInitialStateEdit';
import IFinalStateElement from '@interfaces/state-diagram/final-state/IFinalStateElement';
import IInitialStateElement from '@interfaces/state-diagram/initial-state/IInitialStateElement';

const SideBar = () => {
    const {
        selectedRelationship,
        selectedElement,
        selectedEntries,
        selectedMethods,
        selectedProperties,
        selectedSlots
    } = useSelectedElement();

    let editOptions = <div/>;
    if (selectedElement) {
        switch (selectedElement.type) {
            case ClassDiagramElementsEnum.CLASS:
                editOptions = <ClassEdit {...{ class: selectedElement as IClass, methods: selectedMethods, properties: selectedProperties}}/>;
                break;
            case ClassDiagramElementsEnum.INTERFACE:
                editOptions = <InterfaceEdit {...{ interface: selectedElement as IInterface, methods: selectedMethods, properties: selectedProperties }}/>;
                break;
            case ClassDiagramElementsEnum.UTILITY:
                editOptions = <UtilityEdit {...{ utility: selectedElement as IUtility, methods: selectedMethods, properties: selectedProperties }}/>;
                break;
            case ClassDiagramElementsEnum.ENUMERATION:
                editOptions = <EnumerationEdit {...{ enumeration: selectedElement as IEnumeration, entries: selectedEntries }}/>;
                break;
            case ClassDiagramElementsEnum.DATA_TYPE:
                editOptions = <DataTypeEdit {...{ dataType: selectedElement as IDataType, entries: selectedEntries }}/>;
                break;
            case ClassDiagramElementsEnum.OBJECT:
                editOptions = <ObjectEdit {...{ object: selectedElement as IObject, slots: selectedSlots }}/>;
                break;
            case ClassDiagramElementsEnum.PRIMITIVE_TYPE:
                editOptions = <PrimitiveTypeEdit {...{ primitiveType: selectedElement as IPrimitiveType }}/>;
                break;
            case StateDiagramElementsEnum.STATE:
                editOptions = <StateEdit {...{ state: selectedElement as IStateElement }}/>;
                break;
            case StateDiagramElementsEnum.INITIAL_STATE:
                editOptions = <FinalInitialStateEdit element={selectedElement as IInitialStateElement}/>;
                break;
            case StateDiagramElementsEnum.FINAL_STATE:
                editOptions = <FinalInitialStateEdit element={selectedElement as IFinalStateElement}/>;
                break;
        }
    } else if (selectedRelationship) {
        editOptions = <RelationshipEdit relationship={selectedRelationship}/>;
    }

     return (
        <div id='sideBar'>
            {editOptions}
        </div>
    );
}

export default SideBar;