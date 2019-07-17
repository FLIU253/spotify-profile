import React from 'react';
import { Router } from '@reach/router';
import Navbar from './Navbar';
import User from './User';
import TopArtist from './TopArtist';
import TopTracks from './TopTracks';
import Playlists from './Playlists';

const Profile = () => (
    <div>
        <Navbar/>
        <Router>
            <User path = "/"/>
            <TopArtist path = "/artists"/>
            <TopTracks path = "/tracks"/>
            <Playlists path = "/playlists"/>
        </Router>
    </div>
);

export default Profile;