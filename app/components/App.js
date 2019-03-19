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
  selectedRow: any,
  selectedRowId: string,
  ascSymbol: string,
  descSymbol: string,
  sortSymbol: string

};

export default class App extends Component<Props, State> {
  handleSelectedRow: (any) => void;
  handleSort: (string) => void;

  constructor({ sortKey, sortAsc, data }) {
    super();
    this.state = {
      sortKey,
      sortAsc,
      data: sortObjects(data, sortKey, sortAsc),
      selectedRow: null,
      selectedRowId: '',
      ascSymbol: '\u25B2',
      descSymbol: '\u25BC',
      sortSymbol: sortAsc ? '\u25B2' : '\u25BC',
    };

    this.handleSort = this.handleSort.bind(this);
    this.handleSelectedRow = this.handleSelectedRow.bind(this);
  }

  handleSort(chosenSortKey) {
    const newSortKey = chosenSortKey;

    // set to default values
    let newSortAsc = this.props.sortAsc;
    let newSortSymbol = (newSortAsc ? this.state.ascSymbol : this.state.descSymbol);

    // copy stored data
    let newData = [...(this.state.data)];

    // sortKey = same, but
    // - sortAsc, sortSymbol = changed (NOT default values)
    if (chosenSortKey === this.state.sortKey) {
      newSortAsc = !(this.state.sortAsc);
      newSortSymbol = (this.state.sortAsc ? this.state.descSymbol : this.state.ascSymbol);

      // only reverse array (because sortKey hasn't changed)
      newData = newData.reverse();
    } else {
    // sortKey = changed, so
    // - sortAsc, sortSymbol = set to default values

      // re-order data based on new sortKey
      newData = sortObjects(newData, newSortKey, newSortAsc);
    }

    this.setState({
      sortKey: chosenSortKey,
      sortAsc: newSortAsc,
      sortSymbol: newSortSymbol,
      data: newData,
    });
  }

  handleSelectedRow(row) {
    this.setState({
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
                    className={stateSortKey === fieldName ? 'click selected-sort-bar' : 'click'}
                    onClick={() => { this.handleSort(fieldName); }}
                  >
                    {fieldName} {stateSortKey === fieldName ? stateSortSymbol : ' '}
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
                    className={stateSelectedRowId === (rowId) ? 'click clicked-row' : 'click'}
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
          stateSelectedRow &&
          <Preview rowData={stateSelectedRow} />
        }
      </div>
    );
  }
}
