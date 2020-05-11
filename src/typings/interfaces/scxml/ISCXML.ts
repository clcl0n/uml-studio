import ISCXMLState from './ISCXMLState';
import ISCXMLParallel from './ISCXMLParallel';
import ICSXMLFinal from './ICSXMLFinal';
import ICSXMLInitial from './ICSXMLInitial';

export default interface ISCXML {
    $: {
        initial?: string;
        name?: string;
        xmlns?: string;
        version?: string;
        datamodel?: string;
        binding?: string;
        coordinates?: string;
        width?: string;
        height?: string;
    };
    state: Array<ISCXMLState>;
    parallel: Array<ISCXMLParallel>;
    final: Array<ICSXMLFinal>;
    initial: Array<ICSXMLInitial>;
}