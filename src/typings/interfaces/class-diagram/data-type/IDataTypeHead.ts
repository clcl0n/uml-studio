import ICoordinates from '@interfaces/ICoordinates';
import IFrameHead from '../common/IFrameHead';

export default interface IDataTypeHead extends IFrameHead<{ text: ICoordinates; title: ICoordinates; }, { text: string; }> {} {}