import React, { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ReviewStep({
    savedConstraints,
    savedObjectives,
    goToStep,
    onSubmit,
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            // simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // mock successful response
            const mockResponse = { 
                experiment: [
                    {
                        inputs: {glucose_g_L: 15, pH: 5.8},
                        kpis: {growth_rate: 0.33, titer_g_L: 12.5}
                    }
                ]
            };

            setSubmitStatus('success');
            if (onSubmit)
                onSubmit(mockResponse);
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Step 3: Review & Submit</h2>
                <p className="text-gray-600 mt-2">Review your configuration before running the simulation</p>
            </div>

            {/* Constraints Summary */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Constraints ({savedConstraints.length})</h3>
                    <button
                        onClick={() => goToStep(0)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                        Edit Constraints
                    </button>
                </div>
                {savedConstraints.length === 0 ? (
                    <p className="text-gray-500 italic">No constraints defined</p>
                ) : (
                    <div className="space-y-2">
                        {savedConstraints.map((constraint, idx) => (
                            <div key={idx} className="flex gap-2 items-center p-3 bg-gray-50 rounded">
                                <span className="text-gray-600 font-mono">#{idx + 1}</span>
                                {constraint.map((token, tokenIdx) => (
                                    <span
                                        key={tokenIdx}
                                        className={`token token-${token.type}`}
                                    >
                                        {token.value}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Objectives Summary */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Objectives ({savedObjectives.length})</h3>
                    <button
                        onClick={() => goToStep(1)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                        Edit Objectives
                    </button>
                </div>
                {savedObjectives.length === 0 ? (
                    <p className="text-gray-500 italic">No objectives defined</p>
                ) : (
                    <div className="space-y-2">
                        {savedObjectives.map((objective, idx) => (
                            <div key={idx} className="flex gap-3 items-center p-3 bg-gray-50 rounded">
                                <span className="objective-type px-4 py-2 text-amber-700 font-bold text-sm uppercase">{objective.type}</span>
                                <span className="objective-parameter px-4 py-2 text-orange-800 font-bold">{objective.parameter}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Submit Button or Status */}
            <div className="flex flex-col items-center gap-4 mt-8">
                {submitStatus === null && (
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || savedConstraints.length === 0}
                        data-testid="submit-button"
                        className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-bold text-lg transition-all disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Running Simulation...
                            </>
                        ) : (
                            'Run Simulation'
                        )}
                    </button>
                )}

                {submitStatus === 'success' && (
                    <div className="flex items-center gap-3 p-4 bg-green-100 border-2 border-green-500 rounded-lg text-green-800">
                        <CheckCircle2 className="w-6 h-6" />
                        <div>
                            <p className="font-semibold">Simulation completed successfully!</p>
                            <p className="text-sm">Results have been generated.</p>
                        </div>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="flex items-center gap-3 p-4 bg-red-100 border-2 border-red-500 rounded-lg text-red-800">
                        <AlertCircle className="w-6 h-6" />
                        <div>
                            <p className="font-semibold">Simulation failed</p>
                            <p className="text-sm">Please try again or contact support.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
