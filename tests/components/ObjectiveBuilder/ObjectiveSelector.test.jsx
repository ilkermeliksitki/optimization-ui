import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ObjectiveSelector from '@/components/ObjectiveBuilder/ObjectiveSelector.jsx';

describe('Objective Selector', () => {
    const mockOutputs = ['growth_rate_h-1', 'titer_g_L', 'yield_percent'];

    it('renders objective type selector', () => {
        render(<ObjectiveSelector outputs={mockOutputs} onAddObjective={() => {}} />);
        
        expect(screen.getByLabelText('Objective Type:')).toBeInTheDocument();
        expect(screen.getByTestId('objective-type-select')).toBeInTheDocument();
    });

    it('renders output parameter dropdown', () => {
        render(<ObjectiveSelector outputs={mockOutputs} onAddObjective={() => {}} />);
        
        const dropdown = screen.getByTestId('objective-parameter-select');
        expect(dropdown).toBeInTheDocument();
        
        // Check all outputs are in dropdown
        mockOutputs.forEach(output => {
            expect(screen.getByText(output)).toBeInTheDocument();
        });
    });

    it('has Add Objective button', () => {
        render(<ObjectiveSelector outputs={mockOutputs} onAddObjective={() => {}} />);
        
        const button = screen.getByTestId('add-objective-button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Add Objective');
    });

    it('calls onAddObjective when button clicked with valid selection', () => {
        const mockAdd = vi.fn();
        render(<ObjectiveSelector outputs={mockOutputs} onAddObjective={mockAdd} />);
        
        const typeSelect = screen.getByTestId('objective-type-select');
        const paramSelect = screen.getByTestId('objective-parameter-select');
        const addButton = screen.getByTestId('add-objective-button');
        
        fireEvent.change(typeSelect, { target: { value: 'maximize' } });
        fireEvent.change(paramSelect, { target: { value: 'titer_g_L' } });
        fireEvent.click(addButton);
        
        expect(mockAdd).toHaveBeenCalledWith({
            type: 'maximize',
            parameter: 'titer_g_L'
        });
    });

    it('does not call onAddObjective if parameter not selected', () => {
        const mockAdd = vi.fn();
        render(<ObjectiveSelector outputs={mockOutputs} onAddObjective={mockAdd} />);
        
        const typeSelect = screen.getByTestId('objective-type-select');
        const addButton = screen.getByTestId('add-objective-button');
        
        fireEvent.change(typeSelect, { target: { value: 'maximize' } });
        fireEvent.click(addButton);
        
        expect(mockAdd).not.toHaveBeenCalled();
    });

    it('resets form after adding objective', () => {
        const mockAdd = vi.fn();
        render(<ObjectiveSelector outputs={mockOutputs} onAddObjective={mockAdd} />);
        
        const typeSelect = screen.getByTestId('objective-type-select');
        const paramSelect = screen.getByTestId('objective-parameter-select');
        const addButton = screen.getByTestId('add-objective-button');
        
        fireEvent.change(typeSelect, { target: { value: 'maximize' } });
        fireEvent.change(paramSelect, { target: { value: 'titer_g_L' } });
        fireEvent.click(addButton);
        
        expect(typeSelect.value).toBe('maximize'); // Type stays same for convenience
        expect(paramSelect.value).toBe(''); // Parameter resets
    });

    it('supports multiple objective types', () => {
        render(<ObjectiveSelector outputs={mockOutputs} onAddObjective={() => {}} />);
        
        const typeSelect = screen.getByTestId('objective-type-select');
        
        expect(screen.getByText('Maximize')).toBeInTheDocument();
        expect(screen.getByText('Minimize')).toBeInTheDocument();
        expect(screen.getByText('Target')).toBeInTheDocument();
    });
});
