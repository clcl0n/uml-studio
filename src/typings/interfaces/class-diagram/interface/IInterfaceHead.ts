import IFrameHead from '../common/IFrameHead';
import ICoordinates from '@interfaces/ICoordinates';

export default interface IInterfaceHead extends IFrameHead<{ text: string; }, { text: ICoordinates; title: ICoordinates; }> {}