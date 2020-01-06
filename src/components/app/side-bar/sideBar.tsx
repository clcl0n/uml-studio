import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './sideBar.scss';
import { useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
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

const SideBar = () => {
    const selectedElementId = useSelector((state: IStoreState) => state.canvas.selectedElementId);
    const selectedElement = useSelector((state: IStoreState) => {
        if (state.umlClassDiagram.classes.byId[selectedElementId]) {
            return state.umlClassDiagram.classes.byId[selectedElementId];
        } else if (state.umlClassDiagram.interfaces.byId[selectedElementId]) {
            return state.umlClassDiagram.interfaces.byId[selectedElementId];
        } else if (state.umlClassDiagram.utilities.byId[selectedElementId]) {
            return state.umlClassDiagram.utilities.byId[selectedElementId];
        } else if (state.umlClassDiagram.enumerations.byId[selectedElementId]) {
            return state.umlClassDiagram.enumerations.byId[selectedElementId];
        } else if (state.umlClassDiagram.dataTypes.byId[selectedElementId]) {
            return state.umlClassDiagram.dataTypes.byId[selectedElementId];
        } else if (state.umlClassDiagram.objects.byId[selectedElementId]) {
            return state.umlClassDiagram.objects.byId[selectedElementId];
        } else if (state.umlClassDiagram.primitiveTypes.byId[selectedElementId]) {
            return state.umlClassDiagram.primitiveTypes.byId[selectedElementId];
        }
    });
    
    let editOptions = <div/>;
    if (selectedElement) {
        switch (selectedElement.type) {
            case ClassDiagramElementsEnum.CLASS:
                editOptions = <ClassEdit {...{ class: selectedElement as IClass }}/>;
                break;
            case ClassDiagramElementsEnum.INTERFACE:
                editOptions = <InterfaceEdit {...{ interface: selectedElement as IInterface }}/>;
                break;
            case ClassDiagramElementsEnum.UTILITY:
                editOptions = <UtilityEdit {...{ utility: selectedElement as IUtility }}/>;
                break;
            case ClassDiagramElementsEnum.ENUMERATION:
                editOptions = <EnumerationEdit {...{ enumeration: selectedElement as IEnumeration }}/>;
                break;
            case ClassDiagramElementsEnum.DATA_TYPE:
                editOptions = <DataTypeEdit {...{ dataType: selectedElement as IDataType }}/>
                break;
            case ClassDiagramElementsEnum.OBJECT:
                editOptions = <ObjectEdit {...{ object: selectedElement as IObject }}/>
                break;
            case ClassDiagramElementsEnum.PRIMITIVE_TYPE:
                editOptions = <PrimitiveTypeEdit {...{ primitiveType: selectedElement as IPrimitiveType }}/>
                break;
        }
    }

     return (
        <div id='sideBar'>
            {editOptions}
        </div>
    );
}

export default SideBar;