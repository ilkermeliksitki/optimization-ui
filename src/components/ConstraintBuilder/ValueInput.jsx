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
        <div className="p-4 border-2 border-gray-300 rounded-lg bg-gray-50 mb-4 flex items-center gap-2">
            <label
                htmlFor="value-input-field"
                className="text-lg font-semibold text-gray-700"
            >
                Numeric Value:
            </label>
            <input
                id="value-input-field"
                data-testid="value-input"
                type="text"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter a number"
                className="flex-1 px-4 py-2 text-base min-w-[200px] border border-gray-400 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
                data-testid="add-value-button"
                onClick={handleButtonClick}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors whitespace-nowrap"
            >
                Add
            </button>
        </div>
    );
}
