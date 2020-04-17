import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import IStoreState from '@interfaces/IStoreState';
import useDiagram from './useDiagram';
import DiagramTypeEnum from '@enums/diagramTypeEnum';
import { setRemovedElementToHistory, addNewElement, addNewElementEntry, addRedoElementToHistory, removeElement, removeElementEntry } from '@store/actions/classDiagram.action';
import useRemoveSelectedElement from './useRemoveSelectedElement';

export const useCanvasUndo = () => {
    const dispatch = useDispatch();
    let isEnabled: boolean = false;
    const { classDiagram, stateDiagram, diagramType } = useDiagram();

    if (diagramType === DiagramTypeEnum.CLASS) {
        isEnabled = classDiagram.elementsHistory.length > 0;

    } else if (diagramType === DiagramTypeEnum.STATE) {

    }

    const undo = () => {
        if (classDiagram.elementsHistory.length > 0) {
            let latestElement = classDiagram.elementsHistory.pop();
            if (classDiagram.elements.allIds.includes(latestElement.elements.id)) {
                // update coordinates
                latestElement = {
                    elements: classDiagram.elements.byId[latestElement.elements.id],
                    entries: latestElement.entries.map((entry) => classDiagram.elementEntries.byId[entry.id])
                };
                dispatch(removeElement(latestElement.elements));
                latestElement.entries.forEach(entry => dispatch(removeElementEntry(entry)));
            } else {
                dispatch(setRemovedElementToHistory(classDiagram.elementsHistory));
                latestElement.entries.forEach((entry) => dispatch(addNewElementEntry(entry)));
                dispatch(addNewElement(latestElement.elements));
            }
            dispatch(addRedoElementToHistory(latestElement));
        }
    }

    return {
        isEnabled,
        undo
    };
};