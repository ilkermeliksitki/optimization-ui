import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ConstraintBoard from '@/components/ConstraintBuilder/ConstraintBoard.jsx';

describe('Constraint Board', () => {
    it('initializes with one empty placeholder', () => {
        render(<ConstraintBoard />);
        const placeholders = screen.getAllByTestId('placeholder');
        expect(placeholders).toHaveLength(1);
    });

    it('adds item to the next available placeholder', () => {
        render(<ConstraintBoard />);
        const board = screen.getByTestId('constraint-board');

        // simulate adding an item
        fireEvent.click(board, {
            detail: {
                type: 'parameter', value: 'glucose_g_L'
            }
        });
        expect(screen.getByText('glucose_g_L')).toBeInTheDocument();
        expect(screen.getAllByTestId('placeholder')).toHaveLength(1);
    });

    it('removes item when clicked and frees up placeholder', () => {
        render(<ConstraintBoard />);
        const board = screen.getByTestId('constraint-board');

        // simulate adding an item
        fireEvent.click(board, {
            detail: {
                type: 'parameter', value: 'fructose_g_L'
            }
        });
        const item = screen.getByText('fructose_g_L');
        fireEvent.click(item);

        // item should be removed now
        expect(screen.queryByText('fructose_g_L')).not.toBeInTheDocument();
    });

    it('validates complete constraints on Done button click', () => {
        const mockOnDone = vi.fn();
        render(<ConstraintBoard onDone={mockOnDone} />);
        const board = screen.getByTestId('constraint-board');

        // add parameters and operator
        fireEvent.click(board, { detail: { type: 'parameter', value: 'glucose_g_L' } });
        fireEvent.click(board, { detail: { type: 'operator', value: '+' } });
        fireEvent.click(board, { detail: { type: 'parameter', value: 'fructose_g_L' } });
        fireEvent.click(board, { detail: { type: 'operator', value: '<=' } });
        fireEvent.click(board, { detail: { type: 'parameter', value: '20' } });

        // click Done button
        const doneButton = screen.getByTestId('done-button');
        fireEvent.click(doneButton);

        expect(mockOnDone).toHaveBeenCalledWith({ // to ensure the function is called with correct constraint data
            isValid: true,
            constraint: [
                { type: 'parameter', value: 'glucose_g_L' },
                { type: 'operator', value: '+' },
                { type: 'parameter', value: 'fructose_g_L' },
                { type: 'operator', value: '<=' },
                { type: 'parameter', value: '20' }
            ]
        });
    });

    it('shows error for incomplete constraints', () => {
        const mockOnDone = vi.fn();
        render(<ConstraintBoard onDone={mockOnDone} />);
        const board = screen.getByTestId('constraint-board');
        const doneButton = screen.getByTestId('done-button');
        
        // add only one operand
        fireEvent.click(board, { detail: { type: 'parameter', value: 'glucose_g_L' } });
        fireEvent.click(doneButton);

        expect(mockOnDone).toHaveBeenCalledWith({
            isValid: false,
            error: 'Incomplete constraint'
        });

        // add some more ... 


    });
});
