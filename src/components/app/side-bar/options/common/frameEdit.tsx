import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FrameEdit = (props: {
    frameName: string;
    inputLabel: string;
    onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    children: Array<React.ReactNode> | React.ReactNode
}) => {
    const { frameName, inputLabel, onNameChange } = props;

    return (
        <div className='container' style={{margin: '10px'}}>
            <div className='field'>
                <label className='label'>{inputLabel}</label>
                <div className='control'>
                    <input
                        value={frameName}
                        onChange={(ev) => onNameChange(ev)}
                        type='text'
                        className='input'
                        placeholder={inputLabel}
                    />
                </div>
            </div>
            {props.children}
        </div>
    );
};

export default FrameEdit;