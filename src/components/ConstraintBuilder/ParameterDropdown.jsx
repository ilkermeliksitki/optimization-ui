import React, { useState } from 'react';

export default function ParameterDropdown({ onParameterSelect }) {
    const [selectedParameter, setSelectedParameter] = useState('');
    const parameters = ['glucose_g_L', 'fructose_g_L', 'PH', 'temperature'];

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedParameter(value);
        if (value) {
            onParameterSelect(value);
            setSelectedParameter('');
        }
    };

    return (
        <div className="p-4 border-2 border-gray-300 rounded-lg bg-gray-50 mb-4">
            <label
                htmlFor="parameter-select"
                className="text-sm font-semibold text-gray-700 mr-2"
            >
                Parameters:
            </label>
            <select
                id="parameter-select"
                data-testid="parameter-dropdown"
                value={selectedParameter}
                onChange={handleChange}
                className="px-4 py-2 text-base min-w-[200px] border border-gray-400 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">Select Parameter</option>
                {parameters.map(param => (
                    <option key={param} value={param}>
                        {param}
                    </option>
                ))}
            </select>
        </div>
    );
}
