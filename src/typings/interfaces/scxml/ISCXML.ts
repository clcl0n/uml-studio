import ISCXMLState from './ISCXMLState';

export default interface ISCXML {
    $: {
        initial?: string;
        name?: string;
        xmlns: string;
        version: string;
        datamodel?: string;
        binding?: string;
    };
    state: Array<ISCXMLState>;
}