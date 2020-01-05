import IFrame from "@interfaces/class-diagram/common/IFrame";
import Direction from '@enums/direction';
import ICoordinates from '@interfaces/ICoordinates';
const minWidth = 100;

const resizeElementHelper = (frame: IFrame, coordinates: ICoordinates, direction: Direction) => {
    let width = 0;
    if (direction === Direction.RIGHT) {
        width = (coordinates.x - frame.x);
        if (width >= minWidth) {
            frame.width = width;
            frame.xCenter = frame.x + (frame.width / 2);
        }
    } else {
        width = ((frame.x + frame.width) - coordinates.x);
        if (width >= minWidth) {
            frame.width += (frame.x - coordinates.x); 
            frame.x = coordinates.x;
            frame.xCenter = frame.x + frame.width / 2;
        }
    }

    return frame;
};

export default resizeElementHelper;