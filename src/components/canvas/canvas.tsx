import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './canvas.scss';

class Canvas extends React.Component {
    render() {
        return (
            <div id='canvas'>
                <svg id='svg-canvas' viewBox='0 0 100 100' width='100%' height='100%'/>
            </div>
        );
    }
}

export default Canvas;