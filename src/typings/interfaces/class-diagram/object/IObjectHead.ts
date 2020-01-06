import IFrameHead from '../common/IFrameHead';
import ICoordinates from '@interfaces/ICoordinates';

export default interface IObjectHead extends IFrameHead<{ text: ICoordinates; }, { text: string; }> {}