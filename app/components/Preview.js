import React from 'react';
import { string, shape } from 'prop-types';

const Preview = ({ row }) => (
  <div id="preview">
    <h2>{ row.id }</h2>
    <br />
    <h4>field1: { row.field1 }</h4>
    <br />
    <h4>field2: { row.field2 }</h4>
  </div>
);

export default Preview;

Preview.propTypes = {
  row: shape({
    id: string.isRequired,
    field1: string.isRequired,
    field2: string.isRequired,
  }).isRequired,
};
