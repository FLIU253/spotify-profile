import React, {Component} from 'react';
import { access_token } from '../spotify-api';

class App extends Component{

  constructor(){
    super();
    console.log(access_token);
  }

  render() {
    return (
      <div>
        <a href="http://localhost:8888">login to Spotify</a>
      </div>
    );
  }
}

export default App;
