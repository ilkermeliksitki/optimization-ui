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
                <div className="saved-objectives p-6 bg-orange-50 border-2 border-orange-500 rounded-lg">
                    <h2 className="text-xl font-bold text-orange-800 mb-4">
                        Saved Objectives
                    </h2>
                    {savedObjectives.map((objective, idx) => (
                        <div
                            key={idx}
                            className="saved-objective flex justify-between items-center p-4 bg-white rounded-lg border border-orange-200"
                        >
                            <div className="objective-display flex gap-3 items-center">
                                <span className="objective-type px-4 py-2 text-amber-700 font-bold text-sm uppercase">
                                    {objective.type}
                                </span>
                                <span className="objective-parameter px-4 py-2 bg-orange-100 text-orange-800 border-2 border-orange-600 rounded font-bold">
                                    {objective.parameter}
                                </span>
                            </div>
                            <button
                                onClick={() => onDeleteObjective(idx)}
                                className="delete-button px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
