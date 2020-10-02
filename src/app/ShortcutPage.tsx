import React, { useState, useEffect } from 'react';
import Table from './Table';
import * as C from './Config';


export interface ShortcutData {
    shortcuts: string[],
    url: string,
}

const columns = [
    {
        Header: 'Shortcut(s)',
        accessor: 'shortcuts',
    },
    {
        Header: 'Destination URL',
        accessor: 'url',
    },
];

async function fetchShortcutData(url: string): Promise<ShortcutData[]> {
    try {
        const response = await fetch(url);
        const json = await response.json();
        const data = [];
        for (const key of Object.keys(json)) {
            let values = json[key];
            if (!Array.isArray(values)) {
                values = [values];
            }
            data.push({ shortcuts: values, url: key });
        }
        return data;
    } catch (error) {
        console.error(`Failed to fetch "${url}"`, error);
        return [{ shortcuts: ['ERROR'], url: 'Failed to fetch the shortcut file' }];
    }
}

export default function ShortcutPage() {
    const [data, setData] = useState<ShortcutData[]>([
        { shortcuts: ['INFO'], url: 'Loading data...' }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchShortcutData(C.SHORTCUT_FILE_URL);
            setData(data);
        };

        fetchData();
    }, []);

    return <Table columns={columns} data={data} />
}
