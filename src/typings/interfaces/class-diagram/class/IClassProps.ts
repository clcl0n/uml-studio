import IClass from './IClass';
import IClassProperty from './IClassProperty';
import IClassMethod from './IClassMethod';

export default interface IClassProps {
    class: IClass;
    properties: Array<IClassProperty>;
    methods: Array<IClassMethod>;
    functionality: {
        onJointClick: (event: React.MouseEvent) => void;
    };
}