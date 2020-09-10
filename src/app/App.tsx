import React, {useState, useEffect} from 'react';
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

interface ShortcutData {
  name: string,
  url: string,
}

fetch('/sc.json')
.then(function (response) {
  // response.text().then(text => console.debug('sc.json:', text));//DBG
  return response.json();
})
.then(function (json_data) {
  console.debug('sc.json', json_data)
  
  })
  .catch(function (err) {
    
  });

async function fetchShortcutData(url: string): Promise<ShortcutData[]> {
  try {
    const response = await fetch(url);
    const json = await response.json();
    const data = [];
    for (let name of Object.keys(json)) {
      data.push({name, url: json[name]});
    }
    return data;
  } catch (error) {
    console.error(`Failed to fetch "${url}"`, error);
    return [{name: 'ERROR', url: 'Failed to fetch the shortcut file'}];
  }
}

// --------------------------- TODOs -------------------------------
// -----------------------------------------------------------------

export default function App() {
  const [data, setData] = useState<ShortcutData[]>([{name: 'INFO', url: 'Loading data...'}]);
 
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShortcutData('https://15c.me/sc.json');
      setData(data);
    };
 
    fetchData();
  }, []);

  return (
    <div className="my-table">
      <Table columns={columns} data={data} />
    </div>
  )
}
