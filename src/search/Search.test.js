import { screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Search from './Search'

test('should redirect to profile page', async () => {
    act(() => {
        renderWithRouter(<Search />, {path: '/', route: '/'});
    });

    const inputElement = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');
    
    userEvent.type(inputElement, 'mocktocat');
    await waitFor(() => {
        expect(searchButton).toHaveAttribute('href', '/profile/mocktocat');
    });
});