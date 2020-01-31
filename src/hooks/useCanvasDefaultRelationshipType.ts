import { useDispatch, useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import { setDefaultRelationshipType } from '@store/actions/canvas.action';
import ClassDiagramRelationshipTypesEnum from '@enums/classDiagramRelationshipTypesEnum';

const useCanvasDefaultRelationshipType = () => {
    const dispatch = useDispatch();
    const canvasDefaultRelationshipType = useSelector((state: IStoreState) => state.canvas.defaultRelationshipType);
    const setCanvasDefaultRelationshipType = (relationshipType: ClassDiagramRelationshipTypesEnum) => {
        dispatch(setDefaultRelationshipType(relationshipType));
    };

    return {
        canvasDefaultRelationshipType,
        setCanvasDefaultRelationshipType
    };
};

export default useCanvasDefaultRelationshipType;