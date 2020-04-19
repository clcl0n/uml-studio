import useSelectedElement from './useSelectedElement';
import { useDispatch } from 'react-redux';
import { removeRelationship, removeRelationshipSegment, removeElement, removeElementEntry, addUndoElement, addUndoRelationship } from '@store/actions/classDiagram.action';
import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';
import IBaseElement from '@interfaces/class-diagram/common/IBaseElement';
import useDiagram from './useDiagram';
import IStateElement from '@interfaces/state-diagram/state/IStateElement';

const useRemoveSelectedElement = () => {
    const dispatch = useDispatch();
    const { classDiagram } = useDiagram();
    const {
        selectedElement,
        selectedElementEntries,
        selectedEntries,
        selectedMethods,
        selectedProperties,
        selectedRelationship,
        selectedRelationshipSegments,
        selectedSlots
    } = useSelectedElement();
 
    const removeSelectedElement = () => {
        if (selectedRelationship) {
            dispatch(addUndoRelationship({
                relationship: selectedRelationship,
                relationshipSegments: selectedRelationshipSegments
            }));
            dispatch(removeRelationship(selectedRelationship));
            selectedRelationshipSegments.forEach((segment) => dispatch(removeRelationshipSegment(segment)));
        } else if (
            selectedElement &&
            selectedElement.type !== StateDiagramElementsEnum.STATE &&
            selectedElement.type !== StateDiagramElementsEnum.INITIAL_STATE &&
            selectedElement.type !== StateDiagramElementsEnum.FINAL_STATE
        ) {
            dispatch(addUndoElement({
                element: selectedElement as IBaseElement<any>,
                entries: selectedElementEntries
            }))
            dispatch(removeElement(selectedElement as IBaseElement<any>));
            selectedElementEntries.forEach(entry => dispatch(removeElementEntry(entry)));
        } else if (
            selectedElement &&
            selectedElement.type === StateDiagramElementsEnum.STATE
        ) {
            dispatch(removeElement(selectedElement as any));
            selectedElementEntries?.forEach(entry => dispatch(removeElementEntry(entry)));
        }
    };

    return {
        removeSelectedElement
    };
};

export default useRemoveSelectedElement;