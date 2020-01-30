import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Options = (props: {
    children: Array<React.ReactNode>,
    onSelectNewOption: (selectedOptionIndex: number) => void
}) => {
    const { children, onSelectNewOption } = props;
    const [selectedOption, selectNewOption] = React.useState(0);
    const [hiddenOptions, hideOptions] = React.useState(false);

    const selectOptionAndClose = (newOptionIndex: number) => {
        selectNewOption(newOptionIndex);
        hideOptions(!hiddenOptions);
        onSelectNewOption(newOptionIndex);
    };

    const showAllOptions = () => {
        hideOptions(!hiddenOptions);
    };

    const createOption = () => {
        return children.map((option, index) => {
            return (
                <a href='#' key={index} className='dropdown-item option' onClick={() => selectOptionAndClose(index)}>
                    {option}
                </a>
            );
        });
    };

    return (
        <div className={`dropdown ${hiddenOptions ? 'is-active' : ''}`}>
            <div className='dropdown-trigger'>
                <button className='button' aria-haspopup='true' aria-controls='dropdown-menu' onClick={(ev) => showAllOptions()}>
                    <span className='option'>{children[selectedOption]}</span>
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

export default Options;