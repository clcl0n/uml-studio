import ICoordinates from '@interfaces/ICoordinates';
import createFrameHelper from '../createFrameHelper';
import IObjectSlot from '@interfaces/class-diagram/object/IObjectSlot';
import { v4 } from 'uuid';
import IObject from '@interfaces/class-diagram/object/IObject';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';

const createNewObjectHelper = (coordinates: ICoordinates) => {
    const frame = createFrameHelper(coordinates, 2);

    const slotId = v4();
    const newObjectSlot: IObjectSlot = {
        id: slotId,
        featureName: 'feature',
        value: 'value'
    };
    const newObject: IObject = {
        id: v4(),
        data: {
            objectName: 'Object:Class',
            slotIds: [slotId]
        },
        type: ClassDiagramElementsEnum.OBJECT,
        graphicData: {
            frame,
            sections: {}
        }
    };
    
    return {
        newObjectSlot,
        newObject
    };
};

export default createNewObjectHelper;