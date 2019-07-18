import React, { Component } from 'react';
import { getRandTopTrackAndArtist, getRecommendations, getUser, createPlaylist, addTracksToPlaylist} from '../spotify-api';

class GeneratePlaylist extends Component{

    state = {
        recommendations: null,
        userId: null,
        playlistId: null,
        trackURIList: null
    };

    componentDidMount(){
        //this.getData();
    }

    async getData(){
        const {artistID, trackID} = await getRandTopTrackAndArtist();
        const {data} = await getRecommendations(artistID, trackID);
        const uriList = [];
        data.tracks.forEach((track)=> {
            uriList.push(track.uri);
        })
        this.setState({recommendations: data, trackURIList: uriList.join(',')});

        this.createRecommendedPlaylist(uriList.join(','));
    }

    async createRecommendedPlaylist(uris) {
        const {data} = await getUser();
        const userId = data.id;
        this.setState({userId});

        if(data){
            const{data} = await createPlaylist(userId, "Recommended Tracks based on your favorite tracks and artists");
            const playlistId = data.id;
            this.setState({playlistId});

            if(data){
                const {data} = await addTracksToPlaylist(playlistId, uris);
                console.log(data);
            }
        }

    }

    render(){
        return(
            <div>Testing</div>
        );
    }
}

export default GeneratePlaylist;