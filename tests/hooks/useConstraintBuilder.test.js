import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useConstraintBuilder } from '@/hooks/useConstraintBuilder.js';

describe('useConstraintBuilder hook', () => {
    it('initializes with empty constraints', () => {
        const { result } = renderHook(() => useConstraintBuilder());

        expect(result.current.savedConstraints).toEqual([]);
        expect(result.current.tokens).toHaveLength(1);
    });

    it('adds constraint', () => {
        const { result } = renderHook(() => useConstraintBuilder());

        act(() => {
            result.current.handleDone({
                isValid: true,
                constraint: [{ type: 'parameter', value: 'glucose' }]
            });
        });

        expect(result.current.savedConstraints).toHaveLength(1);
    });

    it('deletes constraint', () => {
        const { result } = renderHook(() => useConstraintBuilder());

        act(() => {
            result.current.handleDone({
                isValid: true,
                constraint: [{ type: 'parameter', value: 'glucose' }]
            });
        });

        act(() => {
            result.current.handleDeleteConstraint(0);
        });

        expect(result.current.savedConstraints).toHaveLength(0);
    });
});
