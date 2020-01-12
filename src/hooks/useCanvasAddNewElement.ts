import { useDispatch } from 'react-redux';
import RibbonOperationEnum from '@enums/ribbonOperationEnum';
import createNewClass from 'utils/classDiagramHelper/class/createNewClass';
import { addNewClassMethod, addNewClassProperty, addNewClass, addNewDataTypeEntry, addNewDataType, addNewEnumerationEntry, addNewEnumeration, addNewInterfaceMethod, addNewInterfaceProperty, addNewInterface, addNewObjectSlot, addNewObject, addNewPrimitive, addNewUtilityMethod, addNewUtilityProperty, addNewUtility } from '@store/actions/classDiagram';
import createNewDataTypeHelper from 'utils/classDiagramHelper/dataType/createNewDataTypeHelper';
import createNewBaseClassHelper from 'utils/classDiagramHelper/class/createNewBaseClassHelper';
import createNewEnumerationHelper from 'utils/classDiagramHelper/enumeration/createNewEnumerationHelper';
import createNewInterfaceHelper from 'utils/classDiagramHelper/interface/createNewInterfaceHelper';
import createNewObjectHelper from 'utils/classDiagramHelper/object/createNewObjectHelper';
import createNewPrimitiveType from 'utils/classDiagramHelper/primitive-type/createNewPrimitiveTypeHelper';
import createNewUtilityHelper from 'utils/classDiagramHelper/utility/createNewUtilityHelper';

const useCanvasAddNewElement = () => {
    const dispatch = useDispatch();
    
    const addNewElementToCanvas = (event: React.DragEvent) => {
        event.preventDefault();
        event.persist();
        const coordinates = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
        switch(event.dataTransfer.getData('elementType') as RibbonOperationEnum) {
            case RibbonOperationEnum.ADD_NEW_CLASS:
                const newClass = createNewClass(coordinates);
                dispatch(addNewClassMethod(newClass.newClassMethod));
                dispatch(addNewClassProperty(newClass.newClassProperty));
                dispatch(addNewClass(newClass.newClass));
                break;
            case RibbonOperationEnum.ADD_NEW_DATA_TYPE:
                const { newDataType, newDataTypeEntry } = createNewDataTypeHelper(coordinates);
                dispatch(addNewDataTypeEntry(newDataTypeEntry));
                dispatch(addNewDataType(newDataType));
                break;
            case RibbonOperationEnum.ADD_NEW_EMPTY_CLASS:
                const { newBaseClass } = createNewBaseClassHelper(coordinates);
                dispatch(addNewClass(newBaseClass));
                break;
            case RibbonOperationEnum.ADD_NEW_ENUMERATION:
                const { newEnumeration, newEntry } = createNewEnumerationHelper(coordinates);
                dispatch(addNewEnumerationEntry(newEntry));
                dispatch(addNewEnumeration(newEnumeration));
                break;
            case RibbonOperationEnum.ADD_NEW_INTERFACE:
                const { newInterface, newInterfaceMethod, newInterfaceProperty } = createNewInterfaceHelper(coordinates);
                dispatch(addNewInterfaceMethod(newInterfaceMethod));
                dispatch(addNewInterfaceProperty(newInterfaceProperty));
                dispatch(addNewInterface(newInterface));
                break;
            case RibbonOperationEnum.ADD_NEW_OBJECT:
                const { newObjectSlot, newObject } = createNewObjectHelper(coordinates);
                dispatch(addNewObjectSlot(newObjectSlot));
                dispatch(addNewObject(newObject));
                break;
            case RibbonOperationEnum.ADD_NEW_PRIMITIVE_TYPE:
                const { newPrimitiveType } = createNewPrimitiveType(coordinates);
                dispatch(addNewPrimitive(newPrimitiveType));
                break;
            case RibbonOperationEnum.ADD_NEW_UTILITY:
                const { newUtility, newUtilityProperty, newUtilityMethod } = createNewUtilityHelper(coordinates);
                dispatch(addNewUtilityMethod(newUtilityMethod));
                dispatch(addNewUtilityProperty(newUtilityProperty));
                dispatch(addNewUtility(newUtility));
                break;
        }
    };

    return { addNewElementToCanvas };
};

export default useCanvasAddNewElement;