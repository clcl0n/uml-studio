import IStateInternalAction from './IStateInternalAction';
import IFrameGraphicData from '@interfaces/class-diagram/common/IFrameGraphicData';

export default interface IStateElement {
    id: string;
    name: string;
    regions: Array<string>;
    internalActions: Array<IStateInternalAction>;
    graphicData: IFrameGraphicData & { rx: number };
}