import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';

export default interface IInitialStateElement {
    id: string;
    type: StateDiagramElementsEnum;
    name: string;
    graphicData: {
        x: number;
        y: number;
        r: number;
    };
}