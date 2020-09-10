import React from 'react';
import '../css/main.scss';
import Table from './Table';

const columns = [
  {
    Header: 'Shortcut Name',
    accessor: 'name',
  },
  {
    Header: 'Redirect URL',
    accessor: 'url',
  },
];

const data = [
  {
    name: 'me',
    url: 'https://six-two.dev',
  },
  {
    name: 'p',
    url: 'https://projects.six-two.dev'
  },
];


// --------------------------- TODOs -------------------------------
// -----------------------------------------------------------------

export default function App() {
  return (
    <div className="my-table">
      <Table columns={columns} data={data} />
    </div>
  )
}
