import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';

export default interface IFinalStateElement {
    id: string;
    type: StateDiagramElementsEnum;
    name: string;
    graphicData: {
        x: number;
        y: number;
        r: number;
        r2: number;
    };
}