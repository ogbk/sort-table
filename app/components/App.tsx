import React, { Component } from 'react';
import Preview from './Preview.tsx';
// import { basicSortObjects } from '../utils/sortBasic';
import { sortObjects } from '../utils/sortAlphaNum.ts';
import type {Fields} from '../utils/types';



type Props = {
  fields: Array<'id' | 'field1' | 'field2'>,
  defaultData: Array<Fields>,
  defaultSortKey: string,
  defaultSortAsc: boolean
};

type State = {
  sortKey: string,
  sortAsc: boolean,
  data: Array<Fields>,
  previewOn: boolean,
  selectedRow: Fields,
  symbolAsc: {
    true: string,
    false: string
  },
};

export default class App extends Component<Props, State> {
  state:State = (() => {
    const { defaultSortKey, defaultSortAsc, defaultData } = this.props;
    return {
      sortKey: defaultSortKey,
      sortAsc: defaultSortAsc,
      data: sortObjects(defaultData, defaultSortKey, defaultSortAsc),
      symbolAsc: {
        true: '\u25B2',
        false: '\u25BC',
      },
      previewOn: false,
      selectedRow: {},
    };
  })();


  sortByColumn = (newSortKey: string): void => {
    const { defaultSortAsc, defaultData } = this.props;
    const {
      sortKey: currentSortKey,
      sortAsc: currentSortAsc,
      data: currentData,
    } = this.state;

    if (currentSortKey === newSortKey) {
      this.setState({
        sortAsc: !currentSortAsc,
        data: currentData.reverse(),
      });
    } else {
      this.setState({
        sortAsc: defaultSortAsc,
        sortKey: newSortKey,
        data: sortObjects(defaultData, newSortKey, defaultSortAsc),
      });
    }
  }

  showPreview = (row: Fields): void => {
    this.setState({
      previewOn: true,
      selectedRow: row,
    });
  }

  render() {
    const { fields: columns } = this.props;
    const {
      sortKey,
      sortAsc,
      data,
      symbolAsc,
      previewOn,
      selectedRow,
    } = this.state;

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
                    className={columnName === sortKey ? 'click selected-sort-bar' : 'click'}
                    onClick={() => { this.sortByColumn(columnName); }}
                  >
                    {columnName}
                    {columnName === sortKey ? symbolAsc[String(sortAsc)] : ' '}
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
                    className={rowId === selectedRow.id ? 'click clicked-row' : 'click'}
                    onClick={() => { this.showPreview(row); }}
                  >
                    {
                      columns.map((columnName) => (
                        <td key={`field_${columnName}`}>
                          {row[columnName]}
                        </td>
                      ))
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        {
          previewOn
          && <Preview rowData={selectedRow} />
        }
      </div>
    );
  }
}
