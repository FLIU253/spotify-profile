import React, { Component, Fragment } from 'react';
import { getUserInfo } from '../spotify-api';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

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
const Avatar = styled.div`
    img{
        width:150px;
        height:150px;
        border-radius: 100%;
    }
`;

const FollowInfo = styled.div`
    padding-top: 25px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 15px;
    text-align:center;
`;

const Preview = styled.div`
    margin-top: 100px;
    display:grid;
    grid-template-columns: 50% 50%;
    grid-column-gap: 20px;
    width: 100%;
    text-align:left;
`;

const List = styled.div`
    color: white;
`;

const ListHeading = styled.div`
    margin-bottom: 40px;
    text-align: center;
    h3{
        display: inline-block;
        margin: 0;
    }
`;
const ProfilePic = styled.div`
    text-align: left;
    margin-bottom: 25px;
    display: flex;
    img{
        width:50px;
        height: 50px;
        border-radius: 100%;
        margin-right: 50px;
    }
`;
const AlbumCover = styled.div`
text-align: left;
margin-bottom: 25px;
display: flex;
height:50px;
img{
    width:50px;
    height: 50px;
    margin-right: 50px;
}
.song-name{
    height: 22px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 48%;
    margin-right: 10px;
}
`;

class User extends Component{
    state = {
        user: null,
        followedArtists: null,
        playlists: null,
        topArtists: null,
        topTracks: null,
    }
    
    componentDidMount(){
        if(localStorage.spotify_access_token)
        {
            this.getData();
        }else{
            console.log(Date.now());
        }
    }

    async getData() {
        if(!localStorage.user && !localStorage.followedArtists && !localStorage.playlists && !localStorage.topArtists && !localStorage.topTracks){
            const { user, followedArtists, playlists, topArtists, topTracks} = await getUserInfo();
            this.setState({  user, followedArtists, playlists, topArtists, topTracks });
            console.log(user, followedArtists, playlists, topArtists, topTracks);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("followedArtists", JSON.stringify(followedArtists));
            localStorage.setItem("playlists", JSON.stringify(playlists));
            localStorage.setItem("topArtists", JSON.stringify(topArtists));
            localStorage.setItem("topTracks", JSON.stringify(topTracks));
        }else{
            console.log("using stored tokens");
            this.setState({
                user: JSON.parse(localStorage.user),
                followedArtists: JSON.parse(localStorage.followedArtists),
                playlists:JSON.parse( localStorage.playlists),
                topArtists: JSON.parse(localStorage.topArtists),
                topTracks: JSON.parse(localStorage.topTracks),
            });
        }
    }
    
    millisToMinutesAndSeconds(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      }
            
    render() {
        const { user, followedArtists, playlists, topArtists, topTracks } = this.state;
        const totalPlaylists = playlists ? playlists.total : 0;

        return(
            <Fragment>
                {user ? (
                    <Main>
                       <Header>
                       {user.images.length > 0 ? (
                            <Avatar>
                                <img src={user.images[0].url} alt="user profile"/>
                            </Avatar>
                        ) : null}
                        <h1>
                            {user.display_name}
                        </h1>
                        <FollowInfo>
                            <div>
                               <p style ={{margin: 0}}>{user.followers.total}</p>
                               <p style ={{margin: 0}}>FOLLOWERS</p>
                            </div>
                            <div>
                               <p style ={{margin: 0}}>{followedArtists.artists.items.length}</p>
                               <p style ={{margin: 0}}>FOLLOWING</p>
                            </div>
                            <div>
                               <p style ={{margin: 0}}>{totalPlaylists}</p>
                               <p style ={{margin: 0}}>PLAYLISTS</p>
                            </div>
                        </FollowInfo>
                       </Header>

                       <Preview>
                          <List>
                            <ListHeading>
                                <h3>Top Artists of All Time</h3>
                                <div>
                                    {topArtists ?(
                                        <ul>
                                            {topArtists.items.slice(0, 10).map((artist,i) => (
                                                <div  key={i}>
                                                    <ProfilePic>
                                                    <img src={artist.images[2].url} alt="artist"/>
                                                    <span>{artist.name}</span>
                                                    </ProfilePic>
                                                </div>
                                            ))}
                                        </ul>
                                    ): null}
                                </div>
                            </ListHeading>
                          </List>

                          <List>
                            <ListHeading>
                                <h3>Top Tracks of All Time</h3>
                                <div>
                                    {topTracks ?(
                                        <ul>
                                            {topTracks.items.slice(0, 10).map((track,i) => (
                                                <div  key={i}>
                                                <AlbumCover >
                                                    <img src={track.album.images[2].url} alt="album cover"/>
                                                    <span className = "song-name" key={i}>
                                                    {track.name}
                                                    </span>
                                                    <p style = {{display: 'flex', height: '22px', margin: '0'}}>{this.millisToMinutesAndSeconds(track.duration_ms)}</p>
                                                </AlbumCover>
                                                </div>
                                            ))}
                                        </ul>
                                    ): null}
                                </div>
                            </ListHeading>
                          </List>
                        </Preview>
                    </Main>
                ):  <Main>
                     <Header>
                    <Loader type="Puff" color="#00BFFF" height="500"	width="500" className = "loader"/>
                    </Header>
                     </Main>}
            </Fragment>
        )
    }
}

export default User;