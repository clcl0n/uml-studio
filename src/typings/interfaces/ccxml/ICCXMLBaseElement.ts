import ICCXMLTransition from './ICCXMLTransition';

export default interface ICCXMLBaseElement {
    $: {
        id: string;
        x: string;
        y: string;
    };
    transitions: Array<{ transition: Array<ICCXMLTransition> }>;
}