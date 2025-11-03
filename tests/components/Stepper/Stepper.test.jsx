import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Stepper from '@/components/Stepper/Stepper.jsx';

describe('Stepper Component', () => {
    const steps = [
        { title: 'Constraints', description: 'Define constraints' },
        { title: 'Objectives', description: 'Set optimization goals' },
        { title: 'Review', description: 'Review and submit for simulation' },
        { title: 'Results', description: 'View simulation results' },
    ];

    it('renders all steps', () => {
        render(<Stepper steps={steps} currentStep={0} />);
        expect(screen.getByText('Constraints')).toBeInTheDocument();
        expect(screen.getByText('Objectives')).toBeInTheDocument();
        expect(screen.getByText('Review')).toBeInTheDocument();
        expect(screen.getByText('Results')).toBeInTheDocument();
    });

    it('marks current step as active', () => {
        render(<Stepper steps={steps} currentStep={1} />);
        const objectivesStep = screen.getByTestId('step-1');
        expect(objectivesStep).toHaveAttribute('data-active', 'true');
    });

    it('marks previous steps as completed', () => {
        render(<Stepper steps={steps} currentStep={2} />);
        const constraintsStep = screen.getByTestId('step-0');
        expect(constraintsStep).toHaveAttribute('data-completed', 'true');
    });

    it('shows step number', () => {
        render(<Stepper steps={steps} currentStep={0} />);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('shows checkmark for completed steps', () => {
        render(<Stepper steps={steps} currentStep={3} />); // On step 4

        const step0 = screen.getByTestId('step-0');
        const step1 = screen.getByTestId('step-1');
        const step2 = screen.getByTestId('step-2');

        // previous steps should show checkmarks: checkmark is a SVG
        expect(step0.querySelector('svg')).toBeInTheDocument();
        expect(step1.querySelector('svg')).toBeInTheDocument();
        expect(step2.querySelector('svg')).toBeInTheDocument();
    });

    it('handles 4-step process correctly', () => {
        const { rerender } = render(<Stepper steps={steps} currentStep={0} />);

        // Step 1
        expect(screen.getByTestId('step-0')).toHaveAttribute('data-active', 'true');
        expect(screen.getByTestId('step-0')).toHaveAttribute('data-completed', 'false');

        // Step 2
        rerender(<Stepper steps={steps} currentStep={1} />);
        expect(screen.getByTestId('step-0')).toHaveAttribute('data-completed', 'true');
        expect(screen.getByTestId('step-1')).toHaveAttribute('data-active', 'true');

        // step 3
        rerender(<Stepper steps={steps} currentStep={2} />);
        expect(screen.getByTestId('step-1')).toHaveAttribute('data-completed', 'true');
        expect(screen.getByTestId('step-2')).toHaveAttribute('data-active', 'true');

        // step 4
        rerender(<Stepper steps={steps} currentStep={3} />);
        expect(screen.getByTestId('step-2')).toHaveAttribute('data-completed', 'true');
        expect(screen.getByTestId('step-3')).toHaveAttribute('data-active', 'true');
    });
});
