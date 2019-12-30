import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './dropdown.scss';

const TextDropdown = (props: { options: Array<string>, defaultOption: string, onSelectNewOption: (newSelectedOption: string) => void }) => {
    const { defaultOption, options, onSelectNewOption } = props;
    const [selectedOption, selectNewOption] = React.useState(defaultOption);
    const [hiddenOptions, hideOptions] = React.useState(true);

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
                <div key={index} className='option' onClick={(ev) => selectOptionAndClose(option)}>
                    <p>{option}</p>
                </div>
            );
        });
    };

    return (
        <div className='dropdown'>
            <div className='selected-option' onClick={(ev) => showAllOptions()}>
                <div className='option'>
                        <p>{selectedOption}</p>
                </div>
            </div>
            <div hidden={hiddenOptions} className='options'>
                {createOption()}
            </div>
        </div>
    );
};

export default TextDropdown;