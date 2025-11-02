import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Stepper from '@/components/Stepper/Stepper.jsx';

describe('Stepper Component', () => {
    const steps = [
        { title: 'Constraints', description: 'Define constraints' },
        { title: 'Objectives', description: 'Set optimization goals' },
        { title: 'Review', description: 'Review and submit for simulation' },
    ];

    it('renders all steps', () => {
        render(<Stepper steps={steps} currentStep={0} />);
        expect(screen.getByText('Constraints')).toBeInTheDocument();
        expect(screen.getByText('Objectives')).toBeInTheDocument();
        expect(screen.getByText('Review')).toBeInTheDocument();
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
    });

});
