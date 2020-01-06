import IFrame from "@interfaces/class-diagram/common/IFrame";
import Direction from '@enums/direction';
import ICoordinates from '@interfaces/ICoordinates';
import IBaseElement from '@interfaces/class-diagram/common/IBaseElement';
const minWidth = 100;

const resizeElementHelper = (element: IBaseElement<any, any>, coordinates: ICoordinates, direction: Direction): IBaseElement<any, any> => {
    const { graphicData } = element;

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
        ...element,
        ...graphicData
    };
};

export default resizeElementHelper;