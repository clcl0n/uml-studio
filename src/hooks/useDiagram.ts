import { useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';

const useDiagram = () => {
    const diagramType = useSelector((state: IStoreState) => state.canvas.diagramType);

    return {
        diagramType
    };
};

export default useDiagram;