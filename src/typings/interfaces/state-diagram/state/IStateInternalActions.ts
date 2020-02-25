export default interface IStateInternalActions {
    asigns: Array<IAssign>;
    logs: Array<ILog>;
}

interface IAssign {
    expr: string;
    location: string;
}

interface ILog {
    expr: string;
    label: string;
}

