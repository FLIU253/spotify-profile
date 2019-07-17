import React, { Component } from 'react';
import {getTopArtistsLong } from '../spotify-api';
import styled from 'styled-components';

const Main = styled.div`
    padding-left: 120px;
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

const Artists = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    margin-top: 50px;
    gap: 20px 20px;
`;

const ArtistSection = styled.div`
text-align: center;
img{
    width:200px;
    height:200px;
    border-radius: 100%;
}
`;

const Name = styled.p`
    text-align: center;

`;
class TopArtists extends Component {
    state = {
        topArtists: null,
    };
    componentDidMount(){
        this.getData();
    }

    async getData(){
        const {data} = await getTopArtistsLong();
        this.setState({ topArtists: data });
        console.log(data);
    }

    render(){
        const {topArtists} = this.state;
        return(
           <Main>
               <Header>
                   <h2>Top Artists</h2>
               </Header>
               <Artists>
                   {topArtists ? (
                           topArtists.items.map(({ id, external_urls, images, name }, i) => (
                            <ArtistSection key = {i}>
                                 {images.length && <img src={images[1].url} alt="Artist" />}
                                 <Name>{name}</Name>
                            </ArtistSection>
                          ))
                   ) :null}
               </Artists>
           </Main>
        );
    }
}
export default TopArtists;