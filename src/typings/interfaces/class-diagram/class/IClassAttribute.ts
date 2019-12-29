export default interface IClassAttribute<T> {
    graphicData: {
        textX: number;
        textY: number;
    };
    data: T;
}