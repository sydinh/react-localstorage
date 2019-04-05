import React, { Component, Fragment } from 'react';

import Form from './Form';
import List from './List';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      hits: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSetSearchResult = this.onSetSearchResult.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const { searchTerm: query } = this.state;
    if (query === '') return;

    const cachedHits = localStorage.getItem(query);
    if (cachedHits) {
      this.setState({ hits: JSON.parse(cachedHits) });
    } else {
      this.onSearch(query);
    }
  }

  async onSearch(query) {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/search?query=${query}`);
      if (!response.ok) throw Error(response.statusText);
      const result = await response.json();
      this.onSetSearchResult(result, query);
    } catch (error) {
      console.log(error);
    }
  }

  onSetSearchResult(result, query) {
    this.setState({ hits: result.hits });
    localStorage.setItem(query, JSON.stringify(result.hits));
  }

  render() {
    return (
      <Fragment>
        <h1>Searching something cool !</h1>
        <Form
          searchTerm={this.state.searchTerm}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
        <List hits={this.state.hits} />
      </Fragment>
    );
  }
}

export default App;
