import React, { useState } from 'react';
import './App.css';
import Stepper from '@/components/Stepper/Stepper.jsx';
import ConstraintBuilderStep from '@/components/Steps/ConstraintBuilderStep.jsx';
import ObjectiveBuilderStep from '@/components/Steps/ObjectiveBuilderStep.jsx';
import ReviewStep from '@/components/Steps/ReviewStep.jsx';
import ResultsStep from '@/components/Steps/ResultsStep.jsx';
import ProgressModal from '@/components/ProgressModal/ProgressModal.jsx';
import { useToast } from '@/contexts/ToastContext.jsx';
import { runMockSimulation } from '@/utils/mockSimulation.js';

export default function App() {
    const { showToast } = useToast();
    const [currentStep, setCurrentStep] = useState(0);
    const [savedConstraints, setSavedConstraints] = useState([]);
    const [savedObjectives, setSavedObjectives] = useState([]);
    const [tokens, setTokens] = useState([
        { type: 'placeholder', value: null, id: 1 },
    ]);
    const [nextId, setNextId] = useState(2);

    // simulation state
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationProgress, setSimulationProgress] = useState(0);
    const [simulationResults, setSimulationResults] = useState(null);

    const availableOutputs = ['growth_rate_h-1', 'titer_g_L', 'yield_percent'];

    const steps = [
        { title: 'Constraints', description: 'Define constraints' },
        { title: 'Objectives', description: 'Set optimization goals' },
        { title: 'Review', description: 'Review and submit' },
        { title: 'Results', description: 'View simulation results' }
    ];

    // Constraint handlers
    const handleAddToken = (tokenData) => {
        setTokens((prev) => {
            // find first placeholder index
            const placeholderIndex = prev.findIndex(t => t.type === 'placeholder');
            if (placeholderIndex !== -1) {
                const newTokens = [...prev];
                // replace placeholder with new token
                newTokens[placeholderIndex] = { ...tokenData, id: nextId };
                // only add new placeholder if there isn't one already
                const hasPlaceholder = newTokens.some(t => t.type === 'placeholder');
                if (!hasPlaceholder) {
                    newTokens.push({ type: 'placeholder', value: null, id: nextId + 1 });
                    setNextId(nextId => nextId + 2);
                } else {
                    setNextId(nextId => nextId + 1);
                }
                return newTokens;
            }
            return prev;
        });
    };

    // handler for removing tokens (clicked on board) by converting it back to a placeholder
    const handleRemoveToken = (id) => {
        setTokens((prev) => {
            const newTokens = prev.map(t =>
                t.id === id ? { type: 'placeholder', value: null, id: t.id } : t
            );
            // clean the extra placeholders. keep only one at the end
            const placeholderIndices = [];
            newTokens.forEach((t, idx) => {
                if (t.type === 'placeholder')
                    placeholderIndices.push(idx);
            });
            // if multiple placeholders, remove all except the last one
            if (placeholderIndices.length > 1) {
                return newTokens.filter((t, idx) => {
                    if (t.type === 'placeholder') {
                        return idx === placeholderIndices[placeholderIndices.length - 1];
                    }
                    return true;
                });
            }
            return newTokens;
        });
    };

    const handleOperatorClick = (operator) => {
        handleAddToken({ type: 'operator', value: operator });
    };

    const handleParameterSelect = (parameter) => {
        handleAddToken({ type: 'parameter', value: parameter });
    };

    const handleValueSubmit = (value) => {
        handleAddToken({ type: 'value', value: value });
    };

    const handleDone = (result) => {
        if (result.isValid) {
            // save the constraint
            setSavedConstraints(prev => [...prev, result.constraint]);

            // reset the constraint board
            setTokens([{ type: 'placeholder', value: null, id: nextId }]);
            setNextId(nextId + 1);
            showToast('Constraint added successfully!', 'success');
        } else {
            showToast(`Invalid constraint: ${result.error}`, 'error');
        }
    };

    const handleDeleteConstraint = (index) => {
        setSavedConstraints((prev) => prev.filter((_, idx) => idx !== index));
        showToast('Constraint deleted', 'info');
    };

    const handleEditConstraint = (index) => {
        // get the constraint to edit
        const constraintToEdit = savedConstraints[index];

        // convert constraint back to tokens with ids
        let currentId = nextId;
        const loadedTokens = constraintToEdit.map((token) => {
            const newToken = { ...token, id: currentId };
            currentId++;
            return newToken;
        });

        // add a placeholder at the end
        loadedTokens.push({ type: 'placeholder', value: null, id: currentId });
        currentId++;

        // set tokens
        setTokens(loadedTokens);
        setNextId(currentId);
        setSavedConstraints(prev => prev.filter((_, i) => i !== index));
        showToast('Constraint loaded for editing', 'info');
    };

    // Objective handlers
    const handleAddObjective = (objective) => {
        setSavedObjectives(prev => [...prev, objective]);
        showToast('Objective added successfully!', 'success');
    };

    const handleDeleteObjective = (index) => {
        setSavedObjectives(prev => prev.filter((_, i) => i !== index));
        showToast('Objective deleted', 'info');
    };

    // Simulation handler
    const handleRunSimulation = async () => {
        setIsSimulating(true);
        setSimulationProgress(0);

        // simulate progress updates
        const progressInterval = setInterval(() => {
            setSimulationProgress(prev => {
                if (prev >= 95) {
                    clearInterval(progressInterval);
                    return 95;
                }
                return prev + 5;
            });
        }, 100);

        try {
            // Run mock simulation
            const results = await runMockSimulation(savedConstraints, savedObjectives);

            clearInterval(progressInterval);
            setSimulationProgress(100);
            setSimulationResults(results);

            // wait a moment to show 100%
            setTimeout(() => {
                setIsSimulating(false);
                setCurrentStep(3); // Navigate to Results step
                showToast('Simulation completed successfully!', 'success');
            }, 500);
        } catch (error) {
            clearInterval(progressInterval);
            setIsSimulating(false);
            showToast('Simulation failed', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
                    Bioprocess Optimization Builder
                </h1>

                <Stepper steps={steps} currentStep={currentStep} />

                <div className="mt-8">
                    {currentStep === 0 && (
                        <ConstraintBuilderStep
                            tokens={tokens}
                            savedConstraints={savedConstraints}
                            onOperatorClick={handleOperatorClick}
                            onParameterSelect={handleParameterSelect}
                            onValueSubmit={handleValueSubmit}
                            onRemoveToken={handleRemoveToken}
                            onDone={handleDone}
                            onEditConstraint={handleEditConstraint}
                            onDeleteConstraint={handleDeleteConstraint}
                        />
                    )}

                    {currentStep === 1 && (
                        <ObjectiveBuilderStep
                            savedObjectives={savedObjectives}
                            availableOutputs={availableOutputs}
                            onAddObjective={handleAddObjective}
                            onDeleteObjective={handleDeleteObjective}
                        />
                    )}

                    {currentStep === 2 && (
                        <ReviewStep
                            savedConstraints={savedConstraints}
                            savedObjectives={savedObjectives}
                            goToStep={setCurrentStep}
                            onSubmit={handleRunSimulation}
                        />
                    )}

                    {currentStep === 3 && (
                        <ResultsStep
                            results={simulationResults}
                            goToStep={setCurrentStep}
                        />
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    <button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        disabled={currentStep === 0}
                        data-testid="back-button"
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${
                            currentStep === 0
                                ? 'invisible'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                    >
                        Back
                    </button>

                    {currentStep < 3 && (
                        <button
                            onClick={() => setCurrentStep(currentStep + 1)}
                            data-testid="next-button"
                            className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>

            {/* Progress Modal */}
            <ProgressModal
                isOpen={isSimulating}
                progress={simulationProgress}
                message="Running optimization simulation..."
            />
        </div>
    );
}
