import React from 'react';
import ObjectiveSelector from '@/components/ObjectiveBuilder/ObjectiveSelector.jsx';

export default function ObjectiveBuilderStep({
    savedObjectives,
    availableOutputs,
    onAddObjective,
    onDeleteObjective
}) {
    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Step 2: Define Optimization Objectives</h2>
                <p className="text-gray-600 mt-2">Specify what you want to maximize, minimize, or target</p>
            </div>
            <ObjectiveSelector
                outputs={availableOutputs}
                onAddObjective={onAddObjective}
            />

            {savedObjectives.length > 0 && (
                <div className="saved-objectives">
                    <h2>Saved Objectives</h2>
                    {savedObjectives.map((objective, idx) => (
                        <div key={idx} className="saved-objective">
                            <div className="objective-display">
                                <span className="objective-type">{objective.type}</span>
                                <span className="objective-parameter">{objective.parameter}</span>
                            </div>
                            <button
                                onClick={() => onDeleteObjective(idx)}
                                className="delete-button"
                                data-testid={`delete-objective-${idx}`}
                            >
                                Delete 
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
