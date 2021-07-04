import { render, screen, waitFor } from '@testing-library/react'
import Commit from './Commit'

const commit = {
    sha: 'c937aabbd7f46fa3b283744169a6b48dafbd6cc7',
    message: 'Introduce new bugs\n\nI felt that the project needed more bugs, so I added some'
};

test('should show commit info', async () => {
    render(<Commit key={commit.sha} commit={commit} repoName='mocktocat/reposteel' />);

    await waitFor(() => {
        expect(screen.getByText('Introduce new bugs')).toBeInTheDocument();
        expect(screen.getByText('mocktocat/reposteel')).toBeInTheDocument();
    });
});