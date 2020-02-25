import IStateInternalActions from './IStateInternalActions';
import IFrameGraphicData from '@interfaces/class-diagram/common/IFrameGraphicData';
import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';

export default interface IStateElement {
    id: string;
    type: StateDiagramElementsEnum;
    data: {
        name: string;
        regions: Array<string>;
        executableContent: Array<any>;
    };
    graphicData: {
        frame: IFrameGraphicData;
        rx: number;
    };
}