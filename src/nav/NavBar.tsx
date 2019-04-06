import React, { Component } from 'react';
import SearchBar from './SearchBar';
import UnitConverter from './UnitConverter';

interface NavBarProps {
  convertUnit: (newUnit: string) => void,
  submitSearch: (newSearchQuery: string) => void,
  unit: string
}

class NavBar extends Component<NavBarProps, {}> {
  convertUnit = (newUnit: string) => {
    this.props.convertUnit(newUnit);
  }

  submitSearch = (newSearchQuery: string) => {
    this.props.submitSearch(newSearchQuery);
  }

  render() {
    return (
      <nav>
        <SearchBar submitSearch={this.submitSearch} />
        <div>Starry Night</div>
        <UnitConverter convertUnit={this.convertUnit} unit={this.props.unit} />
      </nav>
    );
  }
}

export default NavBar;
