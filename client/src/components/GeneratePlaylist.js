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
    margin-bottom: 50px;
    text-align: center;
    img{
        height: 250px;
        width:250px;
    }
`;

const Tracklist = styled.ul`
    padding: 0px;
    margin: 0px;
    list-style: none;
`;

const Song = styled.li`
 margin-bottom: 30px;
`;

const SongCover = styled.div`
    display: grid;
    grid-template-columns: 10% 80% 10%;
    img{
        width: 50px;
        height: 50px;
        vertical-align: middle;
        margin-right: 20px;
    }
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

    millisToMinutesAndSeconds(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
            

    render(){
        const {playlist} = this.state;
        return(
            <Main>
                <Header>
                    <h3>Generate A Random Playlist Based on Your Top Artist and Tracks Here!</h3>
                    <GeneratedButton onClick = {this.handleClick}>Generate!</GeneratedButton>
                </Header>
              {playlist ? (
              <div style ={{marginLeft: '50px'}}>
                <PlayListInfo>
                    <h3>Playlist Generated!</h3>
                    <img src={playlist.images[1].url} alt=""/>
                    <h4>{playlist.name}</h4>
                </PlayListInfo> 
                <Tracklist>
                    {playlist.tracks.items.map((track, i) => (
                        <Song key = {i}>
                            <SongCover>
                            <img src={track.track.album.images[2].url} alt="song cover"/>
                            <div>
                            <span>{track.track.name}</span>
                            <div style = {{textOverflow:'ellipsis', whiteSpace: 'nowrap', overflow:'hidden'}}>{track.track.artists.map((artist,i) => (
                                    <span key = {i}>
                                    {artist.name}
                                    {track.track.artists.length > 0 && i === track.track.artists.length - 1 ? '' : ','}&nbsp;
                                    </span>
                                ))}
                                    <span> 
                                    &nbsp;&middot;&nbsp;&nbsp;
                                    {track.track.album.name}
                                    </span>
                                </div>
                            </div>
                            <p>{this.millisToMinutesAndSeconds(track.track.duration_ms)}</p>
                            </SongCover>
                        </Song>
                    ))}
                </Tracklist>
              </div>
              ) : null}
            </Main>
        );
    }
}

export default GeneratePlaylist;