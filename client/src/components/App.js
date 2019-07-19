import React, {Component} from 'react';
import { token } from '../spotify-api';

import LoginScreen from './LoginScreen';
import Profile from './Profile';

class App extends Component{

  constructor(){
    super();
    console.log(token);
  }

  render() {
    return (
      <div >
         {token ? <Profile /> : <LoginScreen />}
      </div>
    );
  }
}

export default App;
