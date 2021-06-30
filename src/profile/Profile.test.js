import { render, screen, waitFor } from '@testing-library/react'
import nock from 'nock';
import Profile from './Profile';

beforeAll(() => {
    nock('https://api.github.com')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true' 
        })
        .get('/users/mocktocat')
        .reply(200, {
             login: 'mocktocat', name: 'The Mocktocat', created_at: new Date()
        });
});

test('loads the correct user', async () => {
    renderWithRouter(<Profile />, {path: '/profile/:userName', route: '/profile/mocktocat'});

    await waitFor(() => {
        expect(screen.getByText('The Mocktocat (mocktocat)')).toBeInTheDocument();
    });
});