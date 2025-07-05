import React, { useState } from 'react';
import Preview from './Preview.tsx';
// import { basicSortObjects } from '../utils/sortBasic';
import { sortObjects } from '../utils/sortAlphaNum.ts';
import type {Fields} from '../utils/types';

const initialData: Array<Fields> = require('../utils/data.json');
const columns = Object.keys(initialData[0]);

const App = () => {
  const [sortAsc, setSortAsc] = useState(true);
  const [sortColumn, setSortColumn] = useState(columns[0]);
  const [data, setData] = useState<Array<Fields>>(sortObjects(initialData, sortColumn, sortAsc));
  const [selectedRow, setSelectedRow] = useState<Fields>();

  const symbolAsc = {
    'true': '\u25B2',
    'false': '\u25BC',
  };

  const sortByColumn = (selectedColumn: string) => {
    const newSortAsc = ((sortColumn !== selectedColumn) || !sortAsc);
    const newData = sortObjects(data, selectedColumn, newSortAsc);

    if (newSortAsc !== sortAsc) {
      setSortAsc(newSortAsc);
    };

    if(selectedColumn !== sortColumn) {
      setSortColumn(selectedColumn);
    };

    setData(newData);
  }

  return (
    <div id="app">
      <table>
        <caption> list </caption>
        <thead>
          <tr>
            {
              columns.map((columnName) => (
                <th
                  key={`th_${columnName}`}
                  className={columnName === sortColumn ? 'click selected-sort-bar' : 'click'}
                  onClick={() => { sortByColumn(columnName); }}
                >
                  {columnName}
                  
                  { //@ts-ignore-error
                    columnName === sortColumn ? symbolAsc[String(sortAsc)] : ' '
                  }
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((row) => {
              const { id: rowId } = row;
              return (
                <tr
                  key={`row_${rowId}`}
                  className={rowId === selectedRow?.id ? 'click clicked-row' : 'click'}
                  onClick={() => { setSelectedRow(row); }}
                >
                  {
                    columns.map((columnName) => (
                      <td key={`field_${columnName}`}>
                        {
                          //@ts-ignore-error 
                          row[columnName]
                        }
                      </td>
                    ))
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
      { !!selectedRow && <Preview rowData={selectedRow} /> }
    </div>
  );
};

export default App;
