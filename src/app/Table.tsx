import React from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import GlobalFilter from './Search';
import TableRow from './TableRow';
import { ShortcutData } from './ShortcutPage';


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
        {table.headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column, index) => {
              return <th {...column.getHeaderProps((column as any).getSortByToggleProps())} key={index}>
                {column.render('Header')}
                {renderSortArrow(column as any)}
              </th>
            })}
          </tr>
        ))}
      </thead>
      <tbody {...table.getTableBodyProps()}>
        {table.rows.map((row, index) => {
          table.prepareRow(row);
          return <TableRow key={index} row={row} />
        })}
      </tbody>
    </table>
  </>
}
