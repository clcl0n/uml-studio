import IPrimitive from './IPrimitive';

export default interface IPrimitiveProps {
    primitive: IPrimitive;
    functionality: {
        onJointClick: (event: React.MouseEvent) => void;
    };
}