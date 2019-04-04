import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchBoxProps {
  submitSearch: (searchQuery: string) => void
}

interface SearchBoxState {
  query: string
}

class SearchBox extends Component<SearchBoxProps, SearchBoxState> {
  constructor(props: SearchBoxProps) {
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
    console.log('Fetching weather data for: ', this.state.query);
    this.props.submitSearch(this.state.query);
  }

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSearch}>
          <input
            type="search"
            value={this.state.query}
            name="searchBox"
            id="searchBox"
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

export default SearchBox;
