import IClass from './IClass';
import IClassPropertyData from './IClassPropertyData';
import IClassMethodData from './IClassMethodData';

export default interface IClassProps {
    class: IClass;
    properties: Array<IClassPropertyData>;
    methods: Array<IClassMethodData>;
    functionality: {
        onJointClick: (event: React.MouseEvent) => void;
    };
}