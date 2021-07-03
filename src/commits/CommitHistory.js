import { useEffect, useState } from 'react';
import Commit from './Commit';
import List from '@material-ui/core/List';
import { ListItem } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import './CommitHistory.css';

const CommitHistory = ({ eventsUrl }) => {
    let currentPage = 1;
    const commitIncrements = 15;
    const [events, setEvents] = useState([]);
    const [numberOfCommits, setNumberOfCommits] = useState(commitIncrements);

    useEffect(() => {
        getEvents(currentPage)
    }, [eventsUrl])

    const getEvents = async () => {
        const fetchEvents = async (eventsUrl) => {
            const res = await fetch(eventsUrl)
            const data = await res.json()
            return data
        }

        var gitEvents = await fetchEvents(eventsUrl)
        gitEvents = gitEvents.filter(event => event.type === 'PushEvent');
        
        gitEvents.forEach(event => {
            event.payload.commits.forEach(commit => commit.repoName = event.repo.name);
        });

        setEvents({...events, gitEvents});
    }

    const loadMoreCommits = async () => {
        var actualNumberOfCommits = events.flatMap(event => event.payload.commits).length;
        if (numberOfCommits + commitIncrements > actualNumberOfCommits) {
            await getEvents(++currentPage);
        }

        setNumberOfCommits(numberOfCommits + commitIncrements);
    };

    return (
        <div className='commitHistory'>
            {events.length === 0 ? 'This user has not committed to any public repositories yet.' :
                (
                    <List dense style={{ paddingTop: '0'}}>
                        {
                            events.flatMap(event => event.payload.commits).slice(0, numberOfCommits).map(commit => (
                                <Commit key={commit.sha} commit={commit} repoName={commit.repoName} />
                            ))
                        }
                        <ListItem id='loadMore'>
                            <Button onClick={loadMoreCommits} style={{margin: 'auto', backgroundColor: '#f14e32', borderColor: '#f14e32'}}>
                            Load more
                            </Button>
                        </ListItem>
                    </List>
                )
            }
        </div>
    )
}

export default CommitHistory
