import React from 'react';
import { Loader2 } from 'lucide-react';

export default function ProgressModal({ isOpen, progress, message }) {
    if (!isOpen) return null;
    return (
        <div
            data-testid="modal-backdrop"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div
                data-testid="progress-modal"
                className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4"
            >
                {/* loading spinner */}
                <div className="flex justify-center mb-6">
                    <Loader2
                        data-testid="loading-spinner"
                        className="w-12 h-12 text-blue-500 animate-spin"
                    />
                </div>
                {/* message */}
                <h3 className="text-xl font-bold text-gray-800 text-center mb-6">
                    {message}
                </h3>
                {/* progress bar container */}
                <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden mb-4">
                    <div
                        data-testid="progress-bar"
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                {/* progress percentage */}
                <div className="text-center">
                    <span className="text-2xl font-bold text-gray-700">
                        {progress}%
                    </span>
                </div>
            </div>
        </div>
    );
}
