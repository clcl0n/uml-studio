import ICoordinates from '@interfaces/ICoordinates';
import IFrameHead from '../common/IFrameHead';

export default interface IClassHead extends IFrameHead<{ text: ICoordinates; }, { text: string; }> {}