import React, {Component} from 'react';
import { access_token } from '../spotify-api';

import LoginScreen from './LoginScreen';
import Profile from './Profile';

class App extends Component{

  constructor(){
    super();
    console.log(access_token);
  }

  render() {
    return (
      <div>
         {access_token ? <Profile /> : <LoginScreen />}
      </div>
    );
  }
}

export default App;
