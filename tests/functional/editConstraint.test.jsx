import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '@/App.jsx';

describe('Edit Saved Constraint', () => {
    it('allow editing a saved constraint', async () => {
        render(<App />);
        // build a constraint
        const paramDropdown = screen.getByTestId('parameter-dropdown');
        const opButton = screen.getByText('<='); // TODO: change to data-testid
        const valueInput = screen.getByTestId('value-input');
        const addButton = screen.getByTestId('add-value-button');
        const doneButton = screen.getByTestId('done-button');

        // add tokens
        fireEvent.change(paramDropdown, { target: { value: 'glucose_g_L' } });
        fireEvent.click(opButton);
        fireEvent.change(valueInput, { target: { value: '33' } });
        fireEvent.click(addButton);

        // save constraint
        fireEvent.click(doneButton);

        // verify constraint is saved in the "Saved Constraints" section
        const savedSection = screen.getByText('Saved Constraints:').closest('.saved-constraints');
        expect(savedSection).toBeInTheDocument();

        // use within to search only inside the saved constraints section
        const savedConstraint = within(savedSection).getByText('glucose_g_L');
        expect(savedConstraint).toBeInTheDocument();
        expect(within(savedSection).getByText('<=')).toBeInTheDocument();
        expect(within(savedSection).getByText('33')).toBeInTheDocument();

        // click the edit button
        const editButton = screen.getByTestId('edit-constraint-0');
        fireEvent.click(editButton);

        // verify constraint is loaded back into working area (ConstraintBoard)
        const board = screen.getByTestId('constraint-board');
        const tokensInBoard = within(board).getAllByTestId('token');

        // should have 3 tokens: parameter, operator, value
        expect(tokensInBoard).toHaveLength(3);

        // verify the values in the constraint board
        expect(within(board).getByText('glucose_g_L')).toBeInTheDocument();
        expect(within(board).getByText('<=')).toBeInTheDocument();
        expect(within(board).getByText('33')).toBeInTheDocument();

        // saved constraint section should no longer have this constraint
        expect(screen.queryByText('Saved Constraints')).not.toBeInTheDocument();
    });

});
