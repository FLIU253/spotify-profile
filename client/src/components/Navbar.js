import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const Container = styled.nav`
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    width: 120px;
    background-color: #040306;
    z-index: 99;

    display: flex;
    justify-content: center;
    align-items: center; 
`
const Menu = styled.ul`
    display: grid;
    grid-template-rows: repeat(4, 5vh);
    padding-inline-start: 0px;
`;

const MenuItem = styled.li`
    color: #9B9B9B;
    font-size: 15px;
    text-align: center;
    vertical-align: middle;
    line-height: 5vh; 
    list-style-type: none;
    a {
        color: inherit;
        text-decoration:none;
        display: block;
        width: 100%;
        height: 100%;
        
      }
    a:hover{
        text-decoration: none;
        cursor:pointer;
    }
`;

const isActive = ({ isCurrent }) => (isCurrent ? { className: 'active' } : null);
const NavLink = props => <Link getProps={isActive} {...props} />;

const Navbar = () => (
    <Container>
      <Menu>
          <MenuItem>
            <NavLink to="/">
                <div>Profile</div>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="artists">
             <div>Top Artists</div>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="tracks">
                <div>Top Tracks</div>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="playlists">
                <div>Playlists</div>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="generate">
                <div>Generate</div>
            </NavLink>
          </MenuItem>
      </Menu>
    </Container>
);

export default Navbar;