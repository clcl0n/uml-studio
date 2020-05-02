import { useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';

const useDiagram = () => {
    const diagramType = useSelector((state: IStoreState) => state.canvas.diagramType);
    const classDiagram = useSelector((state: IStoreState) => state.classDiagram);
    const stateDiagram = useSelector((state: IStoreState) => state.stateDiagram);

    return {
        diagramType,
        classDiagram,
        stateDiagram
    };
};

export default useDiagram;