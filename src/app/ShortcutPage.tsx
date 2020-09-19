import React, { useState, useEffect } from 'react';
import Table from './Table';

export interface ShortcutData {
    name: string,
    url: string,
}

const SHORTCUT_URL = 'https://15c.me/sc.json';

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

async function fetchShortcutData(url: string): Promise<ShortcutData[]> {
    try {
        const response = await fetch(url);
        const json = await response.json();
        const data = [];
        for (let name of Object.keys(json)) {
            data.push({ name, url: json[name] });
        }
        return data;
    } catch (error) {
        console.error(`Failed to fetch "${url}"`, error);
        return [{ name: 'ERROR', url: 'Failed to fetch the shortcut file' }];
    }
}

export default function ShortcutPage() {
    const [data, setData] = useState<ShortcutData[]>([{ name: 'INFO', url: 'Loading data...' }]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchShortcutData(SHORTCUT_URL);
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
