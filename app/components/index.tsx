import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

require('../sass/styles.sass');

const data = [
  { id: '1', field1: 'a23djkjshd', field2: 'cukdokl' },
  { id: '5', field1: '23djkjshd', field2: '36cukdokl' },
  { id: '3', field1: 'a0023djkjshd', field2: '7cukdokl' },
  { id: '2', field1: '123djkjshd', field2: '167cukdokl' },
  { id: '4', field1: '9c3djkjshd', field2: '07cukdokl' },
];

const fields = Object.keys(data[0]);

// @ts-expect-error
const root = createRoot(document.getElementById('root'));
root.render(
  <App
    defaultSortKey="id"
    defaultSortAsc
    defaultData={data}
    fields={fields}
  />
);
