import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import NavBar from './nav/NavBar';

interface AppState {
  query: string,
  unit: string
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      query: '',
      unit: 'C'
    };
    library.add(fab, fas);
  }

  onConvertUnit = (newUnit: string) => {
    this.setState({
      unit: newUnit
    }, this.notifyStateChange);
  }

  onSubmitSearch = (newQuery: string) => {
    this.setState({
      query: newQuery
    }, this.notifyStateChange);
  }

  notifyStateChange = () => {
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <NavBar convertUnit={this.onConvertUnit} submitSearch={this.onSubmitSearch} unit={this.state.unit} />
        <div className="container text-light">
          
        </div>
      </div>
    );
  }
}

export default App;
