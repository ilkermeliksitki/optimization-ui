import React, { useState } from 'react';

export default function ValueInput({ onValueSubmit }) {
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        const trimmedValue = value.trim();
        if (trimmedValue !== '') {
            onValueSubmit(trimmedValue);
            setValue(''); // clear after submission
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleButtonClick = () => {
        handleSubmit();
    };

    return (
        <div className="value-input" >
            <label htmlFor="value-input-field">Value:</label>
            <input
                id="value-input-field"
                data-testid="value-input"
                type="text"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter a number"
            />
            <button
                data-testid="add-value-button"
                onClick={handleButtonClick}
                className="add-value-button"
            >
                Add
            </button>
        </div>
    );

}
