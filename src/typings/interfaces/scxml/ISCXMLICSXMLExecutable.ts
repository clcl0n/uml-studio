export default interface ISCXMLExecutable {
    raise: Array<ISCXMLExecutableRaise>;
    if: Array<{
        cond: string;
        elseif: Array<any>;
        else: any;
    }>;
}

interface ISCXMLExecutableRaise {
    $: {
        event: string;
    };
}
