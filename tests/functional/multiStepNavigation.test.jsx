import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '@/App.jsx';
import { ToastProvider } from '@/contexts/ToastContext.jsx';

describe('Multi-Step Form Navigation', () => {
    it('starts on Constraints step (Step 1)', () => {
        render(
            <ToastProvider>
                <App />
            </ToastProvider>
        );
        
        expect(screen.getByText('Step 1: Define Constraints')).toBeInTheDocument();
        expect(screen.getByTestId('step-0')).toHaveAttribute('data-active', 'true');
    });

    it('shows Back button as invisible on first step', () => {
        render(
            <ToastProvider>
                <App />
            </ToastProvider>
        );
        
        const backButton = screen.getByTestId('back-button');
        expect(backButton).toHaveClass('invisible');
        expect(backButton).toBeDisabled();
    });

    it('navigates to Objectives step when Next clicked', () => {
        render(
            <ToastProvider>
                <App />
            </ToastProvider>
        );
        
        const nextButton = screen.getByTestId('next-button');
        fireEvent.click(nextButton);
        
        expect(screen.getByText('Step 2: Define Optimization Objectives')).toBeInTheDocument();
        expect(screen.getByTestId('step-1')).toHaveAttribute('data-active', 'true');
    });

    it('navigates back to Constraints when Back clicked', () => {
        render(
            <ToastProvider>
                <App />
            </ToastProvider>
        );
        
        // Go to step 2
        fireEvent.click(screen.getByTestId('next-button'));
        expect(screen.getByText('Step 2: Define Optimization Objectives')).toBeInTheDocument();
        
        // Go back to step 1
        const backButton = screen.getByTestId('back-button');
        fireEvent.click(backButton);
        
        expect(screen.getByText('Step 1: Define Constraints')).toBeInTheDocument();
        expect(screen.getByTestId('step-0')).toHaveAttribute('data-active', 'true');
    });

    it('shows Review step as final step', () => {
        render(
            <ToastProvider>
                <App />
            </ToastProvider>
        );
        
        // Navigate to step 2
        fireEvent.click(screen.getByTestId('next-button'));
        
        // Navigate to step 3
        fireEvent.click(screen.getByTestId('next-button'));
        
        expect(screen.getByText('Step 3: Review & Submit')).toBeInTheDocument();
        expect(screen.getByTestId('step-2')).toHaveAttribute('data-active', 'true');
    });

    it('hides Next button on final step', () => {
        render(
            <ToastProvider>
                <App />
            </ToastProvider>
        );
        
        // Navigate to final step
        fireEvent.click(screen.getByTestId('next-button')); // Step 2
        fireEvent.click(screen.getByTestId('next-button')); // Step 3
        
        expect(screen.queryByTestId('next-button')).not.toBeInTheDocument();
    });

    it('marks completed steps with checkmark', () => {
        render(
            <ToastProvider>
                <App />
            </ToastProvider>
        );
        
        // Navigate to step 3
        fireEvent.click(screen.getByTestId('next-button'));
        fireEvent.click(screen.getByTestId('next-button'));
        
        const step0 = screen.getByTestId('step-0');
        const step1 = screen.getByTestId('step-1');
        
        expect(step0).toHaveAttribute('data-completed', 'true');
        expect(step1).toHaveAttribute('data-completed', 'true');
    });

    it('preserves constraint data when navigating between steps', () => {
        render(
            <ToastProvider>
                <App />
            </ToastProvider>
        );
        
        // Add a constraint
        const paramDropdown = screen.getByTestId('parameter-dropdown');
        const opButton = screen.getByText('<=');
        const valueInput = screen.getByTestId('value-input');
        const addButton = screen.getByTestId('add-value-button');
        const doneButton = screen.getByTestId('done-button');
        
        fireEvent.change(paramDropdown, { target: { value: 'glucose_g_L' } });
        fireEvent.click(opButton);
        fireEvent.change(valueInput, { target: { value: '50' } });
        fireEvent.click(addButton);
        fireEvent.click(doneButton);
        
        // Navigate to step 2
        fireEvent.click(screen.getByTestId('next-button'));
        expect(screen.getByText('Step 2: Define Optimization Objectives')).toBeInTheDocument();
        
        // Navigate back to step 1
        fireEvent.click(screen.getByTestId('back-button'));
        
        // Verify constraint still exists - use heading with role
        const savedHeading = screen.getByRole('heading', { name: /Saved Constraints:/i });
        expect(savedHeading).toBeInTheDocument();

        // find the saved section and scope
        const savedSection = savedHeading.closest('div');
        expect(within(savedSection).getByText('glucose_g_L')).toBeInTheDocument();
    });
});
