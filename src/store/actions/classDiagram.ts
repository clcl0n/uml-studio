import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';
import ICoordinates from '@interfaces/ICoordinates';
import IClassMethod from '@interfaces/class-diagram/class/IClassMethod';
import IClassProperty from '@interfaces/class-diagram/class/IClassProperty';
import IClass from '@interfaces/class-diagram/class/IClass';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import IInterface from '@interfaces/class-diagram/interface/IInterface';
import IInterfaceProperty from '@interfaces/class-diagram/interface/IInterfaceProperty';
import IInterfaceMethod from '@interfaces/class-diagram/interface/IInterfaceMethod';
import IUtility from '@interfaces/class-diagram/utility/IUtility';
import IUtilityProperty from '@interfaces/class-diagram/utility/IUtilityProperty';
import IUtilityMethod from '@interfaces/class-diagram/utility/IUtilityMethod';
import IEnumeration from '@interfaces/class-diagram/enumeration/IEnumeration';
import IEnumerationEntry from '@interfaces/class-diagram/enumeration/IEnumerationEntry';
import IDataType from '@interfaces/class-diagram/data-type/IDataType';
import IDataTypeEntry from '@interfaces/class-diagram/data-type/IDataTypeEntry';

export const updateClass = (data: IClass): IReducerPayload<ClassDiagramActionEnum, IClass> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_CLASS,
        data
    };
};

export const addNewClass = (data: IClass): IReducerPayload<ClassDiagramActionEnum, IClass> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_CLASS,
        data
    };
};

export const addNewClassMethod = (data: IClassMethod): IReducerPayload<ClassDiagramActionEnum, IClassMethod> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_CLASS_METHOD,
        data
    };
};

export const updateClassMethod = (data: IClassMethod): IReducerPayload<ClassDiagramActionEnum, IClassMethod> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_CLASS_METHOD,
        data
    };
};

export const removeClassMethod = (data: IClassMethod): IReducerPayload<ClassDiagramActionEnum, IClassMethod> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_CLASS_METHOD,
        data
    };
};

export const addNewClassProperty = (data: IClassProperty): IReducerPayload<ClassDiagramActionEnum, IClassProperty> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_CLASS_PROPERTY,
        data
    };
};

export const updateClassProperty = (data: IClassProperty): IReducerPayload<ClassDiagramActionEnum, IClassProperty> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_CLASS_PROPERTY,
        data
    };
};

export const removeClassProperty = (data: IClassProperty): IReducerPayload<ClassDiagramActionEnum, IClassProperty> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_CLASS_PROPERTY,
        data
    };
};

export const addNewRelationship = (data: IRelationship): IReducerPayload<ClassDiagramActionEnum, IRelationship> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_RELATIONSHIP,
        data
    };
};

export const updateRelationship = (data: IRelationship): IReducerPayload<ClassDiagramActionEnum, IRelationship> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_RELATIONSHIP,
        data
    };
};

export const addNewRelationshipSegment = (data: IRelationshipSegment): IReducerPayload<ClassDiagramActionEnum, IRelationshipSegment> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_RELATIONSHIP_SEGMENT,
        data
    };
};

export const updateRelationshipSegment = (data: IRelationshipSegment): IReducerPayload<ClassDiagramActionEnum, IRelationshipSegment> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_RELATIONSHIP_SEGMENT,
        data
    };
};

export const addNewInterface = (data: IInterface): IReducerPayload<ClassDiagramActionEnum, IInterface> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_INTERFACE,
        data
    };  
};

export const addNewInterfaceProperty = (data: IInterfaceProperty): IReducerPayload<ClassDiagramActionEnum, IInterfaceProperty> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_INTERFACE_PROPERTY,
        data
    };
};

export const addNewInterfaceMethod = (data: IInterfaceMethod): IReducerPayload<ClassDiagramActionEnum, IInterfaceMethod> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_INTERFACE_METHOD,
        data
    };
};

export const addNewUtility = (data: IUtility): IReducerPayload<ClassDiagramActionEnum, IUtility> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_UTILITY,
        data
    };  
};

