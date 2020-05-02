import { useDispatch } from 'react-redux';
import RibbonOperationEnum from '@enums/ribbonOperationEnum';
import { createNewClass, createNewBaseClass } from '@utils/elements/class';
import { createNewDataType } from '@utils/elements/dataType';
import { createNewEnumeration } from '@utils/elements/enumeration';
import { createNewInterface } from '@utils/elements/interface';
import { createNewObject } from '@utils/elements/object';
import { createNewPrimitiveType } from '@utils/elements/primitiveType';
import { createNewUtility } from '@utils/elements/utility';
import { addNewElement, addNewElementEntry, addUndoElement } from '@store/actions/classDiagram.action';
import ICoordinates from '@interfaces/ICoordinates';
import useDiagram from './useDiagram';
import DiagramTypeEnum from '@enums/diagramTypeEnum';
import { createNewSimpleStateElement, createNewStateElement, createNewInitialStateElement, createNewFinalStateElement } from '@utils/elements/stateElement';
import { addNewStateElement, addNewInitialStateElement, addNewFinalStateElement, addNewForkJoinElement, addNewChoiceElement, addUndoStateElement, addUndoInitialStateElement, addUndoFinalStateElement } from '@store/actions/stateDiagram.action';
import { createNewFork } from '@utils/elements/forkJoin';
import StateDiagramElementsEnum from '@enums/stateDiagramElementsEnum';
import { createNewChoice } from '@utils/elements/choice';
import StateHistoryTypeEnum from '@enums/stateHistoryTypeEnum';
import FinalStateElement from '@components/app/canvas/diagrams/state-diagram/final-state-element/finalStateElement';

const useCanvasAddNewElement = () => {
    const dispatch = useDispatch();
    const { diagramType } = useDiagram();
    
    const addNewElementToCanvas = (coordinates: ICoordinates, elementType: RibbonOperationEnum) => {
        if (diagramType === DiagramTypeEnum.CLASS) {
            switch(elementType) {
                case RibbonOperationEnum.ADD_NEW_CLASS:
                    const newClass = createNewClass(coordinates);
                    dispatch(addNewElement(newClass.newClass));
                    dispatch(addNewElementEntry(newClass.newClassMethod));
                    dispatch(addNewElementEntry(newClass.newClassProperty));
                    dispatch(addUndoElement({ element: newClass.newClass, entries: [newClass.newClassMethod, newClass.newClassProperty] }))
                    break;
                case RibbonOperationEnum.ADD_NEW_DATA_TYPE:
                    const { newDataType, newDataTypeEntry } = createNewDataType(coordinates);
                    dispatch(addNewElementEntry(newDataTypeEntry));
                    dispatch(addNewElement(newDataType));
                    dispatch(addUndoElement({ element: newDataType, entries: [newDataTypeEntry] }))
                    break;
                case RibbonOperationEnum.ADD_NEW_EMPTY_CLASS:
                    const { newBaseClass } = createNewBaseClass(coordinates);
                    dispatch(addNewElement(newBaseClass));
                    dispatch(addUndoElement({ element: newBaseClass, entries: [] }))
                    break;
                case RibbonOperationEnum.ADD_NEW_ENUMERATION:
                    const { newEnumeration, newEntry } = createNewEnumeration(coordinates);
                    dispatch(addNewElementEntry(newEntry));
                    dispatch(addNewElement(newEnumeration));
                    dispatch(addUndoElement({ element: newEnumeration, entries: [newEntry] }))
                    break;
                case RibbonOperationEnum.ADD_NEW_INTERFACE:
                    const { newInterface, newInterfaceMethod, newInterfaceProperty } = createNewInterface(coordinates);
                    dispatch(addNewElementEntry(newInterfaceMethod));
                    dispatch(addNewElementEntry(newInterfaceProperty));
                    dispatch(addNewElement(newInterface));
                    dispatch(addUndoElement({ element: newInterface, entries: [newInterfaceProperty, newInterfaceMethod] }))
                    break;
                case RibbonOperationEnum.ADD_NEW_OBJECT:
                    const { newObjectSlot, newObject } = createNewObject(coordinates);
                    dispatch(addNewElementEntry(newObjectSlot));
                    dispatch(addNewElement(newObject));
                    dispatch(addUndoElement({ element: newObject, entries: [newObjectSlot] }))
                    break;
                case RibbonOperationEnum.ADD_NEW_PRIMITIVE_TYPE:
                    const { newPrimitiveType } = createNewPrimitiveType(coordinates);
                    dispatch(addNewElement(newPrimitiveType));
                    dispatch(addUndoElement({ element: newPrimitiveType, entries: [] }))
                    break;
                case RibbonOperationEnum.ADD_NEW_UTILITY:
                    const { newUtility, newUtilityProperty, newUtilityMethod } = createNewUtility(coordinates);
                    dispatch(addNewElementEntry(newUtilityMethod));
                    dispatch(addNewElementEntry(newUtilityProperty));
                    dispatch(addNewElement(newUtility));
                    dispatch(addUndoElement({ element: newUtility, entries: [newUtilityProperty, newUtilityMethod] }))
                    break;
            }
        } else if (diagramType === DiagramTypeEnum.STATE) {
            switch(elementType) {
                case RibbonOperationEnum.ADD_NEW_SIMPLE_STATE:
                    const { simpleStateElement } = createNewSimpleStateElement(coordinates);
                    dispatch(addNewStateElement(simpleStateElement));
                    dispatch(addUndoStateElement(simpleStateElement));
                    break;
                case RibbonOperationEnum.ADD_NEW_STATE:
                    const { stateElement } = createNewStateElement(coordinates);
                    dispatch(addNewStateElement(stateElement));
                    dispatch(addUndoStateElement(stateElement));
                    break;
                case RibbonOperationEnum.ADD_NEW_INITIAL_STATE:
                    const { initialStateElement } = createNewInitialStateElement(coordinates);
                    dispatch(addNewInitialStateElement(initialStateElement));
                    dispatch(addUndoInitialStateElement(initialStateElement));
                    break;
                case RibbonOperationEnum.ADD_NEW_FINAL_STATE:
                    const { finalStateElement } = createNewFinalStateElement(coordinates);
                    dispatch(addNewFinalStateElement(finalStateElement));
                    dispatch(addUndoFinalStateElement(finalStateElement));
                    break;
                case RibbonOperationEnum.ADD_NEW_FORK:
                    const { newForkJoin: newFork } = createNewFork(coordinates, StateDiagramElementsEnum.FORK);
                    dispatch(addNewForkJoinElement(newFork));
                    break;
                case RibbonOperationEnum.ADD_NEW_JOIN:
                    const { newForkJoin: newJoin } = createNewFork(coordinates, StateDiagramElementsEnum.JOIN);
                    dispatch(addNewForkJoinElement(newJoin));
                    break;
                case RibbonOperationEnum.ADD_NEW_CHOICE:
                    const { newChoice } = createNewChoice(coordinates);
                    dispatch(addNewChoiceElement(newChoice));
                    break;
            }
        }
     };

    return { addNewElementToCanvas };
};

export default useCanvasAddNewElement;