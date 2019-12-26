export default interface IReducerPayload<T, H> {
    type: T;
    data: H;
}