import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ReviewStep from '@/components/Steps/ReviewStep.jsx';

describe('Review Step', () => {
    const mockConstraints = [
        [
            { type: 'parameter', value: 'glucose_g_L' },
            { type: 'operator', value: '<=' },
            { type: 'value', value: '50' }
        ]
    ];

    const mockObjectives = [
        { type: 'maximize', parameter: 'titer_g_L' }
    ];

    it('renders constraints summary', () => {
        render(
            <ReviewStep
                savedConstraints={mockConstraints}
                savedObjectives={mockObjectives}
                goToStep={vi.fn()}
            />
        );
        
        expect(screen.getByText('Constraints (1)')).toBeInTheDocument();
        expect(screen.getByText('glucose_g_L')).toBeInTheDocument();
        expect(screen.getByText('<=')).toBeInTheDocument();
        expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('renders objectives summary', () => {
        render(
            <ReviewStep
                savedConstraints={mockConstraints}
                savedObjectives={mockObjectives}
                goToStep={vi.fn()}
            />
        );
        
        expect(screen.getByText('Objectives (1)')).toBeInTheDocument();
        expect(screen.getByText('maximize')).toBeInTheDocument();
        expect(screen.getByText('titer_g_L')).toBeInTheDocument();
    });

    it('shows "Edit Constraints" button that navigates to step 1', () => {
        const mockGoToStep = vi.fn();
        render(
            <ReviewStep
                savedConstraints={mockConstraints}
                savedObjectives={mockObjectives}
                goToStep={mockGoToStep}
            />
        );
        
        const editButton = screen.getByText('Edit Constraints');
        fireEvent.click(editButton);
        
        expect(mockGoToStep).toHaveBeenCalledWith(0);
    });

    it('shows "Edit Objectives" button that navigates to step 2', () => {
        const mockGoToStep = vi.fn();
        render(
            <ReviewStep
                savedConstraints={mockConstraints}
                savedObjectives={mockObjectives}
                goToStep={mockGoToStep}
            />
        );
        
        const editButton = screen.getByText('Edit Objectives');
        fireEvent.click(editButton);
        
        expect(mockGoToStep).toHaveBeenCalledWith(1);
    });

    it('shows Run Simulation button', () => {
        render(
            <ReviewStep
                savedConstraints={mockConstraints}
                savedObjectives={mockObjectives}
                goToStep={vi.fn()}
            />
        );
        
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
        expect(screen.getByText('Run Simulation')).toBeInTheDocument();
    });

    it('disables Run Simulation when no constraints exist', () => {
        render(
            <ReviewStep
                savedConstraints={[]}
                savedObjectives={mockObjectives}
                goToStep={vi.fn()}
            />
        );
        
        const submitButton = screen.getByTestId('submit-button');
        expect(submitButton).toBeDisabled();
    });

    it('shows loading state when simulation is running', async () => {
        render(
            <ReviewStep
                savedConstraints={mockConstraints}
                savedObjectives={mockObjectives}
                goToStep={vi.fn()}
            />
        );
        
        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(submitButton);
        
        expect(screen.getByText('Running Simulation...')).toBeInTheDocument();
        expect(submitButton).toBeDisabled();
    });

    it('shows success message after simulation completes', async () => {
        render(
            <ReviewStep
                savedConstraints={mockConstraints}
                savedObjectives={mockObjectives}
                goToStep={vi.fn()}
            />
        );
        
        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText('Simulation completed successfully!')).toBeInTheDocument();
        }, { timeout: 3000 });
    });

    it('shows empty state when no constraints defined', () => {
        render(
            <ReviewStep
                savedConstraints={[]}
                savedObjectives={mockObjectives}
                goToStep={vi.fn()}
            />
        );
        
        expect(screen.getByText('No constraints defined')).toBeInTheDocument();
    });

    it('shows empty state when no objectives defined', () => {
        render(
            <ReviewStep
                savedConstraints={mockConstraints}
                savedObjectives={[]}
                goToStep={vi.fn()}
            />
        );
        
        expect(screen.getByText('No objectives defined')).toBeInTheDocument();
    });
});
