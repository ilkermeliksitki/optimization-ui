import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OperatorBar from '@/components/ConstraintBuilder/OperatorBar.jsx';

describe('Operator Bar', () => {
    // TODO: think about adding more operators later
    const operators = ['+', '=', '<', '<=', '>', '>=']

    it('renders all operators', () => {
        render(<OperatorBar onOperatorClick={() => {}} />);
        operators.forEach((operator) => {
            expect(screen.getByText(operator)).toBeInTheDocument();
        });
    });

    it.each(operators)('calls onOperatorClick when %s is clicked', (operator) => {
        const mockOnClick = vi.fn();
        render(<OperatorBar onOperatorClick={mockOnClick} />);

        const button = screen.getByTestId(`operator-button-${operator}`);
        fireEvent.click(button);

        expect(mockOnClick).toHaveBeenCalledWith(operator);
    });

    it('operators remain available after click', () => {
        const mockOnClick = vi.fn();
        render(<OperatorBar onOperatorClick={mockOnClick} />);

        // click multiple times
        const plusButton = screen.getByTestId('operator-button-+');
        fireEvent.click(plusButton);
        fireEvent.click(plusButton);
        fireEvent.click(plusButton);

        expect(plusButton).toBeInTheDocument();
        expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    it('calls callback for each operator', () => {
        const mockOnClick = vi.fn();
        render(<OperatorBar onOperatorClick={mockOnClick} />);

        operators.forEach((operator) => {
            const button = screen.getByTestId(`operator-button-${operator}`);
            fireEvent.click(button);
            expect(mockOnClick).toHaveBeenCalledWith(operator);
        });
        expect(mockOnClick).toHaveBeenCalledTimes(operators.length);
    });
});
