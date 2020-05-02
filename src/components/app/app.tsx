import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './app.scss';
import 'bulma';

import Ribbon from '@components/app/ribbon';
import Canvas from './canvas';
import SideBar from '@components/app/side-bar';
import useRemoveSelectedElement from 'hooks/useRemoveSelectedElement';
import DiagramChooserModal from './diagram-chooser-modal/diagramChooserModal';

const app = () => {
    const { removeSelectedElement } = useRemoveSelectedElement();
    const [keyPressed, setKeyPressed] = useState(0);
    const onGlobalKeyPress = (event: KeyboardEvent) => {
        if (event.keyCode === 127) {
            setKeyPressed(127);
        }
    };
    useEffect(() => {
        window.addEventListener('keypress',(ev) => onGlobalKeyPress(ev));

        return () => {
            window.removeEventListener('keypress',(ev) => onGlobalKeyPress(ev));
        };
    }, []);

    if (keyPressed === 127) {
        removeSelectedElement();
        setKeyPressed(0);
    }

    return (
        <div id='uml-editor-studio'>
            <Ribbon/>
            <div id='uml-editor-body'>
                <SideBar/>
                <Canvas/>
            </div>
            <DiagramChooserModal/>
        </div>
    );
};

export default app;