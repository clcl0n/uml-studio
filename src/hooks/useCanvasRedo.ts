import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import IStoreState from '@interfaces/IStoreState';
import useDiagram from './useDiagram';
import DiagramTypeEnum from '@enums/diagramTypeEnum';
import { setRemovedElementToHistory, addElementToHistory, addNewElement, addNewElementEntry, removeElement, removeElementEntry } from '@store/actions/classDiagram.action';

export const useCanvasRedo = () => {
    const dispatch = useDispatch();
    let isEnabled: boolean = false;
    const { classDiagram, stateDiagram, diagramType } = useDiagram();

    if (diagramType === DiagramTypeEnum.CLASS) {
        isEnabled = classDiagram.redoElementsHistory.length > 0;


    } else if (diagramType === DiagramTypeEnum.STATE) {

    }

    const redo = () => {
        if (classDiagram.redoElementsHistory.length > 0) {
            let latestElement = classDiagram.redoElementsHistory.pop();
            if(classDiagram.elements.allIds.includes(latestElement.elements.id)) {
                // update coordinates
                latestElement = {
                    elements: classDiagram.elements.byId[latestElement.elements.id],
                    entries: latestElement.entries.map((entry) => classDiagram.elementEntries.byId[entry.id])
                };
                dispatch(removeElement(latestElement.elements));
                latestElement.entries.forEach(entry => dispatch(removeElementEntry(entry)));
            } else {
                latestElement.entries.forEach((entry) => dispatch(addNewElementEntry(entry)));
                dispatch(addNewElement(latestElement.elements));
                dispatch(setRemovedElementToHistory(classDiagram.redoElementsHistory));
            }
            dispatch(addElementToHistory(latestElement));
        }
    }
  
    return {
        isEnabled,
        redo
    };
};