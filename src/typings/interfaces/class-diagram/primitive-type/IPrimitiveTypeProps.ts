import IPrimitiveType from './IPrimitiveType';

export default interface IPrimitiveTypeProps {
    primitive: IPrimitiveType;
    functionality: {
        onJointClick: (event: React.MouseEvent) => void;
    };
}