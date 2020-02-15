import { useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import EntryTypeEnum from '@enums/EntryTypeEnum';
import IUtilityMethod from '@interfaces/class-diagram/utility/IUtilityMethod';
import IUtilityProperty from '@interfaces/class-diagram/utility/IUtilityProperty';
import IEntry from '@interfaces/class-diagram/common/IEntry';
import IObjectSlot from '@interfaces/class-diagram/object/IObjectSlot';
import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';
import IBaseElement from '@interfaces/class-diagram/common/IBaseElement';

const useSelectedElement = (selectedElementId: string = '') => {
    const storeSelectedElementId = useSelector((state: IStoreState) => state.canvas.selectedElementId);
    selectedElementId = selectedElementId === '' ? storeSelectedElementId: selectedElementId;
    const selectedElement = useSelector((state: IStoreState) => {
        if (state.classDiagram.elements.byId[selectedElementId]) {
            return state.classDiagram.elements.byId[selectedElementId];
        } else if (state.stateDiagram.elements.byId[selectedElementId]) {
            return state.stateDiagram.elements.byId[selectedElementId];
        } else if (state.stateDiagram.initialStateElements.byId[selectedElementId]) {
            return state.stateDiagram.initialStateElements.byId[selectedElementId];
        } else if (state.stateDiagram.finalStateElements.byId[selectedElementId]) {
            return state.stateDiagram.finalStateElements.byId[selectedElementId];
        } else if (state.stateDiagram.forkJoinElements.byId[selectedElementId]) {
            return state.stateDiagram.forkJoinElements.byId[selectedElementId];
        } else if (state.stateDiagram.choiceElements.byId[selectedElementId]) {
            return state.stateDiagram.choiceElements.byId[selectedElementId];
        }
    });
    const selectedElementEntries = useSelector((state: IStoreState) => {
        if (
            selectedElement?.type !== StateDiagramElementsEnum.STATE &&
            selectedElement?.type !== StateDiagramElementsEnum.INITIAL_STATE &&
            selectedElement?.type !== StateDiagramElementsEnum.FINAL_STATE &&
            selectedElement?.type !== StateDiagramElementsEnum.FORK &&
            selectedElement?.type !== StateDiagramElementsEnum.JOIN &&
            selectedElement?.type !== StateDiagramElementsEnum.CHOICE
        ) {
            return (selectedElement as IBaseElement<any>)?.data.entryIds.map((entryId) => {
                return state.classDiagram.elementEntries.byId[entryId];
            });
        } 
    });
    const selectedRelationship = useSelector((state: IStoreState) => {
        return state.classDiagram.relationships.byId[selectedElementId];
    });
    const selectedRelationshipSegments = useSelector((state: IStoreState) => {
        if (selectedRelationship) {
            return selectedRelationship.segmentIds.map((id) => state.classDiagram.relationshipSegments.byId[id]);
        }
    });

    const selectedMethods = selectedElementEntries?.filter((entry) => entry.type === EntryTypeEnum.METHOD) as Array<IUtilityMethod>;
    const selectedProperties = selectedElementEntries?.filter((entry) => entry.type === EntryTypeEnum.PROPERTY) as Array<IUtilityProperty>;
    const selectedEntries = selectedElementEntries?.filter((entry) => entry.type === EntryTypeEnum.BASE) as Array<IEntry>;
    const selectedSlots = selectedElementEntries?.filter((entry) => entry.type === EntryTypeEnum.SLOT) as Array<IObjectSlot>;

    return {
        selectedRelationship,
        selectedRelationshipSegments,
        selectedElementId,
        selectedElement,
        selectedElementEntries,
        selectedMethods,
        selectedProperties,
        selectedEntries,
        selectedSlots
    };
};

export default useSelectedElement;