import React from 'react';
import { useTable, useGlobalFilter, useSortBy, Cell } from 'react-table';
import CopyText from './CopyText';
import GlobalFilter from './Search';
import TableRow from './TableRow';
import { ShortcutData } from './ShortcutPage';
import * as C from './Config';


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
  let className;
  const value = cell.value as string;
  const shortcutUrl = C.REDIRECT_BASE_URL + '/' + cell.row.cells[0].value;

  if (columnIndex === 0) {
    contents = <CopyText
      text={value}
      toCopy={shortcutUrl} />
  } else if (columnIndex === 1) {
    className = "shortcut-url";
    if (value.startsWith('http://') || value.startsWith('https://')) {
      // Link to value directly
      contents = <a href={value}>
        {value}
      </a>
    } else {
      // Might need special handling (like for 'crypto|'-links), so link to the shortcut
      contents = <a href={shortcutUrl}>
        {value}
      </a>
    }
  } else {
    contents = cell.render('Cell');
  }

  return <td className={className} {...cell.getCellProps()}>
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

    <table className="my-table" {...table.getTableProps()}>
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
          return <TableRow row={row} />
        })}
      </tbody>
    </table>
  </>
}
