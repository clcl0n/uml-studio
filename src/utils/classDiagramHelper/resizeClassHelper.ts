import ICoordinates from '@interfaces/ICoordinates';
import IClass from '@interfaces/class-diagram/class/IClass';
import Direction from '@enums/direction';

const minWidth = 100;

const resizeClassHelper = (classElement: IClass, coordinates: ICoordinates, direction: Direction) => {
    const { graphicData } = classElement;
    // coordinates.x -= 4;
    // coordinates.y -= 4;
    // let fixX = -0.5;
    // let fixY = 0.5;
    // if (currentlyDrawingRelation.y1 > coordinates.y) {
    //     fixY = -0.5;
    // }
    // if (currentlyDrawingRelation.x1 > coordinates.x) {
    //     let fixX = 0.5;
    // }
    let width = 0;
    if (direction === Direction.RIGHT) {
        width = (coordinates.x - graphicData.frame.x);
        if (width >= minWidth) {
            graphicData.frame.width = width;
            graphicData.frame.xCenter = graphicData.frame.x + (graphicData.frame.width / 2);
        }
    } else {
        width = ((graphicData.frame.x + graphicData.frame.width) - coordinates.x);
        if (width >= minWidth) {
            graphicData.frame.width += (graphicData.frame.x - coordinates.x); 
            graphicData.frame.x = coordinates.x;
            graphicData.frame.xCenter = graphicData.frame.x + graphicData.frame.width / 2;
        }
    }

    return {
        ...classElement,
        graphicData
    };
};

export default resizeClassHelper;