import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProgressModal from '@/components/ProgressModal/ProgressModal.jsx';

describe('ProgressModal Component', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    it('renders modal when isOpen is true', () => {
        render(
            <ProgressModal
                isOpen={true}
                progress={50}
                message="Running simulation..."
            />
        );
        expect(screen.getByTestId('progress-modal')).toBeInTheDocument();
        expect(screen.getByText('Running simulation...')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
        render(
            <ProgressModal
                isOpen={false}
                progress={50}
                message="Running simulation..."
            />
        );
        expect(screen.queryByTestId('progress-modal')).not.toBeInTheDocument();
    });

    it('renders progress bar with correct width', () => {
        render(
            <ProgressModal
                isOpen={true}
                progress={60}
                message="Loading..."
            />
        );
        const progressBar = screen.getByTestId('progress-bar');
        expect(progressBar).toHaveStyle('width: 60%');
    });

    it('displays the custom message', () => {
        const customMessage = "Optimizing constraints...";
        render(
            <ProgressModal
                isOpen={true}
                progress={30}
                message={customMessage}
            />
        );
        expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('handles 0% progress', () => {
        render(
            <ProgressModal
                isOpen={true}
                progress={0}
                message="Starting..."
            />
        );
        expect(screen.getByText('0%')).toBeInTheDocument();
        const progressBar = screen.getByTestId('progress-bar');
        expect(progressBar).toHaveStyle('width: 0%');
    });

    it('handles 100% progress', () => {
        render(
            <ProgressModal
                isOpen={true}
                progress={100}
                message="Completed!"
            />
        );
        expect(screen.getByText('100%')).toBeInTheDocument();
        const progressBar = screen.getByTestId('progress-bar');
        expect(progressBar).toHaveStyle('width: 100%');
    });

    it('renders with backdrop overlay', () => {
        render(
            <ProgressModal
                isOpen={true}
                progress={50}
                message="Runnning..."
            />
        );
        const backdrop = screen.getByTestId('modal-backdrop');
        expect(backdrop).toBeInTheDocument();
        expect(backdrop).toHaveClass('bg-black');
        expect(backdrop).toHaveClass('bg-opacity-50');
    });

    it('prevents interaction with backdrop', () => {
        render(
            <ProgressModal
                isOpen={true}
                progress={50}
                message="Running..."
            />
        );
        const backdrop = screen.getByTestId('modal-backdrop');
        expect(backdrop).toHaveClass('fixed');
        expect(backdrop).toHaveClass('inset-0'); // for full screen coverage
    });

    it('shows loading spinner icon', () => {
        render(
            <ProgressModal
                isOpen={true}
                progress={50}
                message="Running..."
            />
        );
        const spinner = screen.getByTestId('loading-spinner');
        expect(spinner).toBeInTheDocument();
    });

});
