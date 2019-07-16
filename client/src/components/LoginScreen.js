import React from 'react';
import styled from 'styled-components';

const login_uri = 'http://localhost:8000/login';

const Login = styled.div`
    background-color: rgb(24, 24, 24);
    color: white;
    width: 100%;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
`;
const LoginButton = styled.a`
  display: inline-block;
  background-color: #1DB954;
  color: #FFFFFF;
  border-radius: 30px;
  padding: 17px 35px;
  margin: 20px 0 70px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: #1ed760;
  }
`;

const LoginScreen = () => (
    <Login>
        <h1>Spotify Profile</h1>
        <LoginButton href={login_uri}>Log in to Spotify</LoginButton>
    </Login>
);

export default LoginScreen;