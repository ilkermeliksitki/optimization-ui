import React, { useState } from 'react';

export default function ObjectiveSelector({ outputs, onAddObjective }) {
    const [objectiveType, setObjectiveType] = useState('maximize');
    const [selectedParameter, setSelectedParameter] = useState('');

    const objectiveTypes = ['maximize', 'minimize', 'target'];

    const handleAdd = () => {
        if (selectedParameter.trim() !== '') {
            onAddObjective({
                type: objectiveType,
                parameter: selectedParameter
            });
            // Reset parameter but keep type for convenience
            setSelectedParameter('');
        }
    };

    return (
        <div className="objective-selector">
            <h3>Optimization Objectives</h3>
            
            <div className="objective-inputs">
                <div className="input-group">
                    <label htmlFor="objective-type">Objective Type:</label>
                    <select
                        id="objective-type"
                        data-testid="objective-type-select"
                        value={objectiveType}
                        onChange={(e) => setObjectiveType(e.target.value)}
                    >
                        {objectiveTypes.map(type => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="objective-parameter">Parameter (KPI):</label>
                    <select
                        id="objective-parameter"
                        data-testid="objective-parameter-select"
                        value={selectedParameter}
                        onChange={(e) => setSelectedParameter(e.target.value)}
                    >
                        <option value="">Select Output</option>
                        {outputs.map(output => (
                            <option key={output} value={output}>
                                {output}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    data-testid="add-objective-button"
                    onClick={handleAdd}
                    className="add-objective-button"
                >
                    Add Objective
                </button>
            </div>
        </div>
    );
}
