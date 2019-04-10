import React, { Component, Fragment } from 'react';

import Form from './components/Form';
import List from './components/List';
import Loading from './components/Loading';

class App extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      searchTerm: '',
      hits: [],
      loading: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSetSearchResult = this.onSetSearchResult.bind(this);
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });

    const { searchTerm: query } = this.state;
    if (query === '') {
      this.setState({ loading: false });
      return;
    }

    const cachedHits = localStorage.getItem(query);
    if (cachedHits) {
      this.setState({ hits: JSON.parse(cachedHits), loading: false });
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
    } finally {
      this.setState({ loading: false });
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
          inputRef={this.inputRef}
        />
        <Loading loading={this.state.loading} />
        <List hits={this.state.hits} searchTerm={this.state.searchTerm} />
      </Fragment>
    );
  }
}

export default App;
