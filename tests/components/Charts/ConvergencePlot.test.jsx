import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ConvergencePlot from '@/components/Charts/ConvergencePlot.jsx';

describe('ConvergencePlot Component', () => {
    const mockData = [
        { iteration: 0, value: 20.5 },
        { iteration: 1, value: 28.3 },
        { iteration: 2, value: 35.1 },
        { iteration: 3, value: 39.8 },
        { iteration: 4, value: 42.5 }
    ];

    it('renders chart container', () => {
        render(<ConvergencePlot data={mockData} />);

        expect(screen.getByTestId('convergence-plot')).toBeInTheDocument();
    });

    it('renders with responsive container', () => {
        const { container } = render(<ConvergencePlot data={mockData} />);

        // Recharts uses ResponsiveContainer
        expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
    });

    it('handles empty data gracefully', () => {
        render(<ConvergencePlot data={[]} />);

        expect(screen.getByText(/No convergence data available/i)).toBeInTheDocument();
    });

    it('handles null data gracefully', () => {
        render(<ConvergencePlot data={null} />);

        expect(screen.getByText(/No convergence data available/i)).toBeInTheDocument();
    });

    it('renders placeholder for empty data', () => {
        render(<ConvergencePlot data={[]} />);

        const placeholder = screen.getByTestId('convergence-plot');
        expect(placeholder).toHaveClass('bg-gray-50');
        expect(placeholder).toHaveClass('border-dashed');
    });

    it('does not render placeholder when data exists', () => {
        render(<ConvergencePlot data={mockData} />);

        const plot = screen.getByTestId('convergence-plot');
        expect(plot).not.toHaveClass('border-dashed');
    });

    it('renders with proper width styling', () => {
        render(<ConvergencePlot data={mockData} />);

        const plot = screen.getByTestId('convergence-plot');
        expect(plot).toHaveClass('w-full');
    });
});
