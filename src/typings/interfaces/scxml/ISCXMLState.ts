import ISCXMLTransition from './ISCXMLTransition';

export default interface ISCXMLState {
    $: {
        id?: string;
        initial?: string;
        x: string;
        y: string;
    };
    transition: Array<ISCXMLTransition>;
    onentry: Array<any>;
    onexit: Array<any>;
    invoke: Array<any>;
}