export const addNewUtilityProperty = (data: IUtilityProperty): IReducerPayload<ClassDiagramActionEnum, IUtilityProperty> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_UTILITY_PROPERTY,
        data
    };
};

export const addNewUtilityMethod = (data: IUtilityMethod): IReducerPayload<ClassDiagramActionEnum, IUtilityMethod> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_UTILITY_METHOD,
        data
    };
};

export const addNewEnumeration = (data: IEnumeration): IReducerPayload<ClassDiagramActionEnum, IEnumeration> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_ENUMERATION,
        data
    };  
};

export const addNewEnumerationEntry = (data: IEnumerationEntry): IReducerPayload<ClassDiagramActionEnum, IEnumerationEntry> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_ENUMERATION_ENTRY,
        data
    };
};

export const updateEnumerationEntry = (data: IEnumerationEntry): IReducerPayload<ClassDiagramActionEnum, IEnumerationEntry> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_ENUMERATION_ENTRY,
        data
    };
};

export const removeEnumerationEntry = (data: IEnumerationEntry): IReducerPayload<ClassDiagramActionEnum, IEnumerationEntry> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_ENUMERATION_ENTRY,
        data
    };
};

export const updateEnumeration = (data: IEnumeration): IReducerPayload<ClassDiagramActionEnum, IEnumeration> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_ENUMERATION,
        data
    };
};

export const updateInterfaceProperty = (data: IInterfaceProperty): IReducerPayload<ClassDiagramActionEnum, IInterfaceProperty> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_INTERFACE_PROPERTY,
        data
    };
};

export const updateInterfaceMethod = (data: IInterfaceMethod): IReducerPayload<ClassDiagramActionEnum, IInterfaceMethod> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_INTERFACE_METHOD,
        data
    };
};

export const removeInterfaceProperty = (data: IInterfaceProperty): IReducerPayload<ClassDiagramActionEnum, IInterfaceProperty> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_INTERFACE_PROPERTY,
        data
    };
};

export const removeInterfaceMethod = (data: IInterfaceMethod): IReducerPayload<ClassDiagramActionEnum, IInterfaceMethod> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_INTERFACE_METHOD,
        data
    };
};

export const updateInterface = (data: IInterface): IReducerPayload<ClassDiagramActionEnum, IInterface> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_INTERFACE,
        data
    };
};

export const updateUtilityMethod = (data: IUtilityMethod): IReducerPayload<ClassDiagramActionEnum, IUtilityMethod> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_UTILITY_METHOD,
        data
    };
};

export const updateUtilityProperty = (data: IUtilityProperty): IReducerPayload<ClassDiagramActionEnum, IUtilityProperty> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_UTILITY_PROPERTY,
        data
    };
};

export const removeUtilityMethod = (data: IUtilityMethod): IReducerPayload<ClassDiagramActionEnum, IUtilityMethod> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_UTILITY_METHOD,
        data
    };
};

export const removeUtilityProperty = (data: IUtilityProperty): IReducerPayload<ClassDiagramActionEnum, IUtilityProperty> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_UTILITY_PROPERTY,
        data
    };
};

export const updateUtility = (data: IUtility): IReducerPayload<ClassDiagramActionEnum, IUtility> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_UTILITY,
        data
    };
};

export const addNewDataType = (data: IDataType): IReducerPayload<ClassDiagramActionEnum, IDataType> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_DATA_TYPE,
        data
    };  
};

export const addNewDataTypeEntry = (data: IDataTypeEntry): IReducerPayload<ClassDiagramActionEnum, IDataTypeEntry> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_DATA_TYPE_ENTRY,
        data
    };
};

export const updateDataTypeEntry = (data: IDataTypeEntry): IReducerPayload<ClassDiagramActionEnum, IDataTypeEntry> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_DATA_TYPE_ENTRY,
        data
    };
};

export const removeDataTypeEntry = (data: IDataTypeEntry): IReducerPayload<ClassDiagramActionEnum, IDataTypeEntry> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_DATA_TYPE_ENTRY,
        data
    };
};

export const updateDataType = (data: IDataType): IReducerPayload<ClassDiagramActionEnum, IDataType> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_DATA_TYPE,
        data
    };
};