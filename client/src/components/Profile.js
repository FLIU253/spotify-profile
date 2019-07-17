import React from 'react';
import { Router } from '@reach/router';
import Navbar from './Navbar';
import User from './User';
import TopArtist from './TopArtist';
import TopTracks from './TopTracks';

const Profile = () => (
    <div>
        <Navbar/>
        <Router>
            <User path = "/"/>
            <TopArtist path = "/artists"/>
            <TopTracks path = "/tracks"/>
        </Router>
    </div>
);

export default Profile;