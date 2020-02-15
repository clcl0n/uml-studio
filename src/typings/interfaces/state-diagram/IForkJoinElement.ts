import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';
import IFrameGraphicData from '@interfaces/class-diagram/common/IFrameGraphicData';

export default interface IForkJoinElement {
    id: string;
    type: StateDiagramElementsEnum;
    graphicData: {
        width: number;
        height: number;
        x: number;
        y: number;
    };
}