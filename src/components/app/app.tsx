import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './app.scss';

import Ribbon from '@components/ribbon';
import Canvas from '@components/canvas';

const app = () => {
    return (
        <div id='uml-editor-studio'>
            <Ribbon/>
            <Canvas/>
        </div>
    );
};

export default app;