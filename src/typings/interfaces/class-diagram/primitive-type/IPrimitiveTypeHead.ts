import IFrameHead from '../common/IFrameHead';
import ICoordinates from '@interfaces/ICoordinates';

export default interface IPrimitiveTypeHead extends IFrameHead<{ text: ICoordinates; title: ICoordinates; }, { text: string; }> {}