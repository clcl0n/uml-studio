import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';

export default interface IChoiceElement {
    id: string;
    type: StateDiagramElementsEnum;
    graphicData: {
        width: number;
        height: number;
        xCenter: number;
        yCenter: number;
        x: number;
        y: number;
    };
}