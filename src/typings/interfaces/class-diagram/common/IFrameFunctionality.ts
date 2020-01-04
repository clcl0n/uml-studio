import Direction from '@enums/direction';

export default interface IFrameFunctionality {
    onFrameClick: (event: React.MouseEvent) => void;
    onFrameMouseOver: (event: React.MouseEvent) => void;
    onFrameMouseLeave: (event: React.MouseEvent) => void;
    onFrameResize: (event: React.MouseEvent, direction: Direction) => void;
    onFrameSetDefaultWidth: () => void;
}