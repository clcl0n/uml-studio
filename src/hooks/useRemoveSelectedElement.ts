import useSelectedElement from './useSelectedElement';
import { useDispatch } from 'react-redux';
import { removeRelationship, removeRelationshipSegment, removeElement, removeElementEntry, addElementToHistory } from '@store/actions/classDiagram.action';
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
            dispatch(removeRelationship(selectedRelationship));
            selectedRelationshipSegments.forEach((segment) => dispatch(removeRelationshipSegment(segment)));
        } else if (
            selectedElement &&
            selectedElement.type !== StateDiagramElementsEnum.STATE &&
            selectedElement.type !== StateDiagramElementsEnum.INITIAL_STATE &&
            selectedElement.type !== StateDiagramElementsEnum.FINAL_STATE
        ) {
            // classDiagram.relationships.allIds.forEach(id => {
            //     if (classDiagram.relationships.byId[id].fromElementId === selectedElement.id) {
            //         classDiagram.relationships.byId[id].fromElementId = '';
            //     } else if (classDiagram.relationships.byId[id].toElementId === selectedElement.id) {
            //         classDiagram.relationships.byId[id].toElementId = '';
            //     }
            // });
            dispatch(addElementToHistory({
                elements: selectedElement,
                entries: selectedElementEntries
            }))
            dispatch(removeElement(selectedElement as IBaseElement<any>));
            selectedElementEntries.forEach(entry => dispatch(removeElementEntry(entry)));
        } else if (
            selectedElement &&
            selectedElement.type === StateDiagramElementsEnum.STATE
        ) {
            classDiagram.relationships.allIds.forEach(id => {
                if (classDiagram.relationships.byId[id].fromElementId === selectedElement.id) {
                    classDiagram.relationships.byId[id].fromElementId = '';
                } else if (classDiagram.relationships.byId[id].toElementId === selectedElement.id) {
                    classDiagram.relationships.byId[id].toElementId = '';
                }
            });
            dispatch(removeElement(selectedElement as any));
            selectedElementEntries?.forEach(entry => dispatch(removeElementEntry(entry)));
        }
    };

    return {
        removeSelectedElement
    };
};

export default useRemoveSelectedElement;