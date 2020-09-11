import React from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import GlobalFilter from './Search';
import {ShortcutData} from './App';

interface Props {
  columns: any[],
  data: ShortcutData[],
}

function Table(props: Props) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: props.columns,
      data: props.data,
    },
    useGlobalFilter,
    useSortBy
  ) as any;

  return (
    <>
      <GlobalFilter
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any, rowIndex: number) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any, columnIndex: number) => {
                  let contents = cell.render('Cell');
                  if (columnIndex === 1) {
                    if (cell.value.startsWith('http://') || cell.value.startsWith('https://')) {
                      // Link to value directly
                      contents = <a href={cell.value}>{cell.value}</a>
                    } else {
                      // Might need spacial handling (like for 'crypto|'-links), so link to the shortcut
                      const shortcut = '/' + row.cells[0].value
                      contents = <a href={shortcut}>{cell.value}</a>
                    }
                  }
                  return <td {...cell.getCellProps()}>{contents}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table