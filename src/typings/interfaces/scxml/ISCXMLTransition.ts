export default interface ISCXMLTransition {
    $: {
        event?: string;
        cond?: string;
        target?: string;
        type?: string;
    };
}