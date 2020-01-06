import IObject from './IObject';
import IObjectSlot from './IObjectSlot';

export default interface IObjectProps {
    object: IObject;
    slots: Array<IObjectSlot>;
    functionality: {
        onJointClick: (event: React.MouseEvent) => void;
    };
}