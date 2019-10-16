// @flow

import React, { Component } from 'react';
import Preview from './Preview';
// import { basicSortObjects } from '../utils/sortBasic';
import { sortObjects } from '../utils/sortAlphaNum';

export type Fields = {
  id: string,
  field1: string,
  field2: string
};

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
  showRowData: boolean,
  selectedRow: Fields,
  selectedRowId: string,
  symbolAsc: {
    true: string,
    false: string
  },
};

export default class App extends Component<Props, State> {
  handleSort: (string) => void;

  handleSelectedRow: (Fields) => void;

  constructor({ defaultSortKey, defaultSortAsc, defaultData }: Props) {
    super();
    this.state = {
      sortKey: defaultSortKey,
      sortAsc: defaultSortAsc,
      data: sortObjects(defaultData, defaultSortKey, defaultSortAsc),
      symbolAsc: {
        true: '\u25B2',
        false: '\u25BC',
      },
      showRowData: false,
      selectedRow: {},
      selectedRowId: '',
    };

    this.handleSort = this.handleSort.bind(this);
    this.handleSelectedRow = this.handleSelectedRow.bind(this);
  }

  handleSort(newSortKey: string): void {
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
      sortAsc,
      data: stateData,
      symbolAsc,
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
                propsFields.map((fieldName) => (
                  <th
                    key={`th_${fieldName}`}
                    className={fieldName === stateSortKey ? 'click selected-sort-bar' : 'click'}
                    onClick={() => { this.handleSort(fieldName); }}
                  >
                    {fieldName}
                    {fieldName === stateSortKey ? symbolAsc[String(sortAsc)] : ' '}
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
                      propsFields.map((fieldName) => (
                        <td key={`field_${fieldName}`}>
                          {row[fieldName]}
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
          stateShowRowData
          && <Preview rowData={stateSelectedRow} />
        }
      </div>
    );
  }
}
