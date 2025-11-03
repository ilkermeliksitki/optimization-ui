import React from 'react';
import ConstraintBoard from '@/components/ConstraintBuilder/ConstraintBoard.jsx';
import OperatorBar from '@/components/ConstraintBuilder/OperatorBar.jsx';
import ParameterDropdown from '@/components/ConstraintBuilder/ParameterDropdown.jsx';
import ValueInput from '@/components/ConstraintBuilder/ValueInput.jsx';


export default function ConstraintBuilderStep({
    tokens,
    savedConstraints,
    onAddToken,
    onRemoveToken,
    onDone,
    onEditConstraint,
    onDeleteConstraint,
    onOperatorClick,
    onOperatorSelect,
    onParameterSelect,
    onValueSubmit,
}) {
    return (
        <div className="space-y-6" >
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Step 1: Define Constraints</h2>
                <p className="text-gray-600 mt-2">Build your constraints using parameters, operators, and values.</p>
            </div>
            <OperatorBar onOperatorClick={onOperatorClick}/>
            <ParameterDropdown onParameterSelect={onParameterSelect} />
            <ValueInput onValueSubmit={onValueSubmit} />
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Current Constraint:</h3>
                <ConstraintBoard
                    tokens={tokens}
                    onRemoveToken={onRemoveToken}
                    onDone={onDone}
                />
            </div>
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
                            <div className="constraint-actions">
                                <button
                                    onClick={() => onEditConstraint(idx)}
                                    className="edit-button"
                                    data-testid={`edit-constraint-${idx}`}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDeleteConstraint(idx)}
                                    className="delete-button"
                                    data-testid={`delete-constraint-${idx}`}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
