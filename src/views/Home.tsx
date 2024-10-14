import React from 'react';
import Map from '../components/Map/Map';

const Home = () => {
    return (
        <>
            <h1 className="title">Welcome!</h1>
            <p className="body">Select an Area of Interest (AOI) for your project:</p>
            <Map center={[-13.56, -16.52]} zoom={3} />
        </>
    )
}

export default Home;
