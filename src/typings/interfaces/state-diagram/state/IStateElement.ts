import IStateInternalAction from './IStateInternalAction';
import IFrameGraphicData from '@interfaces/class-diagram/common/IFrameGraphicData';
import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';

export default interface IStateElement {
    id: string;
    type: StateDiagramElementsEnum;
    data: {
        name: string;
        regions: Array<string>;
        internalActions: Array<IStateInternalAction>;
    };
    graphicData: {
        frame: IFrameGraphicData;
        rx: number;
    };
}