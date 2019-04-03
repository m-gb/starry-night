import React, { Component } from 'react';
import SearchBox from './SearchBox';
import UnitConverter from './UnitConverter';

interface NavBarProps {
  convertUnit: (newUnit: string) => void,
  submitSearch: (searchQuery: string) => void,
  unit: string
}

class NavBar extends Component<NavBarProps, {}> {
  sendNewUnitToParent = (newUnit: string) => {
    this.props.convertUnit(newUnit);
  }

  sendSearchQueryToParent = (searchQuery: string) => {
    this.props.submitSearch(searchQuery);
  }

  render() {
    return (
      <nav>
        <SearchBox submitSearch={this.sendSearchQueryToParent} />
        <div>Starry Night</div>
        <UnitConverter convertUnit={this.sendNewUnitToParent} unit={this.props.unit} />
      </nav>
    );
  }
}

export default NavBar;
