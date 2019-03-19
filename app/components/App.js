// @flow

import React, { Component } from 'react';
import Preview from './Preview';
import { sortObjects } from '../utils/sortAlphaNum';

export type Fields = {
  id: string,
  field1: string,
  field2: string
};

type Props = {
  fields: Array<'id' | 'field1' | 'field2'>,
  data: Array<Fields>,
  sortKey: string,
  sortAsc: boolean
};

type State = {
  sortKey: string,
  sortAsc: boolean,
  data: Array<Fields>,
  showRowData: boolean,
  selectedRow: Fields,
  selectedRowId: string,
  ascSymbol: string,
  descSymbol: string,
  sortSymbol: string

};

export default class App extends Component<Props, State> {
  handleSort: (string) => void;
  handleSelectedRow: (Fields) => void;

  constructor({ sortKey, sortAsc, data }: Props) {
    super();
    this.state = {
      sortKey,
      sortAsc,
      data: sortObjects(data, sortKey, sortAsc),
      showRowData: false,
      selectedRow: {},
      selectedRowId: '',
      ascSymbol: '\u25B2',
      descSymbol: '\u25BC',
      sortSymbol: sortAsc ? '\u25B2' : '\u25BC',
    };

    this.handleSort = this.handleSort.bind(this);
    this.handleSelectedRow = this.handleSelectedRow.bind(this);
  }

  handleSort(newSortKey: string): void {
    const { sortAsc: defaultSortAsc } = this.props;
    const { ascSymbol, descSymbol, sortKey, data, sortAsc } = this.state;

    // default values - applied if sortKey changes
    let newSortAsc = defaultSortAsc;
    let newSortSymbol = (defaultSortAsc ? ascSymbol : descSymbol);

    // copy stored data
    let copyData = [...data];

    if (newSortKey === sortKey) {
      // SAME -- sortKey
      // TOGGLE -- sortAsc, sortSymbol

      newSortAsc = !(sortAsc);
      newSortSymbol = (sortAsc ? descSymbol : ascSymbol);
      copyData.reverse();
    } else {
      // CHANGED -- sortKey , so ->
      // set to DEFAULT VALUES -- sortAsc, sortSymbol

      copyData = sortObjects(copyData, newSortKey, newSortAsc);
    }

    this.setState({
      sortKey: newSortKey,
      sortAsc: newSortAsc,
      sortSymbol: newSortSymbol,
      data: copyData,
    });
  }

  handleSelectedRow(row: Fields): void {
    this.setState({
      showRowData: true,
      selectedRow: row,
      selectedRowId: row.id,
    });
  }

  render() {
    const { fields: propsFields } = this.props;
    const {
      sortKey: stateSortKey,
      sortSymbol: stateSortSymbol,
      data: stateData,
      showRowData: stateShowRowData,
      selectedRow: stateSelectedRow,
      selectedRowId: stateSelectedRowId,
    } = this.state;

    return (
      <div id="app">
        <table>
          <caption> list </caption>
          <thead>
            <tr>
              {
                propsFields.map(fieldName => (
                  <th
                    key={`th_${fieldName}`}
                    className={fieldName === stateSortKey ? 'click selected-sort-bar' : 'click'}
                    onClick={() => { this.handleSort(fieldName); }}
                  >
                    {fieldName} {fieldName === stateSortKey ? stateSortSymbol : ' '}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              stateData.map((row) => {
                const { id: rowId } = row;
                return (
                  <tr
                    key={`row_${rowId}`}
                    className={rowId === stateSelectedRowId ? 'click clicked-row' : 'click'}
                    onClick={() => { this.handleSelectedRow(row); }}
                  >
                    {
                      propsFields.map(fieldName => (
                        <td key={`field_${fieldName}`}> {row[fieldName]} </td>
                      ))
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        {
          stateShowRowData &&
          <Preview rowData={stateSelectedRow} />
        }
      </div>
    );
  }
}
