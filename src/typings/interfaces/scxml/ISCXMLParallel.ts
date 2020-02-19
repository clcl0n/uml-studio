import ISCXMLState from './ISCXMLState';
import ISCXMLTransition from './ISCXMLTransition';

export default interface ISCXMLParallel {
    $: {
        id: string;
    };
    state: Array<ISCXMLState>;
    transition: Array<ISCXMLTransition>;
    parallel: Array<ISCXMLParallel>;
}