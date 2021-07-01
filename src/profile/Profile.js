import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Image, Col, Container, Row } from 'react-bootstrap'
import { FaGithub, FaEnvelope } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import CommitHistory from '../commits/CommitHistory';
import './Profile.css'

const Profile = () => {
    let { userName } = useParams();
    const [user, setUser] = useState({created_at: new Date()});

    const dateFormat = 'MMMM do, yyyy';

    useEffect(() => {
        const getUser = async () => {
            const gitUser = await fetchUser(userName)
            setUser(gitUser)
        }

        getUser()
    }, [userName])

    const fetchUser = async (userName) => {
        const res = await fetch(`https://api.github.com/users/${userName}`)

        const data = await res.json()

        return data
    }


    return (
        <Container>
            <Row>
                <Col md='4'>
                    <Image src={user.avatar_url} alt={user.login} roundedCircle />
                    <h2>{user.name} {user.name ? `(${user.login})` : user.login}</h2>
                    <p>Member since {format(new Date(user.created_at), dateFormat)}</p>
                    <FaGithub />   <a href={user.html_url}>GitHub profile</a>
                    {user.email && (<><br/><FaEnvelope /><span>{user.email}</span></>)}
                </Col>
            </Row>
            <Row>
                <Col md='8'>
                    <CommitHistory eventsUrl={`https://api.github.com/users/${user.login}/events`} />
                </Col>
            </Row>    
        </Container> 
    )
}

export default Profile
