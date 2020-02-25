import useSelectedElement from './useSelectedElement';
import { useDispatch } from 'react-redux';
import { removeRelationship, removeRelationshipSegment } from '@store/actions/classDiagram.action';

const useRemoveSelectedElement = () => {
    const dispatch = useDispatch();
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
        }
    };

    return {
        removeSelectedElement
    };
};

export default useRemoveSelectedElement;