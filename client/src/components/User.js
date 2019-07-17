import React, { Component, Fragment } from 'react';
import { getUserInfo } from '../spotify-api';
import styled from 'styled-components';

const Main = styled.div`
    padding-left: 120px;
    padding-top: 120px;
    min-height: 100vh;
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
    grid-template-columns: repeat(2, 1fr);
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
class User extends Component{
    state = {
        user: null,
        followedArtists: null,
        playlists: null,
        topArtists: null,
        topTracks: null,
    }
    
    componentDidMount(){
        this.getData();
    }

    async getData() {
        const { user, followedArtists, playlists, topArtists, topTracks} = await getUserInfo();
        this.setState({  user, followedArtists, playlists, topArtists, topTracks });
        console.log(user, followedArtists, playlists, topArtists, topTracks);
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
                                                <div  key={i}>{track.name}</div>
                                            ))}
                                        </ul>
                                    ): null}
                                </div>
                            </ListHeading>
                          </List>
                        </Preview>
                    </Main>
                ): null}
            </Fragment>
        )
    }
}

export default User;