import { useSelector } from 'react-redux';
import IStoreState from '@interfaces/IStoreState';
import EntryTypeEnum from '@enums/EntryTypeEnum';
import IUtilityMethod from '@interfaces/class-diagram/utility/IUtilityMethod';
import IUtilityProperty from '@interfaces/class-diagram/utility/IUtilityProperty';
import IEntry from '@interfaces/class-diagram/common/IEntry';
import IObjectSlot from '@interfaces/class-diagram/object/IObjectSlot';

const useSelectedElement = () => {
    const canvasOperation = useSelector((state: IStoreState) => state.canvas.canvasOperation);
    const selectedElement = useSelector((state: IStoreState) => {
        return state.classDiagram.elements.byId[canvasOperation.elementId];
    });
    const selectedElementEntries = useSelector((state: IStoreState) => {
        return selectedElement?.data.entryIds.map((entryId) => {
            return state.classDiagram.elementEntries.byId[entryId];
        });
    });

    const selectedMethods = selectedElementEntries?.filter((entry) => entry.type === EntryTypeEnum.METHOD) as Array<IUtilityMethod>;
    const selectedProperties = selectedElementEntries?.filter((entry) => entry.type === EntryTypeEnum.PROPERTY) as Array<IUtilityProperty>;
    const selectedEntries = selectedElementEntries?.filter((entry) => entry.type === EntryTypeEnum.BASE) as Array<IEntry>;
    const selectedSlots = selectedElementEntries?.filter((entry) => entry.type === EntryTypeEnum.SLOT) as Array<IObjectSlot>;

    return {
        canvasOperation,
        selectedElement,
        selectedElementEntries,
        selectedMethods,
        selectedProperties,
        selectedEntries,
        selectedSlots
    };
};

export default useSelectedElement;