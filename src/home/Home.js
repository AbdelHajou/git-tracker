import React from 'react';
import Search from '../search/Search';
import { Container, Image } from 'react-bootstrap';
import './Home.css';

const Home = () => {
    return (
    <Container className='home'>
        <Image src={process.env.PUBLIC_URL + '/git_logo.png'} />
        <Search />
    </Container>
    )
}

export default Home

