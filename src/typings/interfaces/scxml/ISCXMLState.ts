import ISCXMLTransition from './ISCXMLTransition';

export default interface ISCXMLState {
    $: {
        id?: string;
        initial?: string;
    };
    transition: Array<ISCXMLTransition>;
}