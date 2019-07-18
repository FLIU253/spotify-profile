import React, { Component } from 'react';
import { getRandTopTrackAndArtist, getRecommendations, getUser, createPlaylist, addTracksToPlaylist, getAPlaylist} from '../spotify-api';
import styled from 'styled-components';

const Main = styled.div`
    padding-left: 120px;
    padding-top: 120px;
    min-height: 100vh;
    overflow-x:hidden;
`;
const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align:center;
    flex-direction: column;
    position: relative;
`;

const GeneratedButton = styled.div`
    background-color: #1DB954;
    color: #FFFFFF;
    border-radius: 30px;
    padding: 17px 35px;
    margin: 20px 0 70px;
    min-width: 160px;
    max-width: 200px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;
    &:hover,
    &:focus {
        background-color: #1ed760;
        cursor: pointer;
    }
`;

const PlayListInfo = styled.div`
    display:grid;
    grid-template-columns: 40% 60%;
    text-align: center;

`;

class GeneratePlaylist extends Component{

    state = {
        recommendations: null,
        userId: null,
        playlistId: null,
        trackURIList: null,
        playlist: null
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
                if(data){
                    const {data} = await getAPlaylist(playlistId);
                    this.setState({playlist: data});
                    console.log(data);
                }
            }
        }

    }

    handleClick =(e) =>{
        e.preventDefault();
        this.getData();
    }

    render(){
        return(
            <Main>
                <Header>
                    <h3>Generate A Random Playlist Based on Your Top Artist and Tracks Here!</h3>
                    <GeneratedButton onClick = {this.handleClick}>Generate!</GeneratedButton>
                </Header>
              {this.playlist ? (
                    <PlayListInfo>
                        <div>
                            <img src={this.playlist.images[1].url} alt="playlist cover"/>
                            <h4>{this.playlist.name}</h4>
                        </div>
                        <div>
                            TESTING TESTING
                        </div>
                    </PlayListInfo>
              ) : null}
            </Main>
        );
    }
}

export default GeneratePlaylist;