import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import nock from 'nock';
import CommitHistory from './CommitHistory';

beforeEach(() => {
    var events = [
        {
            type: 'PushEvent',
            repo: {
                name: 'mocktocat/reposteel'
            },
            payload: {
                commits: [
                    { sha: 'c937aabbd7f46fa3b283744169a6b48dafbd6cc7', message: 'Introduce new bugs' },
                    { sha: 'c937aabbd7f46fa3b283744169a6b48dafbd6cc8', message: 'Fix bugs' }
                ]
            }
        },
        {
            type: 'PushEvent',
            repo: {
                name: 'mocktocat/reposteel'
            },
            payload: {
                commits: [
                    { sha: 'c937aabbd7f46fa3b283744169a6b48dafbd6cc9', message: 'Write documentation' },
                ]
            }
        },
        {
            type: 'CreateEvent',
            repo: {
                name: 'mocktocat/reposteel' 
            },
            payload: {}
        }
    ];

    Array.from({length: 20}, (x, i) => i).forEach(n => events.push(
        {
            type: 'PushEvent',
            repo: {
                name: 'mocktocat/reposteel'
            },
            payload: {
                commits: [
                    { sha: 'c937aabbd7f46fa3b283744169a6b48dafbd6ccd' + n, message: 'Dummy commit ' + n },
                ]
            }
        }
    ));

    nock('https://api.github.com')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true' 
        })
        .persist()
        .get('/users/mocktocat/events')
        .reply(200, events);
});

test('should load commits', async () => {
    act(() => {
        render(<CommitHistory eventsUrl='https://api.github.com/users/mocktocat/events' />);
    });

    await waitFor(() => {
        expect(screen.getByText('Introduce new bugs')).toBeInTheDocument();
        expect(screen.getByText('Write documentation')).toBeInTheDocument();
        expect(screen.getByText('Fix bugs')).toBeInTheDocument();
    });
});

test('should hide Load more when all commits are loaded', async () => {
    act(() => {
        render(<CommitHistory eventsUrl='https://api.github.com/users/mocktocat/events' />);
    });

    await waitFor(() => {
        expect(screen.getByText('Dummy commit 1')).toBeInTheDocument();
    });

    const loadMore = screen.getByText(/Load more/i);
    userEvent.click(loadMore);

    await waitFor(() => {
        expect(loadMore).not.toBeInTheDocument();
    });
});