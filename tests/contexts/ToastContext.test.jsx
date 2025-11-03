import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToastProvider, useToast } from '@/contexts/ToastContext.jsx';

function TestComponent() {
    const { showToast } = useToast();
    return (
        <div>
            <button onClick={() => showToast('Success Message', 'success')}>Show Success</button>
            <button onClick={() => showToast('Error Message', 'error')}>Show Error</button>
            <button onClick={() => showToast('Warning Message', 'warning')}>Show Warning</button>
            <button onClick={() => showToast('Info Message', 'info')}>Show Info</button>
        </div>
    );
}

describe('ToastContext', () => {
    it('provides showToast function', () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        expect(screen.getByText('Show Success')).toBeInTheDocument();
    });

    it('shows success toast when showToast is called', () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        fireEvent.click(screen.getByText('Show Success'));
        expect(screen.getByText('Success Message')).toBeInTheDocument();

    });

    it('shows error toast when showToast is called', () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        fireEvent.click(screen.getByText('Show Error'));
        expect(screen.getByText('Error Message')).toBeInTheDocument();
    });

    it('shows warning toast when showToast is called', () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        fireEvent.click(screen.getByText('Show Warning'));
        expect(screen.getByText('Warning Message')).toBeInTheDocument();
    });

    it('shows info toast when showToast is called', () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        fireEvent.click(screen.getByText('Show Info'));
        expect(screen.getByText('Info Message')).toBeInTheDocument();
    });

    it('removes toast when closed', async () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        fireEvent.click(screen.getByText('Show Success'));
        expect(screen.getByText('Success Message')).toBeInTheDocument();

        const closeButton = screen.getByTestId('toast-close');
        fireEvent.click(closeButton);

        await waitFor(() => {
            expect(screen.queryByText('Success Message')).not.toBeInTheDocument();
        });
    });

});
