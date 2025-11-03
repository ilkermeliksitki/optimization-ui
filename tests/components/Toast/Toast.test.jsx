import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Toast from '@/components/Toast/Toast.jsx';

describe('Toast Component', () => {
    it('renders toast with message', () => {
        render(
            <Toast
                message="Test Message"
                type="success"
                onClose={() => {}}
            />
        );
        expect(screen.getByText('Test Message')).toBeInTheDocument();
    });

    it('rennders success toast with green styling', () => {
        render(
            <Toast
                message="Success!"
                type="success"
                onClose={() => {}}
            />
        );

        const toast = screen.getByTestId('toast');
        expect(toast).toHaveClass('bg-green-50');
        expect(toast).toHaveClass('border-green-500');
    });

    it('renders error toast with red styling', () => {
        render(
            <Toast
                message="Error!"
                type="error"
                onClose={() => {}}
            />
        );

        const toast = screen.getByTestId('toast');
        expect(toast).toHaveClass('bg-red-50');
        expect(toast).toHaveClass('border-red-500');
    });

    it('renders warning toast with yellow styling', () => {
        render(
            <Toast
                message="Warning!"
                type="warning"
                onClose={() => {}}
            />
        );

        const toast = screen.getByTestId('toast');
        expect(toast).toHaveClass('bg-yellow-50');
        expect(toast).toHaveClass('border-yellow-500');
    });

    it('renders info toast with blue styling', () => {
        render(
            <Toast
                message="Info!"
                type="info"
                onClose={() => {}}
            />
        );

        const toast = screen.getByTestId('toast');
        expect(toast).toHaveClass('bg-blue-50');
        expect(toast).toHaveClass('border-blue-500');
    });

    it('calls onClose when close button is clicked', () => {
        const mockClose = vi.fn();
        render(
            <Toast
                message="Test"
                type="success"
                onClose={mockClose}
            />
        );

        const closeButton = screen.getByTestId('toast-close');
        fireEvent.click(closeButton);

        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('auto-closes after duration', async () => {
        const mockClose = vi.fn();
        render(
            <Toast
                message="Auto Close Test"
                type="success"
                onClose={mockClose}
                duration={100}
            />
        );
        expect(mockClose).not.toHaveBeenCalled();

        await waitFor(() => {
            expect(mockClose).toHaveBeenCalledTimes(1);
        }, { timeout: 300 });
    });

    it('auto-closes after custom duration', async () => {
        const mockClose = vi.fn();
        render(
            <Toast
                message="Custom duration"
                type="success"
                onClose={mockClose}
                duration={200}
            />
        );

        // wait 100ms
        await new Promise(resolve => setTimeout(resolve, 100));
        expect(mockClose).not.toHaveBeenCalled();

        // wait for full duration
        await waitFor(() => {
            expect(mockClose).toHaveBeenCalledTimes(1);
        }, { timeout: 300 });

    });

});
