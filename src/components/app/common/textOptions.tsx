import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './options.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TextOptions = (props: { options: Array<string>, defaultOption: string, onSelectNewOption: (newSelectedOption: string) => void }) => {
    const { defaultOption, options, onSelectNewOption } = props;
    const [selectedOption, selectNewOption] = React.useState(defaultOption);
    const [hiddenOptions, hideOptions] = React.useState(false);

    const selectOptionAndClose = (newOption: string) => {
        selectNewOption(newOption);
        hideOptions(!hiddenOptions);
        onSelectNewOption(newOption);
    };

    const showAllOptions = () => {
        hideOptions(!hiddenOptions);
    };

    const createOption = () => {
        return options.map((option, index) => {
            return (
                <a href='#' key={index} className='dropdown-item option' onClick={(ev) => selectOptionAndClose(option)}>
                    {option}
                </a>
            );
        });
    };

    return (
        <div className={`dropdown ${hiddenOptions ? 'is-active' : ''}`}>
            <div className='dropdown-trigger'>
                <button className='button' aria-haspopup='true' aria-controls='dropdown-menu' onClick={(ev) => showAllOptions()}>
                    <span className='option'>{selectedOption}</span>
                    <span className='icon is-small'>
                        <FontAwesomeIcon icon='caret-down'/>
                        <i className='fas fa-angle-down' aria-hidden='true'/>
                    </span>
                </button>
            </div>
            <div className='dropdown-menu' role='menu'>
                <div className='dropdown-content'>
                    {createOption()}
                </div>
            </div>
        </div>
    );
};

export default TextOptions;