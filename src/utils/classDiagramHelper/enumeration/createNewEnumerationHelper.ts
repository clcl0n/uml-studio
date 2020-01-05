import ICoordinates from '@interfaces/ICoordinates';
import createFrameHelper from '../createFrameHelper';
import { v4 } from 'uuid';
import IEnumerationEntry from '@interfaces/class-diagram/enumeration/IEnumerationEntry';
import enumerationEntriesReducer from '@store/reducers/uml-class-diagram/enumerationEntries';
import IEnumeration from '@interfaces/class-diagram/enumeration/IEnumeration';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';

const createNewEnumerationHelper = (coordinates: ICoordinates) => {
    const frame = createFrameHelper(coordinates, 2);

    const enumerationEntryId = v4();
    const newEntry: IEnumerationEntry = {
        id: enumerationEntryId,
        value: 'entry_1'
    };

    frame.height += (frame.rowHeight / 2);

    const newEnumeration: IEnumeration = {
        id: v4(),
        type: ClassDiagramElementsEnum.ENUMERATION,
        data: {
            enumerationName: 'enum',
            enumerationEntryIds: [enumerationEntryId]
        },
        graphicData: {
            frame,
            sections: {}
        }
    };

    return {
        newEnumeration,
        newEntry
    };
};

export default createNewEnumerationHelper;