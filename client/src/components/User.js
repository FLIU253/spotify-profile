import React, { Component, Fragment } from 'react';
import { getUserInfo } from '../spotify-api';
import styled from 'styled-components';

const Main = styled.div`
    padding-left: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Header = styled.header`
    padding-top:150px;
`;
const Avatar = styled.div`
    img{
        width:150px;
        height:150px;
        border-radius: 100%;
    }
`;
class User extends Component{
    state = {
        user: null
    }
    
    componentDidMount(){
        this.getData();
    }

    async getData() {
        const { user} = await getUserInfo();
        this.setState({ user });
        console.log(user);
    }
    
    render() {
        const { user } = this.state;

        return(
            <Fragment>
                {user ? (
                    <Main>
                       <Header>
                       {user.images.length > 0 ? (
                            <Avatar>
                                <img src={user.images[0].url} alt="user profile picture"/>
                            </Avatar>
                        ) : null}
                        <h1>
                            {user.display_name}
                        </h1>
                       </Header>
                    </Main>
                ): null}
            </Fragment>
        )
    }
}

export default User;