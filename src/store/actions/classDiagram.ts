import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';
import ICoordinates from '@interfaces/ICoordinates';
import IClassMethodData from '@interfaces/class-diagram/class/IClassMethodData';
import IClassPropertyData from '@interfaces/class-diagram/class/IClassPropertyData';
import IClass from '@interfaces/class-diagram/class/IClass';

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

export const addNewClassMethod = (data: IClassMethodData): IReducerPayload<ClassDiagramActionEnum, IClassMethodData> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_CLASS_METHOD,
        data
    };
};

export const updateClassMethod = (data: IClassMethodData): IReducerPayload<ClassDiagramActionEnum, IClassMethodData> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_CLASS_METHOD,
        data
    };
};

export const removeClassMethod = (data: IClassMethodData): IReducerPayload<ClassDiagramActionEnum, IClassMethodData> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_CLASS_METHOD,
        data
    };
};

export const addNewClassProperty = (data: IClassPropertyData): IReducerPayload<ClassDiagramActionEnum, IClassPropertyData> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_CLASS_PROPERTY,
        data
    };
};

export const updateClassPropetry = (data: IClassPropertyData): IReducerPayload<ClassDiagramActionEnum, IClassPropertyData> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_CLASS_PROPERTY,
        data
    };
};

export const removeClassProperty = (data: IClassPropertyData): IReducerPayload<ClassDiagramActionEnum, IClassPropertyData> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_CLASS_PROPERTY,
        data
    };
};