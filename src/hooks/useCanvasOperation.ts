import { useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import useSelectedElement from './useSelectedElement';

const useCanvasOperation = () => {
    const canvasOperation = useSelector((state: IStoreState) => state.canvas.canvasOperation);

    return {
        canvasOperation,
        ...useSelectedElement(canvasOperation.elementId)
    };
};

export default useCanvasOperation;