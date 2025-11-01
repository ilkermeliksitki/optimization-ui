import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ValueInput from '@/components/ConstraintBuilder/ValueInput.jsx';

describe('ValueInput Component', () => {
    it('renders input field', () => {
        render(<ValueInput onValueChange={() => {}} />);
        const input = screen.getByTestId('value-input');
        expect(input).toBeInTheDocument();
    });

    it('calls onValueSubmit when user presses enter', () => {
        const mockSubmit = vi.fn();
        render(<ValueInput onValueSubmit={mockSubmit} />);

        const input = screen.getByTestId('value-input');
        fireEvent.change(input, { target: { value: '50' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        expect(mockSubmit).toHaveBeenCalledWith('50');
    });

    it('clears input after submission', () => {
        const mockSubmit = vi.fn();
        render(<ValueInput onValueSubmit={mockSubmit} />);

        const input = screen.getByTestId('value-input');
        fireEvent.change(input, { target: { value: '100' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        expect(input.value).toBe('');
    });

    it('does not submit empty values', () => {
        const mockSubmit = vi.fn();
        render(<ValueInput onValueSubmit={mockSubmit} />);

        const input = screen.getByTestId('value-input');
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    });

    it('accept decimal numbers with dot', () => {
        const mockSubmit = vi.fn();
        render(<ValueInput onValueSubmit={mockSubmit} />);

        const input = screen.getByTestId('value-input');
        fireEvent.change(input, { target: { value: '3.14' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        expect(mockSubmit).toHaveBeenCalledWith('3.14');
    });

    it('calls onValueSubmit when Add buttion is clicked', () => {
        const mockSubmit = vi.fn();
        render(<ValueInput onValueSubmit={mockSubmit} />);

        const input = screen.getByTestId('value-input');
        const addButton = screen.getByTestId('add-value-button');
        
        fireEvent.change(input, { target: { value: '33' } });
        fireEvent.click(addButton);

        expect(mockSubmit).toHaveBeenCalledWith('33');
        expect(input.value).toBe(''); // clear after submission
    });

    it('does not submit when Add button clicked with empty value', () => {
        const mockSubmit = vi.fn();
        render(<ValueInput onValueSubmit={mockSubmit} />);

        const addButton = screen.getByTestId('add-value-button');
        fireEvent.click(addButton);

        expect(mockSubmit).not.toHaveBeenCalled();
    });
});
