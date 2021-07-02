import { render, screen, waitFor } from '@testing-library/react'
import nock from 'nock';
import CommitHistory from './CommitHistory';

beforeAll(() => {
    nock('https://api.github.com')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true' 
        })
        .persist()
        .get('/users/mocktocat/events')
        .reply(200, [
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
        ]);
});

test('should load commits', async () => {
    render(<CommitHistory eventsUrl='https://api.github.com/users/mocktocat/events' />);

    await waitFor(() => {
        expect(screen.getByText('Introduce new bugs')).toBeInTheDocument();
        expect(screen.getByText('Write documentation')).toBeInTheDocument();
        expect(screen.getByText('Fix bugs')).toBeInTheDocument();
    });
});