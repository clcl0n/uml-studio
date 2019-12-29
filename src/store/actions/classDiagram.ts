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

export const updateClassPropetry = (data: IClassProperty): IReducerPayload<ClassDiagramActionEnum, IClassProperty> => {
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