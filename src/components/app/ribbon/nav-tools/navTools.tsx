import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './navTools.scss';

class NavTools extends React.Component {
    render() {
        return (
            <div id='bar'>
                <ul className='list-items'>
                    <li className='list-item'>File</li>
                    <li className='list-item'>Edit</li>
                </ul>
            </div>
        );
    }
}

export default NavTools;