import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IClassElement from '@interfaces/elements/IClassElement';
import { useDispatch } from 'react-redux';
import { updateElement } from 'store/actions/canvas';
import CanvasEnum from '@enums/storeActions/canvasEnum';

function ClassEditOptions(props: IClassElement) {
    const dispatch = useDispatch();
    
    const editProperties = () => {
        return props.elementData.classProperties.map((classProperty, index) => {
            return (
                <input
                    key={index}
                    type='text'
                    value={classProperty.name}
                    onChange={(ev) => {
                        classProperty.name = ev.target.value;
                        dispatch(updateElement(props));
                    }}
                />
            );
        });        
    };

    const editMethods = () => {
        return props.elementData.classMethods.map((classMethod, index) => {
            return (
                <input
                    key={index}
                    type='text'
                    value={classMethod.name}
                    onChange={(ev) => {
                        classMethod.name = ev.target.value;
                        dispatch(updateElement(props));
                    }}
                />
            );
        });
    };

    console.warn('update');

    const addNewClassProperties = () => {
        props.elementData.classProperties.push({
            accessModifier: 'public',
            name: ''
        });
        dispatch(updateElement(props));
    }

    const addNewClassMethods = () => {
        props.elementData.classMethods.push({
            accessModifier: 'public',
            name: ''
        });
        dispatch(updateElement(props));
    }

    const onClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.elementData.className = event.target.value;
        dispatch(updateElement(props));
    }

    return (
        <div>
            <p>{props.elementData.type}</p>
            <p>Class Name</p>
            <input
                value={props.elementData.className}
                onChange={(ev) => onClassNameChange(ev)}
                type='text'
            />
            <p>Class Properties</p>
            {editProperties()}
            <button onClick={(ev) => addNewClassProperties()}>Add</button>
            <p>Class Methods</p>
            {editMethods()}
            <button onClick={(ev) => addNewClassMethods()}>Add</button>
        </div>
    );
}

export default ClassEditOptions;