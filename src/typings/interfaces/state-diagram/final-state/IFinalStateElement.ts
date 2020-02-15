import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';

export default interface IFinalStateElement {
    id: string;
    type: StateDiagramElementsEnum;
    graphicData: {
        x: number;
        y: number;
        r: number;
        r2: number;
    };
}