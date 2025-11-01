import React, { useState } from 'react';
import './App.css';
import ConstraintBoard from '@/components/ConstraintBuilder/ConstraintBoard.jsx';
import OperatorBar from '@/components/ConstraintBuilder/OperatorBar.jsx';
import ParameterDropdown from '@/components/ConstraintBuilder/ParameterDropdown.jsx';
import ValueInput from '@/components/ConstraintBuilder/ValueInput.jsx';

export default function App() {
    // store all saved constraint
    const [savedConstraints, setSavedConstraints] = useState([]);

    // store current tokens on the ConstraintBoard
    const [tokens, setTokens] = useState([
        { type: 'placeholder', value: null, id: 1 },
    ]);
    const [nextId, setNextId] = useState(2);

    // handler for adding tokens to the ConstraintBoard from the OperatorBar or ParameterDropdown
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
                t.id === id
                ? { type: 'placeholder', value: null, id: t.id }
                : t
            );

            // clean the extra placeholders. keep only one at the end
            const placeholderIndices = [];
            newTokens.forEach((t, idx) => {
                if (t.type === 'placeholder') {
                    placeholderIndices.push(idx);
                }
            });

            // if multiple placeholders, remove all except the last one
            if (placeholderIndices.length > 1) {
                const filtered = newTokens.filter((t, idx) => {
                    if (t.type === 'placeholder') {
                        return idx === placeholderIndices[placeholderIndices.length - 1];
                    }
                    return true;
                });
                return filtered;
            }
            return newTokens;
        });
    }

    // handler for operator click (wrappper)
    const handleOperatorClick = (operator) => {
        handleAddToken({ type: 'operator', value: operator });
    };

    // handler for parameter selection (wrapper)
    const handleParameterSelect = (parameter) => {
        handleAddToken({ type: 'parameter', value: parameter });
    };

    const handleValueSubmit = (value) => {
        handleAddToken({ type: 'value', value: value });
    };

    // handler for Done button click
    const handleDone = (result) => {
        if (result.isValid) {
            // save the constraint
            setSavedConstraints(prev => [...prev, result.constraint]);

            // reset the constraint board
            setTokens([{ type: 'placeholder', value: null, id: nextId }]);
            setNextId(nextId + 1);

            alert('Constraint saved: ' + JSON.stringify(result.constraint));
        } else {
            alert('Invalid constraint. Please complete the expression.');
        }
        // TODO: send to backend simulation (will be mocked)
    };

    const handleDeleteConstraint = (index) => {
        setSavedConstraints((prev) => prev.filter((_, idx) => idx !== index));
    };

    return (
        <div className="app-container">
            <h1>Constraint Builder</h1>
            <OperatorBar onOperatorClick={handleOperatorClick} />
            <ParameterDropdown onParameterSelect={handleParameterSelect} />
            <ValueInput onValueSubmit={handleValueSubmit} />

            { /* show saved constraints */ }
            {savedConstraints.length > 0 && (
                <div className="saved-constraints">
                    <h2>Saved Constraints:</h2>
                    {savedConstraints.map((constraint, idx) => (
                        <div key={idx} className="saved-constraint">
                            <div className="constraint-display">
                                {constraint.map((token, tokenIdx) => (
                                    <span
                                        key={tokenIdx}
                                        className={`token token-${token.type}`}
                                    >
                                        {token.value}
                                    </span>
                                ))}
                            </div>
                            <button
                                onClick={() => handleDeleteConstraint(idx)}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}

            { /* current working constraint board */ }
            <h2>Current Constraint:</h2>
            <ConstraintBoard
                tokens={tokens}
                onRemoveToken={handleRemoveToken}
                onDone={handleDone}
            />
        </div>
    );
}
