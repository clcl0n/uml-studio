import IFrameGraphicData from './IFrameGraphicData';

export default interface IBaseElementGraphicData<T> {
    frame: IFrameGraphicData;
    sections: T;
}