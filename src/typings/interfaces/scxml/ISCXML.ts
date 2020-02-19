import ISCXMLState from './ISCXMLState';
import ISCXMLParallel from './ISCXMLParallel';
import ICSXMLFinal from './ICSXMLFinal';

export default interface ISCXML {
    $: {
        initial?: string;
        name?: string;
        xmlns?: string;
        version?: string;
        datamodel?: string;
        binding?: string;
    };
    state: Array<ISCXMLState>;
    parallel: Array<ISCXMLParallel>;
    final: Array<ICSXMLFinal>;
}