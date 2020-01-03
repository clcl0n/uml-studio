import ICoordinates from '@interfaces/ICoordinates';

export default interface IClassAttribute<T> {
    graphicData: {
        text: ICoordinates;
    };
    data: T;
}