import { useDispatch } from 'react-redux';
import RibbonOperationEnum from '@enums/ribbonOperationEnum';
import { createNewClass, createNewBaseClass } from '@utils/elements/class';
import { createNewDataType } from '@utils/elements/dataType';
import { createNewEnumeration } from '@utils/elements/enumeration';
import { createNewInterface } from '@utils/elements/interface';
import { createNewObject } from '@utils/elements/object';
import { createNewPrimitiveType } from '@utils/elements/primitiveType';
import { createNewUtility } from '@utils/elements/utility';
import { addNewElement, addNewElementEntry } from '@store/actions/classDiagram.action';
import ICoordinates from '@interfaces/ICoordinates';

const useCanvasAddNewElement = () => {
    const dispatch = useDispatch();
    
    const addNewElementToCanvas = (coordinates: ICoordinates, elementType: RibbonOperationEnum) => {
        switch(elementType) {
            case RibbonOperationEnum.ADD_NEW_CLASS:
                const newClass = createNewClass(coordinates);
                dispatch(addNewElement(newClass.newClass));
                dispatch(addNewElementEntry(newClass.newClassMethod));
                dispatch(addNewElementEntry(newClass.newClassProperty));
                break;
            case RibbonOperationEnum.ADD_NEW_DATA_TYPE:
                const { newDataType, newDataTypeEntry } = createNewDataType(coordinates);
                dispatch(addNewElementEntry(newDataTypeEntry));
                dispatch(addNewElement(newDataType));
                break;
            case RibbonOperationEnum.ADD_NEW_EMPTY_CLASS:
                const { newBaseClass } = createNewBaseClass(coordinates);
                dispatch(addNewElement(newBaseClass));
                break;
            case RibbonOperationEnum.ADD_NEW_ENUMERATION:
                const { newEnumeration, newEntry } = createNewEnumeration(coordinates);
                dispatch(addNewElementEntry(newEntry));
                dispatch(addNewElement(newEnumeration));
                break;
            case RibbonOperationEnum.ADD_NEW_INTERFACE:
                const { newInterface, newInterfaceMethod, newInterfaceProperty } = createNewInterface(coordinates);
                dispatch(addNewElementEntry(newInterfaceMethod));
                dispatch(addNewElementEntry(newInterfaceProperty));
                dispatch(addNewElement(newInterface));
                break;
            case RibbonOperationEnum.ADD_NEW_OBJECT:
                const { newObjectSlot, newObject } = createNewObject(coordinates);
                dispatch(addNewElementEntry(newObjectSlot));
                dispatch(addNewElement(newObject));
                break;
            case RibbonOperationEnum.ADD_NEW_PRIMITIVE_TYPE:
                const { newPrimitiveType } = createNewPrimitiveType(coordinates);
                dispatch(addNewElement(newPrimitiveType));
                break;
            case RibbonOperationEnum.ADD_NEW_UTILITY:
                const { newUtility, newUtilityProperty, newUtilityMethod } = createNewUtility(coordinates);
                dispatch(addNewElementEntry(newUtilityMethod));
                dispatch(addNewElementEntry(newUtilityProperty));
                dispatch(addNewElement(newUtility));
                break;
        }
    };

    return { addNewElementToCanvas };
};

export default useCanvasAddNewElement;