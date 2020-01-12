import { useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';

const useCanvasOperation = () => {
    const canvasOperation = useSelector((state: IStoreState) => state.canvas.canvasOperation);
    const selectedElement = useSelector((state: IStoreState) => {
        if (state.umlClassDiagram.classes.byId[canvasOperation.elementId]) {
            return state.umlClassDiagram.classes.byId[canvasOperation.elementId];
        } else if (state.umlClassDiagram.interfaces.byId[canvasOperation.elementId]) {
            return state.umlClassDiagram.interfaces.byId[canvasOperation.elementId];
        } else if (state.umlClassDiagram.utilities.byId[canvasOperation.elementId]) {
            return state.umlClassDiagram.utilities.byId[canvasOperation.elementId];
        } else if (state.umlClassDiagram.enumerations.byId[canvasOperation.elementId]) {
            return state.umlClassDiagram.enumerations.byId[canvasOperation.elementId];
        } else if (state.umlClassDiagram.primitiveTypes.byId[canvasOperation.elementId]) {
            return state.umlClassDiagram.primitiveTypes.byId[canvasOperation.elementId];
        } else if (state.umlClassDiagram.dataTypes.byId[canvasOperation.elementId]) {
            return state.umlClassDiagram.dataTypes.byId[canvasOperation.elementId];
        } else if (state.umlClassDiagram.objects.byId[canvasOperation.elementId]) {
            return state.umlClassDiagram.objects.byId[canvasOperation.elementId];
        }
    });

    return { canvasOperation, selectedElement };
};

export default useCanvasOperation;