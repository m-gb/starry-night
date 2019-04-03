import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import NavBar from './nav/NavBar';
import './App.css';


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

  onSubmitSearch = (searchQuery: string) => {
    this.setState({
      query: searchQuery
    }, this.notifyStateChange);
  }

  notifyStateChange = () => {
    console.log(this.state);
  }

  render() {
    return (
      <NavBar
        submitSearch={this.onSubmitSearch}
        convertUnit={this.onConvertUnit}
        unit={this.state.unit}
      />
    );
  }
}

export default App;
