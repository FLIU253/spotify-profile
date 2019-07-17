import React, { Component } from 'react';
import {getTopTracksLong } from '../spotify-api';
import styled from 'styled-components';

const Main = styled.div`
    padding-left: 160px;
    padding-top: 50px;
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

class TopTracks extends Component {

    state = {
        topTracks: null
    };
    componentDidMount(){
        this.getData();
    }

    async getData() {
        const {data} = await getTopTracksLong();
        this.setState({topTracks: data});
        console.log(data);
    }

    millisToMinutesAndSeconds(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
            
    render(){
        const { topTracks,  } = this.state;

        return(
            <Main>
                <Header>
                    <h2>Top Tracks of All Time</h2>
                </Header>
                <Tracklist>
                    {topTracks ? (
                        topTracks.items.map((track,i) =>(
                            <Song key = {i}>
                                <SongCover>
                                    <img src={track.album.images[2].url} alt="song cover"/>
                                    <div>
                                    <span>{track.name}</span>
                                    <div style = {{textOverflow:'ellipsis', whiteSpace: 'nowrap', overflow:'hidden'}}>{track.artists.map((artist,i) => (
                                            <span key = {i}>
                                            {artist.name}
                                            {track.artists.length > 0 && i === track.artists.length - 1 ? '' : ','}&nbsp;
                                            </span>
                                        ))}
                                           <span> 
                                            &nbsp;&middot;&nbsp;&nbsp;
                                            {track.album.name}
                                            </span>
                                        </div>
                                    </div>
                                    <p>{this.millisToMinutesAndSeconds(track.duration_ms)}</p>
                                </SongCover>
                            </Song>
                        ))
                    ) : null}
                </Tracklist>
            </Main>
        );
    }
}
export default TopTracks;