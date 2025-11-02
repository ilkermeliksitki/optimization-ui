import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/utils/helpers.js';

export default function Stepper({ steps, currentStep }) {
    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <React.Fragment key={index}>
                        <div className="flex flex-col items-center flex-1">
                           {/* step circle */}
                           <div
                                data-testid={`step-${index}`}
                                data-step={index}
                                data-active={currentStep === index}
                                data-completed={currentStep > index}
                                className={cn(
                                    'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300',
                                    currentStep > index && 'bg-green-500 text-white',
                                    currentStep === index && 'bg-blue-500 text-white ring-4 ring-blue-200',
                                    currentStep < index && 'bg-gray-200 text-gray-500'
                                )}
                           >
                                {currentStep > index ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <span>{index + 1}</span>
                                )}
                           </div>
                           {/* step title */}
                           <div className="mt-2 text-center">
                               <div className={cn(
                                   "text-sm font-semibold",
                                   currentStep === index && "text-blue-600",
                                   currentStep > index && "text-green-600",
                                   currentStep < index && "text-gray-500"
                               )}>
                                   {step.title}
                               </div>
                               <div className="text-xs text-gray-500 mt-1">
                                   {step.description}
                               </div>
                           </div>
                        </div>
                        {/* connection line */}
                        {index < steps.length - 1 && (
                            <div className={cn(
                                "h-0.5 flex-1 transition-all duration-300 mx-2 -mt-8",
                                currentStep > index ? "bg-green-500" : "bg-gray-200"
                            )}/>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
