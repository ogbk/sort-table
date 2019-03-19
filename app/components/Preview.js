// @flow

import React from 'react';
import type { Fields } from './App';

const Preview = ({
  rowData: {
    id,
    field1,
    field2,
  },
}: {rowData: Fields}) => (
  <div id="preview">
    <h2>{ id }</h2>
    <br />
    <h4>field1: { field1 }</h4>
    <br />
    <h4>field2: { field2 }</h4>
  </div>
);

export default Preview;
