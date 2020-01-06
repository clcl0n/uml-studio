import ICoordinates from '@interfaces/ICoordinates';
import createFrameHelper from '../createFrameHelper';
import IClass from '@interfaces/class-diagram/class/IClass';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import { v4 } from 'uuid';

const createNewBaseClassHelper = (coordinates: ICoordinates, frameRows = 2) => {
    const frame = createFrameHelper(coordinates, frameRows);

    const newBaseClass: IClass = {
        id: v4(),
        type: ClassDiagramElementsEnum.CLASS,
        data: {
            className: 'base class Name',
            classMethodIds: [],
            classPropertyIds: [],
        },
        graphicData: {
            frame,
            sections: {
                head: {
                    y: frame.y
                },
                properties: {
                    y: frame.y + frame.rowHeight
                },
                methods: {
                    y: frame.y + (2 * frame.rowHeight)
                }
            }
        }
    };

    return {
        newBaseClass
    };
};

export default createNewBaseClassHelper;