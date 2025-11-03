import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Toast from '@/components/Toast/Toast.jsx';

describe('Toast Component', () => {
    // run before and after each test to mock timers
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

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
        expect(toast).toHaveClass('border-green-400');
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

    it('auto-closes after duration (df: 3000ms)', async () => {
        const mockClose = vi.fn();
        render(
            <Toast
                message="Auto Close Test"
                type="success"
                onClose={mockClose}
            />
        );
        expect(mockClose).not.toHaveBeenCalled();

        // move in time by 3000ms
        vi.advanceTimersByTime(3000);

        await waitFor(() => {
            expect(mockClose).toHaveBeenCalledTimes(1);
        });
    });

    it('auto-closes after custom duration', async () => {
        const mockClose = vi.fn();
        render(
            <Toast
                message="Custom duration"
                type="success"
                onClose={mockClose}
                duration={5000}
            />
        );

        // move in time by 3000ms
        vi.advanceTimersByTime(3000);
        expect(mockClose).not.toHaveBeenCalled();

        // should close after 5000ms (total)
        vi.advanceTimersByTime(2000);
        await waitFor(() => {
            expect(mockClose).toHaveBeenCalledTimes(1);
        });
    });

});
