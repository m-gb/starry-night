import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchBarProps {
  submitSearch: (newSearchQuery: string) => void
}

interface SearchBarState {
  searchQuery: string
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      searchQuery: ''
    };
  }

  handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchQuery: e.currentTarget.value
    });
  }

  handleSearch = (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    this.props.submitSearch(this.state.searchQuery);
  }

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSearch}>
          <input
            type="search"
            value={this.state.searchQuery}
            name="SearchBar"
            id="SearchBar"
            placeholder="Enter City or Zipcode"
            onChange={this.handleQueryChange} />
          <span onClick={this.handleSearch}>
            <FontAwesomeIcon icon={['fas', 'search']} />
          </span>
        </form>
      </div>
    );
  }
}

export default SearchBar;
