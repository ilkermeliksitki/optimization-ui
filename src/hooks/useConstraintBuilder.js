import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext.jsx';

export function useConstraintBuilder() {
    const { showToast } = useToast();
    const [savedConstraints, setSavedConstraints] = useState([]);
    const [tokens, setTokens] = useState([
        { type: 'placeholder', value: null, id: 1 },
    ]);
    const [nextId, setNextId] = useState(2);

    const handleAddToken = (tokenData) => {
        setTokens((prev) => {
            const placeholderIndex = prev.findIndex(t => t.type === 'placeholder');
            if (placeholderIndex !== -1) {
                const newTokens = [...prev];
                newTokens[placeholderIndex] = { ...tokenData, id: nextId };
                const hasPlaceholder = newTokens.some(t => t.type === 'placeholder');
                if (!hasPlaceholder) {
                    newTokens.push({ type: 'placeholder', value: null, id: nextId + 1 });
                    setNextId(nextId + 2);
                } else {
                    setNextId(nextId + 1);
                }
                return newTokens;
            }
            return prev;
        });
    };

    const handleRemoveToken = (id) => {
        setTokens((prev) => {
            const newTokens = prev.map(t => 
                t.id === id ? { type: 'placeholder', value: null, id: t.id } : t
            );
            const placeholderIndices = [];
            newTokens.forEach((t, idx) => {
                if (t.type === 'placeholder') placeholderIndices.push(idx);
            });
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
            setSavedConstraints(prev => [...prev, result.constraint]);
            setTokens([{ type: 'placeholder', value: null, id: nextId }]);
            setNextId(nextId + 1);
            showToast('Constraint added successfully!', 'success');
        } else {
            showToast(`Invalid constraint: ${result.error}`, 'error');
        }
    };

    const handleDeleteConstraint = (index) => {
        setSavedConstraints(prev => prev.filter((_, i) => i !== index));
        showToast('Constraint deleted', 'info');
    };

    const handleEditConstraint = (index) => {
        const constraintToEdit = savedConstraints[index];
        let currentId = nextId;
        const loadedTokens = constraintToEdit.map((token) => {
            const newToken = { ...token, id: currentId };
            currentId++;
            return newToken;
        });
        loadedTokens.push({ type: 'placeholder', value: null, id: currentId });
        currentId++;
        setTokens(loadedTokens);
        setNextId(currentId);
        setSavedConstraints(prev => prev.filter((_, i) => i !== index));
        showToast('Constraint loaded for editing', 'info');
    };

    return {
        // State
        savedConstraints,
        tokens,
        // Handlers
        handleOperatorClick,
        handleParameterSelect,
        handleValueSubmit,
        handleRemoveToken,
        handleDone,
        handleDeleteConstraint,
        handleEditConstraint,
    };
}
