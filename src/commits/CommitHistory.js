import { useEffect, useState } from 'react';
import Commit from './Commit';

const CommitHistory = ({ eventsUrl }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            const events = await fetchEvents(eventsUrl)
            setEvents(events.filter(event => event.type === 'PushEvent'));
        }

        getEvents()
    }, [events, eventsUrl])

    const fetchEvents = async (eventsUrl) => {
        const res = await fetch(eventsUrl)

        const data = await res.json()

        return data
    }

    return (
        <div className='commitHistory'>
            <h2>Commit history</h2>
            {events.length === 0 ? 'This user has not committed to any public repositories yet.' :
            events.map(event => (
                event.payload.commits.map(commit => (
                    <Commit key={commit.sha} commit={commit} repo={event.repo} />
                ))
            ))}
        </div>
    )
}

export default CommitHistory
