import React, { Component } from 'react';
import SearchBar from './SearchBar';
import UnitConverter from './UnitConverter';

interface NavBarProps {
  convertUnit: (newUnit: string) => void,
  submitSearch: (newQuery: string) => void
  unit: string
}

class NavBar extends Component<NavBarProps, {}> {
  sendNewUnitToParent = (newUnit: string) => {
    this.props.convertUnit(newUnit);
  }

  sendNewQueryToParent = (newQuery: string) => {
    this.props.submitSearch(newQuery);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="collapse navbar-collapse">
          <span className="navbar-brand text-info"><img className="logo" src="favicon.ico" /> Starry Night</span>
        </div>
          <UnitConverter convertUnit={this.sendNewUnitToParent} unit={this.props.unit} />
          <SearchBar submitSearch={this.sendNewQueryToParent} />
      </nav>
    );
  }
}

export default NavBar;
