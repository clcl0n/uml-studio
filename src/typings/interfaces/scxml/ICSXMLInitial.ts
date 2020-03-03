import ISCXMLTransition from './ISCXMLTransition';

export default interface ICSXMLInitial {
    $: {
        id: string;
        x: string;
        y: string;
    };
    onentry: Array<any>;
    onexit: Array<any>;
    donedata: Array<any>;
    transition: Array<ISCXMLTransition>;
}