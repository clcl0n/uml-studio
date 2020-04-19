import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';
import INewRelationship from '@interfaces/class-diagram/INewRelationship';
import IBaseElement from '@interfaces/class-diagram/common/IBaseElement';
import IEntry from '@interfaces/class-diagram/common/IEntry';
import IRelationshipHistory from '@interfaces/IRelationshipHistory';
import IElementHistory from '@interfaces/IElementHistory';

export const removeRedoRelationship = (data: IRelationshipHistory): IReducerPayload<ClassDiagramActionEnum, IRelationshipHistory> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_REDO_RELATIONSHIP,
        data
    };
};

export const removeRedoElement = (data: IElementHistory): IReducerPayload<ClassDiagramActionEnum, IElementHistory> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_REDO_ELEMENT,
        data
    };
};

export const addRedoRelationship = (data: IRelationshipHistory): IReducerPayload<ClassDiagramActionEnum, IRelationshipHistory> => {
    return {
        type: ClassDiagramActionEnum.ADD_REDO_RELATIONSHIP,
        data
    };
};

export const addRedoElement = (data: IElementHistory): IReducerPayload<ClassDiagramActionEnum, IElementHistory> => {
    return {
        type: ClassDiagramActionEnum.ADD_REDO_ELEMENT,
        data
    };
};

export const removeUndoRelationship = (data: IRelationshipHistory): IReducerPayload<ClassDiagramActionEnum, IRelationshipHistory> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_UNDO_RELATIONSHIP,
        data
    };
};

export const removeUndoElement = (data: IElementHistory): IReducerPayload<ClassDiagramActionEnum, IElementHistory> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_UNDO_ELEMENT,
        data
    };
};

export const addUndoRelationship = (data: IRelationshipHistory): IReducerPayload<ClassDiagramActionEnum, IRelationshipHistory> => {
    return {
        type: ClassDiagramActionEnum.ADD_UNDO_RELATIONSHIP,
        data
    };
};

export const addUndoElement = (data: IElementHistory): IReducerPayload<ClassDiagramActionEnum, IElementHistory> => {
    return {
        type: ClassDiagramActionEnum.ADD_UNDO_ELEMENT,
        data
    };
};

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

export const removeElement = (data: IBaseElement<any>): IReducerPayload<ClassDiagramActionEnum, IBaseElement<any>> => {
    return {
        type: ClassDiagramActionEnum.REMOVE_ELEMENT,
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

export const clearElements = () : IReducerPayload<ClassDiagramActionEnum, {}> => {
    return {
        type: ClassDiagramActionEnum.CLEAR_ELEMENTS,
        data: {}
    };
};

export const clearRelationships = () : IReducerPayload<ClassDiagramActionEnum, {}> => {
    return {
        type: ClassDiagramActionEnum.CLEAR_RELATIONSHIPS,
        data: {}
    };
};

export const clearRelationshipSegments = () : IReducerPayload<ClassDiagramActionEnum, {}> => {
    return {
        type: ClassDiagramActionEnum.CLEAR_RELATIONSHIP_SEGMENTS,
        data: {}
    };
};

export const clearElementEntries = () : IReducerPayload<ClassDiagramActionEnum, {}> => {
    return {
        type: ClassDiagramActionEnum.CLEAR_ELEMENT_ENTRIES,
        data: {}
    };
};