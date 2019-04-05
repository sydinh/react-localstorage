import React, { memo } from 'react';

const Form = memo(props => (
  <form onSubmit={props.onSubmit}>
    <input
      type="search"
      placeholder="Type to search"
      name="searchTerm"
      value={props.searchTerm}
      onChange={props.onChange}
      ref={props.inputRef}
    />
    <button type="submit">Search</button>
  </form>
));

export default Form;
