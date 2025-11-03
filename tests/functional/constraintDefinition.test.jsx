import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from '@/App.jsx';
import { ToastProvider } from '@/contexts/ToastContext.jsx';


describe('parameter selection', () => {
    it('renders parameter selector with expected options', () => {
        render(
            <ToastProvider>
                <App />
            </ToastProvider>
        );

        // parameter dropdown should be present
        const dropdown = screen.getByRole('combobox', { name: /parameter/i });
        expect(dropdown).toBeInTheDocument();

    });
});

