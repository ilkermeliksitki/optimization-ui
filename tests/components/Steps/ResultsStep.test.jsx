import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResultsStep from '@/components/Steps/ResultsStep.jsx';

describe('ResultsStep Component', () => {
        const mockResults = {
        objectiveValues: [
            { name: 'titer_g_L', value: 42.5, target: 'maximize', achieved: true },
            { name: 'cost_usd', value: 125.30, target: 'minimize', achieved: true }
        ],
        constraintsSatisfied: [
            { constraint: 'glucose_g_L <= 50', value: 48.2, satisfied: true },
            { constraint: 'PH >= 6.5', value: 6.8, satisfied: true }
        ],
        convergenceData: [
            { iteration: 0, value: 20.5 },
            { iteration: 1, value: 28.3 },
            { iteration: 2, value: 35.1 },
            { iteration: 3, value: 39.8 },
            { iteration: 4, value: 42.5 }
        ],
        metadata: {
            iterations: 5,
            computationTime: '2.3s',
            status: 'Optimal solution found'
        }
    };

    it('renders results step heading', () => {
        render(
            <ResultsStep
                results={mockResults}
                goToStep={vi.fn()}
            />
        );
        expect(screen.getByRole('heading', { name: /Optimization Results/i })).toBeInTheDocument();
    });

    it('display optimization status', () => {
        render(
            <ResultsStep
                results={mockResults}
                goToStep={vi.fn()}
            />
        );
        expect(screen.getByText(/Optimal solution found/i)).toBeInTheDocument();
    });

    it('display computation metadata', () => {
        render(
            <ResultsStep
                results={mockResults}
                goToStep={vi.fn()}
            />
        );
        expect(screen.getByText(/5 iterations/i)).toBeInTheDocument();
        expect(screen.getByText(/2.3s/i)).toBeInTheDocument();
    });

    it('renders objective values section', () => {
        render(
            <ResultsStep
                results={mockResults}
                goToStep={vi.fn()}
            />
        );
        expect(screen.getByRole('heading', { name: /Objective Values/i })).toBeInTheDocument();
    });

    it('display all objective values with targets', () => {
        render(
            <ResultsStep
                results={mockResults}
                goToStep={vi.fn()}
            />
        );
        expect(screen.getByText('titer_g_L')).toBeInTheDocument();
        expect(screen.getByText('42.5')).toBeInTheDocument();
        expect(screen.getByText('maximize')).toBeInTheDocument();
        expect(screen.getByText('cost_usd')).toBeInTheDocument();
        expect(screen.getByText('125.30')).toBeInTheDocument();
        expect(screen.getByText('minimize')).toBeInTheDocument();
    });

    it('shows achivement indicators for objecives', () => {
        render(
            <ResultsStep
                results={mockResults}
                goToStep={vi.fn()}
            />
        );
        const checkmarks = screen.getAllByTestId('objective-achieved');
        expect(checkmarks.length).toHaveLength(2); // because both objectives are achieved
    });

    it('renders constrains satisfaction section', () => {
        render(
            <ResultsStep
                results={mockResults}
                goToStep={vi.fn()}
            />
        );
        expect(screen.getByRole('heading', { name: /Constraints Satisfaction/i })).toBeInTheDocument();
    });

    it('display all constrain satisfaction data', () => {
        render(
            <ResultsStep
                results={mockResults}
                goToStep={vi.fn()}
            />
        );
        expect(screen.getByText('glucose_g_L <= 50')).toBeInTheDocument();
        expect(screen.getByText('48.2')).toBeInTheDocument();
        expect(screen.getByText('PH >= 6.5')).toBeInTheDocument();
        expect(screen.getByText('6.8')).toBeInTheDocument();
    });

    it('shows satisfaction indicators for constraints', () => {
        render(
            <ResultsStep
                results={mockResults}
                goToStep={vi.fn()}
            />
        );
        const checkmarks = screen.getAllByTestId('constraint-satisfied');
        expect(checkmarks.length).toHaveLength(2);
    });

    it('renders convergence plot section', () => {
        render(
            <ResultsStep
                results={mockResults}
                goToStep={vi.fn()}
            />
        );
        expect(screen.getByRole('heading', { name: /Convergence Plot/i })).toBeInTheDocument();
        expect(screen.getByTestId('convergence-chart')).toBeInTheDocument();
    });

    it('renders Edit Constraints button', () => {
        render(
            <ResultsStep
                results={mockResults}
                goToStep={vi.fn()}
            />
        );
        expect(screen.getByTestId('edit-constraints-button')).toBeInTheDocument();
        expect(screen.getByText(/Edit Constraints/i)).toBeInTheDocument();
    });

    it('renders Edit objective butoon', () => {
        render(
            <ResultsStep
                results={mockResults}
                goToStep={vi.fn()}
            />
        );
        expect(screen.getByTestId('edit-objectives-button')).toBeInTheDocument();
        expect(screen.getByText(/Edit Objectives/i)).toBeInTheDocument();
    });

    it('renders Run Again button', () => {
        render(
            <ResultsStep
                results={mockResults}
                goToStep={vi.fn()}
            />
        );
        expect(screen.getByTestId('run-again-button')).toBeInTheDocument();
        expect(screen.getByText(/Run Again/i)).toBeInTheDocument();
    });

    it('calls goToStep(0) when Edit Constraints clicked', () => {
        const mockGoToStep = vi.fn();
        render(
            <ResultsStep
                results={mockResults}
                goToStep={mockGoToStep}
            />
        );
        const editButton = screen.getByTestId('edit-constraints-button');
        fireEvent.click(editButton);

        expect(mockGoToStep).toHaveBeenCalledWith(0);
    });

    it('calls goToStep(1) when Edit Objectives clicked', () => {
        const mockGoToStep = vi.fn();
        render(
            <ResultsStep
                results={mockResults}
                goToStep={mockGoToStep}
            />
        );
        const editButton = screen.getByTestId('edit-objectives-button');
        fireEvent.click(editButton);

        expect(mockGoToStep).toHaveBeenCalledWith(1);
    });

    it('calls goToStep(2) when Run Again clicked', () => {
        const mockGoToStep = vi.fn();
        render(
            <ResultsStep
                results={mockResults}
                goToStep={mockGoToStep}
            />
        );
        const runAgainButton = screen.getByTestId('run-again-button');
        fireEvent.click(runAgainButton);

        expect(mockGoToStep).toHaveBeenCalledWith(2);
    });

    it('handle missing results', () => {
        render(
            <ResultsStep
                results={null}
                goToStep={vi.fn()}
            />
        );
        expect(screen.getByText(/No results available/i)).toBeInTheDocument();
    });

    it('handles empty objective values', () => {
        const emptyResults = {
            ...mockResults,
            objectiveValues: []
        };
        render(
            <ResultsStep
                results={emptyResults}
                goToStep={vi.fn()}
            />
        );
        expect(screen.getByText(/No objectives defined/i)).toBeInTheDocument();
    });

    it('handle empty constraints', () => {
        const emptyResults = {
            ...mockResults,
            constraintsSatisfied: []
        };
        render(
            <ResultsStep
                results={emptyResults}
                goToStep={vi.fn()}
            />
        );
        expect(screen.getByText(/No constraints defined/i)).toBeInTheDocument();
    });
});
