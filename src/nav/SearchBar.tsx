import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchBarProps {
  submitSearch: (newQuery: string) => void
}

interface SearchBarState {
  query: string
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      query: ''
    };
  }

  handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: e.currentTarget.value
    });
  }

  handleSearch = (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    this.props.submitSearch(this.state.query);
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSearch}>
        <div className="input-group">
          <input
            className="form-control"
            type="search"
            value={this.state.query}
            name="SearchBar"
            id="SearchBar"
            placeholder="Enter City or Zipcode"
            onChange={this.handleQueryChange} />
          <div className="input-group-append">
            <button className="btn btn-outline-info" onClick={this.handleSearch}><FontAwesomeIcon icon={['fas', 'search']} /></button>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
