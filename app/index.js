import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

require('./sass/styles.sass');

const fields = [
  'id', 'field1', 'field2',
];

const data = [
  { id: '1', field1: 'a23djkjshd', field2: 'cukdokl' },
  { id: '5', field1: '23djkjshd', field2: '36cukdokl' },
  { id: '3', field1: 'a0023djkjshd', field2: '7cukdokl' },
  { id: '2', field1: '123djkjshd', field2: '167cukdokl' },
  { id: '4', field1: '9c3djkjshd', field2: '07cukdokl' },
];

render(
  <App
    sortKey={'field1'}
    defaultSortAsc
    data={data}
    fields={fields}
  />,
  window.document.getElementById('root'),
);
