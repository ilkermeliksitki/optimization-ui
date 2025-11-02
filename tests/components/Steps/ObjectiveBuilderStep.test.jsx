import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ObjectiveBuilderStep from '@/components/Steps/ObjectiveBuilderStep.jsx';

describe('ObjectiveBuilderStep Component', () => {
    const mockObjectives = [
        { type: 'maximize', parameter: 'titer_g_L' },
        { type: 'minimize', parameter: 'cost_usd' },
    ];

    const mockOutputs = ['titer_g_L', 'cost_usd', 'yield_percent'];

    it('renders step heading', () => {
        render(
            <ObjectiveBuilderStep
                savedObjectives={[]}
                availableOutputs={mockOutputs}
                onAddObjective={vi.fn()}
                onDeleteObjective={vi.fn()}
            />
        );

        expect(screen.getByText('Step 2: Define Optimization Objectives')).toBeInTheDocument();
    });

    it('renders ObjectiveSelector component', () => {
        render(
            <ObjectiveBuilderStep
                savedObjectives={[]}
                availableOutputs={mockOutputs}
                onAddObjective={vi.fn()}
                onDeleteObjective={vi.fn()}
            />
        );

        expect(screen.getByTestId('objective-selector')).toBeInTheDocument();
    });

    it('does not show saved objectives section when empty', () => {
        render(
            <ObjectiveBuilderStep
                savedObjectives={[]}
                availableOutputs={mockOutputs}
                onAddObjective={vi.fn()}
                onDeleteObjective={vi.fn()}
            />
        );
        const heading = screen.queryByRole('heading', { name: /Saved Objectives/i });
        expect(heading).not.toBeInTheDocument();
    });

    it('renders saved objectives', () => {
        render(
            <ObjectiveBuilderStep
                savedObjectives={mockObjectives}
                availableOutputs={mockOutputs}
                onAddObjective={vi.fn()}
                onDeleteObjective={vi.fn()}
            />
        );
        const heading = screen.getByRole('heading', { name: /Saved Objectives/i })
        expect(heading).toBeInTheDocument();

        const savedSection = heading.closest('.saved-objectives');
        expect(within(savedSection).getByText('maximize')).toBeInTheDocument();
        expect(within(savedSection).getByText('minimize')).toBeInTheDocument();
        expect(within(savedSection).getByText('titer_g_L')).toBeInTheDocument();
        expect(within(savedSection).getByText('cost_usd')).toBeInTheDocument();
    });

    it('render deletes button for each objectives', () => {
        render(
            <ObjectiveBuilderStep
                savedObjectives={mockObjectives}
                availableOutputs={mockOutputs}
                onAddObjective={vi.fn()}
                onDeleteObjective={vi.fn()}
            />
        );

        expect(screen.getByTestId('delete-objective-0')).toBeInTheDocument();
        expect(screen.getByTestId('delete-objective-1')).toBeInTheDocument();
    });

    it('calls onDeleteObjective when delete button is clicked', () => {
        const mockDelete = vi.fn();
        render(
            <ObjectiveBuilderStep
                savedObjectives={mockObjectives}
                availableOutputs={mockOutputs}
                onAddObjective={vi.fn()}
                onDeleteObjective={mockDelete}
            />
        );

        const deleteButton = screen.getByTestId('delete-objective-0');
        fireEvent.click(deleteButton);

        expect(mockDelete).toHaveBeenCalledWith(0);
    });

    it('displays multiple objectives in order', () => {
        render(
            <ObjectiveBuilderStep
                savedObjectives={mockObjectives}
                availableOutputs={mockOutputs}
                onAddObjective={vi.fn()}
                onDeleteObjective={vi.fn()}
            />
        );

        const heading = screen.getByRole('heading', { name: /Saved Objectives/i })
        const savedSection = heading.closest('.saved-objectives');

        const objectives = within(savedSection).getAllByText(/maximize|minimize/);
        expect(objectives).toHaveLength(2);
    });

});
