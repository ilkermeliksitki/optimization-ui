import React from 'react';

export default function OperatorBar({ onOperatorClick }) {
    const operators = ['+', '=', '<', '<=', '>', '>='];

    return (
        <div className="p-4 border-2 border-gray-300 rounded-lg bg-gray-50 mb-4">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Operators:</h3>
            <div className="flex gap-2 flex-wrap">
                {operators.map(op => (
                    <button
                        key={op}
                        onClick={() => onOperatorClick(op)}
                        data-testid={`operator-button-${op}`}
                        className="px-4 py-2 text-xl font-semibold border border-gray-400 bg-white hover:bg-gray-100 rounded transition-colors min-w-[60px]"
                    >
                        {op}
                    </button>
                ))}
            </div>
        </div>
    );
}
