import IReduxEntity from '@interfaces/IReduxEntity';
import IBaseElement from '@interfaces/class-diagram/common/IBaseElement';
import IReducerPayload from '@interfaces/IReducerPayload';
import ClassDiagramActionEnum from '@enums/classDiagramActionEnum';
import IDictionary from '@interfaces/IDictionary';
import IEntry from '@interfaces/class-diagram/common/IEntry';
import INewRelationship from '@interfaces/class-diagram/INewRelationship';
import IRelationship from '@interfaces/class-diagram/relationships/IRelationship';
import IRelationshipSegment from '@interfaces/class-diagram/relationships/IRelationshipSegment';

const elementsState: IReduxEntity<IBaseElement<any>> = {
    byId: {},
    allIds: []
};

const elementEntriesState: IReduxEntity<IEntry> = {
    byId: {},
    allIds: []
};

const relationshipsState: IReduxEntity<IRelationship> = {
    byId: {},
    allIds: []
};

const relationshipSegmentsState: IReduxEntity<IRelationshipSegment> = {
    byId: {},
    allIds: []
};

const newRelationshipState: INewRelationship = {
    relationship: null,
    relationshipSegments: []
};

export const relationshipsReducer = (state = relationshipsState, payload: IReducerPayload<ClassDiagramActionEnum, IRelationship>) => {
    let newElement: IDictionary<IRelationship> = {};
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_RELATIONSHIP:
            newElement[payload.data.id] = payload.data;
            return {
                byId: {
                    ...state.byId,
                    ...newElement
                },
                allIds: [...state.allIds, payload.data.id]
            };
        case ClassDiagramActionEnum.UPDATE_RELATIONSHIP:
            newElement[payload.data.id] = payload.data;
            return {
                byId: {
                    ...state.byId,
                    ...newElement
                },
                allIds: [...state.allIds]
            };
        case ClassDiagramActionEnum.REMOVE_RELATIONSHIP:
            delete state.byId[payload.data.id];
            
            return {
                byId: {...state.byId},
                allIds: state.allIds.filter((id) => id !== payload.data.id)
            };
        default:
            return state;
    }
};

export const relationshipSegmentsReducer = (state = relationshipSegmentsState, payload: IReducerPayload<ClassDiagramActionEnum, IRelationshipSegment>) => {
    let newElement: IDictionary<IRelationshipSegment> = {};
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_RELATIONSHIP_SEGMENT:
            newElement[payload.data.id] = payload.data;
            return {
                byId: {
                    ...state.byId,
                    ...newElement
                },
                allIds: [...state.allIds, payload.data.id]
            };
        case ClassDiagramActionEnum.UPDATE_RELATIONSHIP_SEGMENT:
            newElement[payload.data.id] = payload.data;
            return {
                byId: {
                    ...state.byId,
                    ...newElement
                },
                allIds: [...state.allIds]
            };
        case ClassDiagramActionEnum.REMOVE_RELATIONSHIP_SEGMENT:
            delete state.byId[payload.data.id];

            return {
                byId: {...state.byId},
                allIds: state.allIds.filter((id) => id !== payload.data.id)
            };
        default:
            return state;
    }
};

export const newRelationshipReducer = (state = newRelationshipState, payload: IReducerPayload<ClassDiagramActionEnum, INewRelationship>): INewRelationship => {
    switch (payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_NEW_RELATIONSHIP:
            return payload.data;
        case ClassDiagramActionEnum.UPDATE_NEW_RELATIONSHIP:
            return payload.data;
        case ClassDiagramActionEnum.CLEAR_NEW_RELATIONSHIP:
            return {
                relationship: null,
                relationshipSegments: []
            };
        default: 
            return state;
    }
};

export const elementEntriesReducer = (state = elementEntriesState, payload: IReducerPayload<ClassDiagramActionEnum, IEntry>): IReduxEntity<IEntry> => {
    let newElement: IDictionary<IEntry> = {};
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_ENTRY:
            newElement[payload.data.id] = payload.data;
            return {
                byId: {
                    ...state.byId,
                    ...newElement
                },
                allIds: [...state.allIds, payload.data.id]
            };
        case ClassDiagramActionEnum.UPDATE_ENTRY:
            newElement[payload.data.id] = payload.data;
            return {
                byId: {
                    ...state.byId,
                    ...newElement
                },
                allIds: [...state.allIds]
            };
        case ClassDiagramActionEnum.REMOVE_ENTRY:
            state.allIds.splice(state.allIds.indexOf(payload.data.id), 1);
            delete state.byId[payload.data.id];

            return {...state};
        default:
            return state;
    }
};

export const elementsReducer = (state = elementsState, payload: IReducerPayload<ClassDiagramActionEnum, IBaseElement<any>>): IReduxEntity<IBaseElement<any>> => {
    let newElement: IDictionary<IBaseElement<any>> = {};
    switch(payload.type) {
        case ClassDiagramActionEnum.ADD_NEW_ELEMENT:
            newElement[payload.data.id] = payload.data;
            return {
                byId: {
                    ...state.byId,
                    ...newElement
                },
                allIds: [...state.allIds, payload.data.id]
            };
        case ClassDiagramActionEnum.UPDATE_ELEMENT:
            newElement[payload.data.id] = payload.data;
            return {
                byId: {
                    ...state.byId,
                    ...newElement
                },
                allIds: [...state.allIds]
            };
        default:
            return state;
    }
};
