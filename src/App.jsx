import React, { useState } from 'react';
import './App.css';
import ConstraintBoard from '@/components/ConstraintBuilder/ConstraintBoard.jsx';
import OperatorBar from '@/components/ConstraintBuilder/OperatorBar.jsx';
import ParameterDropdown from '@/components/ConstraintBuilder/ParameterDropdown.jsx';

export default function App() {
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

                // add new placeholder if all are filled
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
            return prev.map(t => {
                if (t.id === id) {
                    return { type: 'placeholder', value: null, id: t.id };
                }
                return t;
            });
        });
    };

    // handler for operator click (wrappper)
    const handleOperatorClick = (operator) => {
        handleAddToken({ type: 'operator', value: operator });
    };

    // handler for parameter selection (wrapper)
    const handleParameterSelect = (parameter) => {
        handleAddToken({ type: 'parameter', value: parameter });
    };

    // handler for Done button click
    const handleDone = (result) => {
        if (result.isValid) {
            console.log('Valid constraint:', result.constraint);
        } else {
            console.error('Invalid constraint:', result.error);
        // TODO: send to backend simulation (will be mocked)
    }};
    return (
        <>
          <OperatorBar onOperatorClick={handleOperatorClick} />
          <ParameterDropdown onParameterSelect={handleParameterSelect} />
          <ConstraintBoard
            tokens={tokens}
            onRemoveToken={handleRemoveToken}
            onDone={handleDone}
          />
        </>
    );
}
