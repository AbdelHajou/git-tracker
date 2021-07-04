import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Image, Col, Container, Row, Tabs, Tab } from 'react-bootstrap'
import { FaGithub, FaEnvelope, FaEye } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import CommitHistory from '../commits/CommitHistory';
import ProgrammingLanguages from '../programming-languages/ProgrammingLanguages';
import './Profile.css'

const Profile = () => {
    let { userName } = useParams();
    const [user, setUser] = useState({created_at: new Date()});
    const [views, setViews] = useState(0);

    const dateFormat = 'MMMM do, yyyy';

    useEffect(() => {
        let isSubscribed = true;

        const getUser = async () => {
            const gitUser = await fetchUser(userName)
            if (isSubscribed) {
                setUser(gitUser)
            }
        }

        const viewProfile = async () => {
            const views = await fetchViews(userName);
            if (isSubscribed) {
                setViews(views); 
            }
        };

        getUser();
        viewProfile();

        return () => (isSubscribed = false);
    }, [userName])

    const fetchUser = async (userName) => {
        const res = await fetch(`https://api.github.com/users/${userName}`)
        const data = await res.json()
        return data
    }

    const fetchViews = async (userName) => {
        const res = await fetch(`http://localhost:8080/api/profiles/${userName}/views`);
        const data = await res.json();
        return data.views;
    }


    return (
        <Container>
            <Row style={{padding: '1em'}}>
                <Col md='3'>
                    <Image src={user.avatar_url} alt={user.login} roundedCircle />
                </Col>
                <Col md='5' style={{verticalAlign: 'middle'}}>
                    <h2>{user.name} {user.name ? `(${user.login})` : user.login}</h2>
                    <p>Member since {format(new Date(user.created_at), dateFormat)}</p>
                    <FaGithub />   <a href={user.html_url}>GitHub profile</a><br />
                    <FaEye />   <span>{views} profile views</span>
                    {user.email && (<><br/><FaEnvelope /><span>{user.email}</span></>)}
                </Col>
            </Row>
            <ProgrammingLanguages reposUrl={user.repos_url}></ProgrammingLanguages>
            <Tabs defaultActiveKey='commitHistory'>
                <Tab eventKey='commitHistory' title="Commit History">
                    <CommitHistory eventsUrl={`https://api.github.com/users/${user.login}/events`} />
                </Tab>
            </Tabs>
        </Container> 
    )
}

export default Profile
