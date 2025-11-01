import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ConstraintBoard from '@/components/ConstraintBuilder/ConstraintBoard.jsx';

describe('Constraint Board', () => {
    it('initializes with one empty placeholder', () => {
        const tokens = [{ type: 'placeholder', value: null, id: 1 }];
        render(<ConstraintBoard tokens={tokens} />);
        const placeholders = screen.getAllByTestId('placeholder');
        expect(placeholders).toHaveLength(1);
    });

    it('adds item to the next available placeholder', () => {

    });

    it('display tokens passed as props', () => {
        const tokens = [
            { type: 'parameter', value: 'glucose_g_L', id: 1 },
            { type: 'operator', value: '+', id: 2 },
            { type: 'placeholder', value: null, id: 3 } // placeholder
        ];
        render(<ConstraintBoard tokens={tokens} />);
        expect(screen.getByText('glucose_g_L')).toBeInTheDocument();
        expect(screen.getByText('+')).toBeInTheDocument();
        expect(screen.getAllByTestId('placeholder')).toHaveLength(1);
    });

    it('calls onRemoveToken when a token is clicked', () => {
        const mockOnRemoveToken = vi.fn();
        const tokens = [
            { type: 'parameter', value: 'fructose_g_L', id: 1 },
            { type: 'placeholder', value: null, id: 2 }
        ];
        render(
            <ConstraintBoard tokens={tokens} onRemoveToken={mockOnRemoveToken} />
        );

        const token = screen.getByText('fructose_g_L');
        fireEvent.click(token);
        expect(mockOnRemoveToken).toHaveBeenCalledWith(1);
    });


    it('validates complete constraints on Done button click', () => {
        const mockOnDone = vi.fn();
        const tokens = [
            { type: 'parameter', value: 'glucose_g_L', id: 1 },
            { type: 'operator', value: '+', id: 2 },
            { type: 'parameter', value: 'fructose_g_L', id: 3 },
            { type: 'operator', value: '<=', id: 4 },
            { type: 'parameter', value: '20', id: 5 },
            { type: 'placeholder', value: null, id: 6 }
        ];
        render(<ConstraintBoard tokens={tokens} onDone={mockOnDone} />);

        const doneButton = screen.getByTestId('done-button');
        fireEvent.click(doneButton);

        // omit 'id'!!
        expect(mockOnDone).toHaveBeenCalledWith({
            isValid: true,
            constraint: [
                { type: 'parameter', value: 'glucose_g_L'},
                { type: 'operator', value: '+'},
                { type: 'parameter', value: 'fructose_g_L'},
                { type: 'operator', value: '<='},
                { type: 'parameter', value: '20'}
            ]
        });
    });

    it('shows error for incomplete constraints', () => {
        const mockOnDone = vi.fn();
        const tokens = [
            { type: 'parameter', value: 'glucose_g_L', id: 1 },
            { type: 'placeholder', value: null, id: 2 }
        ];
        render(<ConstraintBoard tokens={tokens} onDone={mockOnDone} />);
        const doneButton = screen.getByTestId('done-button');
        fireEvent.click(doneButton);
        expect(mockOnDone).toHaveBeenCalledWith({
            isValid: false,
            error: 'Constraint must have at least 3 tokens!'
        });
    });
});
