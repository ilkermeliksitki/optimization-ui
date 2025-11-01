import React from 'react';

export default function OperatorBar({ onOperatorClick }) {
    const operators = ['+', '=', '<', '<=', '>', '>='];  // ← Added '+'
    
    return (
        <div className="operator-bar">
            <h3>Operators:</h3>
            {operators.map((operator) => (
                <button
                    key={operator}
                    data-testid={`operator-button-${operator}`}  // ← Added data-testid
                    onClick={() => onOperatorClick(operator)}
                    className="operator-button"
                >
                    {operator}
                </button>
            ))}
        </div>
    );
}
