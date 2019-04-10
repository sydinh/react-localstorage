import React, { Fragment, memo } from 'react';

const List = memo(({ hits }) => {
  if (hits.length === 0) return <p>No result found !</p>;

  return hits.map(item => (
    <Fragment key={item.objectID}>
      <p>{item.title}</p>
    </Fragment>
  ));
});

export default List;
