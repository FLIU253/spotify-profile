import React, { Component } from 'react';
import { getPlaylists } from '../spotify-api';
import styled from 'styled-components';

const Main = styled.div`
    padding-left: 120px;
    padding-top: 50px;
    min-height: 100vh;
    overflow-x:hidden;
    margin-left: 75px;
    margin-right: 75px;
`;

const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align:center;
    flex-direction: column;
    position: relative;
`;
const PlaylistsList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    width: 100%;
    margin-top: 50px;
    gap: 25px 25px;
    text-align: center;
`;
const PlaylistImg = styled.img`
    height: 100%;
    width: 100%;
`;
class Playlists extends Component {
    state = {
        playlists: null
    };

    componentDidMount(){
        this.getData();
    }
    async getData(){
        const {data} = await getPlaylists();
        this.setState({playlists: data});
        console.log(data);
    }
    render() {
        const { playlists } = this.state;
        
        return (
            <Main>
                <Header>
                    <h2>Your Playlists</h2>
                </Header>
                <PlaylistsList>
                {playlists ? (
                    playlists.items.map((playlist, i) => (
                    <div key = {i}>
                        {playlist.images.length ? (
                           <div>
                            <PlaylistImg src={playlist.images[0].url} alt="album art"/>
                            <h3>{playlist.name}</h3>
                            <p>{playlist.tracks.total} Tracks</p>
                           </div>

                        ) : null}
                    </div>
              ))
            ) : (
              null
            )}
                </PlaylistsList>
            </Main>
        );
    }
  }
  
  export default Playlists;