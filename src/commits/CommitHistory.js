import { useEffect, useState } from 'react';
import Commit from './Commit';
import List from '@material-ui/core/List';
import { ListItem } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import './CommitHistory.css';

const CommitHistory = ({ eventsUrl }) => {
    const commitIncrements = 15;
    const [events, setEvents] = useState([]);
    const [numberOfCommits, setNumberOfCommits] = useState(commitIncrements);
    const [showLoadMore, setShowLoadMore] = useState(true);

    useEffect(() => {
        const getEvents = async () => {
            var gitEvents = await fetchEvents(eventsUrl)
            gitEvents = gitEvents.filter(event => event.type === 'PushEvent');
            
            gitEvents.forEach(event => {
                event.payload.commits.forEach(commit => commit.repoName = event.repo.name);
            });

            setEvents(gitEvents);
        }

        getEvents()
    }, [eventsUrl]);

    const fetchEvents = async (eventsUrl) => {
        const res = await fetch(eventsUrl)
        const data = await res.json()
        return data
    }

    const loadMoreCommits = async () => {
        var actualNumberOfCommits = events.flatMap(event => event.payload.commits).length;
        if (numberOfCommits + commitIncrements > actualNumberOfCommits) {
            setNumberOfCommits(actualNumberOfCommits);
            setShowLoadMore(false);
        } else {
            setNumberOfCommits(numberOfCommits + commitIncrements);
        }
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
                        { showLoadMore &&
                        <ListItem id='loadMore'>
                            <Button onClick={loadMoreCommits} style={{margin: 'auto', backgroundColor: '#f14e32', borderColor: '#f14e32'}}>
                            Load more
                            </Button>
                        </ListItem>
                        }
                    </List>
                )
            }
        </div>
    )
}

export default CommitHistory
