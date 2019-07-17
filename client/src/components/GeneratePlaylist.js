import React, { Component } from 'react';
import { getRandomTopArtistId } from '../spotify-api';

class GeneratePlaylist extends Component{

    componentDidMount(){
        console.log(getRandomTopArtistId());
    }
    render(){
        return(
            <div>Testing</div>
        );
    }
}

export default GeneratePlaylist;