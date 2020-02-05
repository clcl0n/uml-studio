import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import INewRelationship from '@interfaces/class-diagram/INewRelationship';
import IBaseElement from '@interfaces/class-diagram/common/IBaseElement';
import IEntry from '@interfaces/class-diagram/common/IEntry';

export const addNewElement = (data: IBaseElement<any>): IReducerPayload<ClassDiagramActionEnum, IBaseElement<any>> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_ELEMENT,
        data
    };
};

export const updateElement = (data: IBaseElement<any>): IReducerPayload<ClassDiagramActionEnum, IBaseElement<any>> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_ELEMENT,
        data
    };
};

export const addNewElementEntry = (data: IEntry): IReducerPayload<ClassDiagramActionEnum, IEntry> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_ENTRY,
        data
    };
};

export const removeElementEntry = (data: IEntry): IReducerPayload<ClassDiagramActionEnum, IEntry> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_ENTRY,
        data
    };
};

export const updateElementEntry = (data: IEntry): IReducerPayload<ClassDiagramActionEnum, IEntry> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_ENTRY,
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

export const removeRelationship = (data: IRelationship): IReducerPayload<ClassDiagramActionEnum, IRelationship> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_RELATIONSHIP,
        data
    };
};

export const removeRelationshipSegment = (data: IRelationshipSegment): IReducerPayload<ClassDiagramActionEnum, IRelationshipSegment> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_RELATIONSHIP_SEGMENT,
        data
    }
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

export const addNewNewRelationship = (data: INewRelationship): IReducerPayload<ClassDiagramActionEnum, INewRelationship> => {
    return {
        type: ClassDiagramActionEnum.ADD_NEW_NEW_RELATIONSHIP,
        data
    };
};

export const updateNewRelationship = (data: INewRelationship): IReducerPayload<ClassDiagramActionEnum, INewRelationship> => {
    return {
        type: ClassDiagramActionEnum.UPDATE_NEW_RELATIONSHIP,
        data
    };
};

export const clearNewRelationship = (): IReducerPayload<ClassDiagramActionEnum, any> => {
    return {
        type: ClassDiagramActionEnum.CLEAR_NEW_RELATIONSHIP,
        data: null
    };
};