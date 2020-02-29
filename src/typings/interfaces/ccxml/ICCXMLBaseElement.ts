import ICCXMLTransition from './ICCXMLTransition';

export default interface ICCXMLBaseElement {
    $: {
        id: string;
    };
    transition: Array<ICCXMLTransition>;
}