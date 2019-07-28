import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './ribbon.scss';
import RibbonOperationsEnum from '@enums/ribbonOperationsEnum';

class Ribbon extends React.Component {
    render() {
        return (
            <div id='ribbon'>
                <div id='bar'>
                    <p>File</p>
                    <p>Edit</p>
                </div>
                <div id='controlls'>
                    <div id='tools'>
                        <p>tools</p>
                    </div>
                    <div id='elements'>
                        <p>Class</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ribbon;