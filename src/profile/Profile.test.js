/*global renderWithRouter*/
import { screen, waitFor } from '@testing-library/react'
import nock from 'nock';
import Profile from './Profile';

beforeAll(() => {
    nock('https://api.github.com')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true' 
        })
        .persist()
        .get(/\/users\/.*\/events$/)
        .reply(200, []);

    nock('https://api.github.com')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true' 
        })
        .persist()
        .get('/users/mocktocat')
        .reply(200, {
             login: 'mocktocat', name: 'The Mocktocat', created_at: new Date()
        });

    nock('http://localhost:8080/api')
        .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true' 
        })
        .persist()
        .get('/profiles/mocktocat/views')
        .reply(200, {
            userName: 'mocktocat',
            views: 345854
        });
});

test('loads the correct user', async () => {
    renderWithRouter(<Profile />, {path: '/profile/:userName', route: '/profile/mocktocat'});

    await waitFor(() => {
        expect(screen.getByText('The Mocktocat (mocktocat)')).toBeInTheDocument();
    });
});

test('shows the profile views', async () => {
    renderWithRouter(<Profile />, {path: '/profile/:userName', route: '/profile/mocktocat'});

    await waitFor(() => {
        expect(screen.getByText(/345854/i)).toBeInTheDocument();
    });
});