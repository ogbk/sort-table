import React, { Component } from 'react';
import { string, shape, arrayOf, oneOf, bool } from 'prop-types';
import Preview from './Preview';
import { sortObjects } from '../utils/sortAlphaNum';

export default class App extends Component {
  constructor({ sortKey, defaultSortAsc, data }) {
    super();
    this.state = {
      sortKey,
      sortAsc: defaultSortAsc,
      data: sortObjects(data, sortKey, defaultSortAsc),
      selectedRow: null,
      selectedRowId: '',
      ascSymbol: '\u25B2',
      descSymbol: '\u25BC',
      sortSymbol: defaultSortAsc ? '\u25B2' : '\u25BC',
    };

    this.handleSort = this.handleSort.bind(this);
    this.handleSelectedRow = this.handleSelectedRow.bind(this);
  }

  handleSort(chosenSortKey) {
    const newSortKey = chosenSortKey;

    // set to default values
    let newSortAsc = this.props.defaultSortAsc;
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


  /* =========== render ============ */

  render() {
    return (
      <div id="app">
        <table>
          <caption> list </caption>
          <thead>
            <tr>
              {
                this.props.fields.map(_field => (
                  <th
                    key={`th_${_field}`}
                    className={this.state.sortKey !== _field ? 'click' : 'click selected-sort-bar'}
                    onClick={() => { this.handleSort(_field); }}
                  >
                    {_field} {this.state.sortKey !== _field ? ' ' : this.state.sortSymbol}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(row => (
                <tr
                  key={`row_${row.id}`}
                  className={this.state.selectedRowId !== (row.id) ? 'click' : 'click clicked-row'}
                  onClick={() => { this.handleSelectedRow(row); }}
                >
                  <td> {row.id} </td>
                  <td> {row.field1} </td>
                  <td> {row.field2} </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          this.state.selectedRow &&
          <Preview row={this.state.selectedRow} />
        }
      </div>
    );
  }
}


App.propTypes = {
  data: arrayOf(
    shape({
      id: string.isRequired,
      field1: string.isRequired,
      field2: string.isRequired,
    }),
  ).isRequired,
  fields: arrayOf(string).isRequired,
  sortKey: oneOf(['id', 'field1', 'field2']).isRequired,
  defaultSortAsc: bool.isRequired,
};
