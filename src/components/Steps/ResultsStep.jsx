import React from 'react';
import { CheckCircle2, XCircle, TrendingUp, Activity } from 'lucide-react';

export default function ResultsStep({ results, goToStep }) {
    // for missing results
    if (!results) {
        return (
            <div className="text-center p-12 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    No results available
                </h2>
                <p className="text-gray-600 mb-6">
                    Run a simulation to see results
                </p>
                <button
                    onClick={() => goToStep(2)}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                >
                    Go to Review
                </button>
            </div>
        );
    }

    const { objectiveValues = [], constraintsSatisfied = [], convergenceData = [], metadata = {} } = results;

    return (
        <div className="space-y-6">
            {/* header */}
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                    Optimization Results
                </h2>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-50 border-2 border-green-500 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-semibold">
                        {metadata.status || 'Optimization Complete'}
                    </span>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                    {metadata.iterations && `${metadata.iterations} iterations`}
                    {metadata.computationTime && ` • ${metadata.computationTime}`}
                </div>
            </div>

            {/* objective values section */}
            <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                    Objective Values
                </h3>

                {objectiveValues.length === 0 ? (
                    <p className="text-gray-600 italic">No objectives defined</p>
                ) : (
                    <div className="space-y-3">
                        {objectiveValues.map((objective, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    {objective.achieved && (
                                        <CheckCircle2
                                            data-testid="objective-achieved"
                                            className="w-5 h-5 text-green-600"
                                        />
                                    )}
                                    <div>
                                        <span className="font-semibold text-gray-800">
                                            {objective.name}
                                        </span>
                                        <span className="ml-2 text-sm text-gray-600">
                                            ({objective.target})
                                        </span>
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-blue-600">
                                    {objective.value}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* constraint satisfaction section */}
            <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-green-500" />
                    Constraint Satisfaction
                </h3>

                {constraintsSatisfied.length === 0 ? (
                    <p className="text-gray-600 italic">No constraints defined</p>
                ) : (
                    <div className="space-y-3">
                        {constraintsSatisfied.map((constraint, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    {constraint.satisfied ? (
                                        <CheckCircle2
                                            data-testid="constraint-satisfied"
                                            className="w-5 h-5 text-green-600"
                                        />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-red-600" />
                                    )}
                                    <span className="font-medium text-gray-800">
                                        {constraint.constraint}
                                    </span>
                                </div>
                                <div className="text-xl font-bold text-green-600">
                                    {constraint.value}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* convergence plot section - placeholder for phase 4 */}
            <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Convergence Plot
                </h3>
                <div
                    data-testid="convergence-chart"
                    className="h-64 bg-gray-50 rounded flex items-center justify-center border-2 border-dashed border-gray-300"
                >
                    <p className="text-gray-500">
                        Chart will be rendered here (Phase 4)
                    </p>
                </div>
            </div>

            {/* action buttons */}
            <div className="flex gap-4 justify-center pt-6">
                <button
                    data-testid="edit-constraints-button"
                    onClick={() => goToStep(0)}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
                >
                    Edit Constraints
                </button>
                <button
                    data-testid="edit-objectives-button"
                    onClick={() => goToStep(1)}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
                >
                    Edit Objectives
                </button>
                <button
                    data-testid="run-again-button"
                    onClick={() => goToStep(2)}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                >
                    Run Again
                </button>
            </div>
        </div>
    );
}
