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
        <div
            className="p-6 border-2 border-gray-300 rounded-lg bg-orange-50 mb-6"
            data-testid="objective-selector"
        >
            <h3 className="text-xl font-bold text-orange-800 mb-4">
                Optimization Objectives
            </h3>
            
            <div className="flex gap-4 items-end flex-wrap">
                {/* Objective Type */}
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="objective-type"
                        className="text-sm font-semibold text-gray-700"
                    >
                        Objective Type:
                    </label>
                    <select
                        id="objective-type"
                        data-testid="objective-type-select"
                        value={objectiveType}
                        onChange={(e) => setObjectiveType(e.target.value)}
                        className="px-4 py-2 text-base min-w-[150px] border border-gray-400 rounded bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                        {objectiveTypes.map(type => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Parameter Selection */}
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="objective-parameter"
                        className="text-sm font-semibold text-gray-700"
                    >
                        Parameter:
                    </label>
                    <select
                        id="objective-parameter"
                        data-testid="objective-parameter-select"
                        value={selectedParameter}
                        onChange={(e) => setSelectedParameter(e.target.value)}
                        className="px-4 py-2 text-base min-w-[200px] border border-gray-400 rounded bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                        <option value="">Select Output</option>
                        {outputs.map(output => (
                            <option key={output} value={output}>
                                {output}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Add Button */}
                <button
                    data-testid="add-objective-button"
                    onClick={handleAdd}
                    className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors whitespace-nowrap"
                >
                    Add Objective
                </button>
            </div>
        </div>
    );
}
