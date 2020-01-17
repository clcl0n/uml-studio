import { useDispatch } from 'react-redux';
import RibbonOperationEnum from '@enums/ribbonOperationEnum';
import { addNewClassMethod, addNewClassProperty, addNewClass, addNewDataTypeEntry, addNewDataType, addNewEnumerationEntry, addNewEnumeration, addNewInterfaceMethod, addNewInterfaceProperty, addNewInterface, addNewObjectSlot, addNewObject, addNewPrimitive, addNewUtilityMethod, addNewUtilityProperty, addNewUtility } from '@store/actions/classDiagram';
import { createNewClass, createNewBaseClass } from '@utils/elements/class';
import { createNewDataType } from '@utils/elements/dataType';
import { createNewEnumeration } from '@utils/elements/enumeration';
import { createNewInterface } from '@utils/elements/interface';
import { createNewObject } from '@utils/elements/object';
import { createNewPrimitiveType } from '@utils/elements/primitiveType';
import { createNewUtility } from '@utils/elements/utility';

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
                const { newDataType, newDataTypeEntry } = createNewDataType(coordinates);
                dispatch(addNewDataTypeEntry(newDataTypeEntry));
                dispatch(addNewDataType(newDataType));
                break;
            case RibbonOperationEnum.ADD_NEW_EMPTY_CLASS:
                const { newBaseClass } = createNewBaseClass(coordinates);
                dispatch(addNewClass(newBaseClass));
                break;
            case RibbonOperationEnum.ADD_NEW_ENUMERATION:
                const { newEnumeration, newEntry } = createNewEnumeration(coordinates);
                dispatch(addNewEnumerationEntry(newEntry));
                dispatch(addNewEnumeration(newEnumeration));
                break;
            case RibbonOperationEnum.ADD_NEW_INTERFACE:
                const { newInterface, newInterfaceMethod, newInterfaceProperty } = createNewInterface(coordinates);
                dispatch(addNewInterfaceMethod(newInterfaceMethod));
                dispatch(addNewInterfaceProperty(newInterfaceProperty));
                dispatch(addNewInterface(newInterface));
                break;
            case RibbonOperationEnum.ADD_NEW_OBJECT:
                const { newObjectSlot, newObject } = createNewObject(coordinates);
                dispatch(addNewObjectSlot(newObjectSlot));
                dispatch(addNewObject(newObject));
                break;
            case RibbonOperationEnum.ADD_NEW_PRIMITIVE_TYPE:
                const { newPrimitiveType } = createNewPrimitiveType(coordinates);
                dispatch(addNewPrimitive(newPrimitiveType));
                break;
            case RibbonOperationEnum.ADD_NEW_UTILITY:
                const { newUtility, newUtilityProperty, newUtilityMethod } = createNewUtility(coordinates);
                dispatch(addNewUtilityMethod(newUtilityMethod));
                dispatch(addNewUtilityProperty(newUtilityProperty));
                dispatch(addNewUtility(newUtility));
                break;
        }
    };

    return { addNewElementToCanvas };
};

export default useCanvasAddNewElement;