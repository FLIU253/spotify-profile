import React from 'react';
import { Router } from '@reach/router';
import Navbar from './Navbar';
import User from './User';
import TopArtist from './TopArtist';

const Profile = () => (
    <div>
        <Navbar/>
        <Router>
            <User path = "/"/>
            <TopArtist path = "/artists"/>
        </Router>
    </div>
);

export default Profile;