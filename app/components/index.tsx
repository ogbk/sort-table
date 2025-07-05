import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
require('../sass/styles.sass');

const data = require('../utils/data.json');

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
