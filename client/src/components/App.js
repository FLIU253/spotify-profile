import React, {Component} from 'react';
import {token} from '../spotify';

class App extends Component{
  state = {
    token: '',
  };

  componentDidMount() {
    this.setState({ token });
  }
  render() {
    const { token } = this.state;
    return (
      <div>
        YEET {console.log(token)}
      </div>
    );
  }
}

export default App;
