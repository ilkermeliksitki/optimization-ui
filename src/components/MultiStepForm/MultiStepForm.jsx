import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/helpers.js';

export default function MultiStepForm({ children, steps }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState('forward');

    const nextStep = () => {
        if (currentStep < children.length - 1) {
            setDirection('forward');
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setDirection('backward');
            setCurrentStep(currentStep - 1);
        }
    };

    const goToStep = (stepIndex) => {
        setDirection(stepIndex > currentStep ? 'forward' : 'backward');
        setCurrentStep(stepIndex);
    };

    return (
        <div className="w-full">
            {/* render current step with slide animation */}
            <div className="relative overflow-hidden">
                <div
                    key={currentStep}
                    className={cn(
                        "transition-all duration-300 ease-out",
                        direction === 'forward' ? 'animate-slide-in' : 'animate-slide-in'
                    )}
                >
                    {React.cloneElement(children[currentStep], {
                        goToStep,
                        currentStep,
                        nextStep,
                        prevStep,
                    })}
                </div>
            </div>
            {/* navigation buttons */}
            <div className="flex justify-between mt-8">
                <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    data-testid="back-button"
                    className={cn(
                        "flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all",
                        currentStep === 0
                            ? "invisible"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    )}
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                </button>
                {currentStep < children.length - 1 ? (
                    <button
                        onClick={nextStep}
                        data-testid="next-button"
                        className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                ) : null}
            </div>
        </div>
    );
}
