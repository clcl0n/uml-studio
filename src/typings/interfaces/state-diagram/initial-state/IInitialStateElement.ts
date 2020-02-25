import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';

export default interface IInitialStateElement {
    id: string;
    type: StateDiagramElementsEnum;
    graphicData: {
        x: number;
        y: number;
        r: number;
    };
}