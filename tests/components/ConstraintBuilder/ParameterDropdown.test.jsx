import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ParameterDropdown from '@/components/ConstraintBuilder/ParameterDropdown.jsx';

describe('Parameter Dropdown', () => {
    const parameters = ['glucose_g_L', 'fructose_g_L', 'PH', 'temperature'];

    it('displays all parameters in dropdown', () => {
        render(<ParameterDropdown onParameterSelect={ ()=> {}} />);
        const dropdown = screen.getByTestId('parameter-dropdown');
        fireEvent.click(dropdown);

        parameters.forEach(param => {
            expect(screen.getByText(param)).toBeInTheDocument();
        });
    });

    it('calls onParameterSelect when parameter is chosen', () => {
        const mockSelect = vi.fn();
        render(<ParameterDropdown onParameterSelect={mockSelect} />);
        const dropdown = screen.getByTestId('parameter-dropdown');

        // select a parameter
        fireEvent.change(dropdown, { target: { value: 'glucose_g_L' } });

        expect(mockSelect).toHaveBeenCalledWith('glucose_g_L');
    });

    it('reset to default state after selection', () => {
        const mockSelect = vi.fn();
        render(<ParameterDropdown onParameterSelect={mockSelect} />);
        const dropdown = screen.getByTestId('parameter-dropdown');
        fireEvent.change(dropdown, { target: { value: 'fructose_g_L' } });

        // dropdown should reset
        expect(dropdown.value).toBe('');
        
    });
});

