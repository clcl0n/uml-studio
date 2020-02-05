import React from 'react';
import ReactDOM from 'react-dom';
import useDiagram from 'hooks/useDiagram';
import ClassDiagram from './class-diagram/classDiagram';
import DiagramTypeEnum from '@enums/diagramTypeEnum';
import { useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import StateDiagram from './state-diagram/stateDiagram';

const Diagram = () => {
    const { diagramType } = useDiagram();
    const classDiagram = useSelector((state: IStoreState) => state.classDiagram);
    const stateDiagram = useSelector((state: IStoreState) => state.stateDiagram);
    
    const getDiagram = () => {
        return diagramType === DiagramTypeEnum.CLASS ? (
            <ClassDiagram classDiagram={classDiagram}/>
        ) : (
            <StateDiagram stateDiagram={stateDiagram}/>
        );
    };

    return getDiagram();
};

export default Diagram;