import React from 'react';
import { useTable, useGlobalFilter, useSortBy, Cell } from 'react-table';
import GlobalFilter from './Search';
import {ShortcutData} from './App';

interface Props {
  columns: any[],
  data: ShortcutData[],
}

const renderSortArrow = (column: any) => {
  if (column.isSorted) {
    return <span>{column.isSortedDesc ? ' 🔽' : ' 🔼'}</span>;
  } else {
    return null;
  }
}

const renderCell = (cell: Cell<ShortcutData, any>, columnIndex: number) => {
  let contents;
  if (columnIndex === 1) {
    const value = cell.value as string;
    if (value.startsWith('http://') || value.startsWith('https://')) {
      // Link to value directly
      contents = <a href={value}>{value}</a>;
    } else {
      // Might need spacial handling (like for 'crypto|'-links), so link to the shortcut
      const shortcut = '/' + cell.row.cells[0].value;
      contents = <a href={shortcut}>{value}</a>;
    }
  } else {
    contents = cell.render('Cell');
  }

  return <td {...cell.getCellProps()}>
    {contents}
  </td>;
}

export default function Table(props: Props) {
  const table = useTable(
    {
      columns: props.columns,
      data: props.data,
    },
    useGlobalFilter,
    useSortBy
  );

  return <>
    <GlobalFilter
      globalFilter={(table.state as any).globalFilter}
      setGlobalFilter={(table as any).setGlobalFilter}
    />

    <table {...table.getTableProps()}>
      <thead>
        {table.headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              return <th {...column.getHeaderProps((column as any).getSortByToggleProps())}>
                {column.render('Header')}
                {renderSortArrow(column as any)}
              </th>
            })}
          </tr>
        ))}
      </thead>
      <tbody {...table.getTableBodyProps()}>
        {table.rows.map(row => {
          table.prepareRow(row);
          return <tr {...row.getRowProps()}>
            {row.cells.map(renderCell)}
          </tr>
        })}
      </tbody>
    </table>
  </>
}
