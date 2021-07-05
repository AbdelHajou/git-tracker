import nock from 'nock';
import { act, render, screen, waitFor } from '@testing-library/react'
import ProgrammingLanguages from './ProgrammingLanguages';

beforeEach(() => {
    nock('https://api.github.com/')
        .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true' 
        })
        .persist()
        .get('/users/mocktocat/repos')
        .reply(200, [
            {
                languages_url: 'https://api.github.com/repos/mocktocat/reposteel/languages'
            },
            {
                languages_url: 'https://api.github.com/repos/mockrosoft/winthose/languages'
            }
        ]
        );

    nock('https://api.github.com/')
    .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true' 
    })
    .persist()
    .get('/repos/mocktocat/reposteel/languages')
    .reply(200, {
            JavaScript: 6540,
            Java: 40000,
            HTML: 3000,
            CSS: 240
    });

    nock('https://api.github.com/')
    .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true' 
    })
    .persist()
    .get('/repos/mockrosoft/winthose/languages')
    .reply(200, {
            C: 943832493,
            'C++': 543534643
    });
});

test('shows overview of most used programming languages', async () => {
    act(() => {
        render(<ProgrammingLanguages reposUrl='https://api.github.com/users/mocktocat/repos' />);
    });

    await waitFor(() => {
        // Using exact match for C and Java because partial matching would cause false positives
        expect(screen.getByText(/^C$/i)).toBeInTheDocument();
        expect(screen.getByText('C++')).toBeInTheDocument();
        expect(screen.getByText(/^Java$/i)).toBeInTheDocument();
        expect(screen.getByText('JavaScript')).toBeInTheDocument();
        expect(screen.getByText('HTML')).toBeInTheDocument();
    });
});