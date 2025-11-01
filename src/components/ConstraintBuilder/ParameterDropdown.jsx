import React, {useState} from 'react';


export default function ParameterDropdown({ onParameterSelect }) {
    const parameters = ['glucose_g_L', 'fructose_g_L', 'PH', 'temperature'];
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        const selected = event.target.value;
        if (selected) {
            onParameterSelect(selected);
            // setValue(""); // reset to the default option
        }
    };

    return (
        <div className="parameter-dropdown">
            <label htmlFor="parameter-select">Parameters: </label>
            <select
                id="parameter-select"
                data-testid="parameter-dropdown"
                value={value}
                onChange={handleChange}
            >
                <option value=""> Select Parameter </option>
                {parameters.map((param) => (
                    <option key={param} value={param}>
                        {param}
                    </option>
                ))}
            </select>
        </div>
    );
}
