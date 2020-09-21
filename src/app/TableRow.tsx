import React from 'react';
import { useTable, useGlobalFilter, useSortBy, Cell, Row } from 'react-table';
import CopyText from './CopyText';
import GlobalFilter from './Search';
import { ShortcutData } from './ShortcutPage';
import * as C from './Config';


interface Props {
    row: Row<ShortcutData>,
}

export default function TableRow(props: Props) {
    const cells = props.row.cells;
    const shortcutKey = cells[0].value as string;
    const shortcutKeyUrl = C.REDIRECT_BASE_URL + '/' + shortcutKey;
    const shortcutValue = cells[1].value as string;
    let shortcutValueLink;
    if (shortcutValue.startsWith('http://') || shortcutValue.startsWith('https://')) {
        // It is a direct link, so the value can be used directly
        shortcutValueLink = shortcutValue;
    } else {
        // Might need special handling (like for 'crypto|'-links), so link to the shortcut
        shortcutValueLink = shortcutKeyUrl;
    }

    return <tr {...props.row.getRowProps()}>
        <td {...cells[0].getCellProps()}>
            <CopyText
                text={shortcutKey}
                toCopy={shortcutKeyUrl} />
        </td>
        <td className="shortcut-url" {...cells[1].getCellProps()}>
            <a href={shortcutValueLink}>
                {shortcutValue}
            </a>
        </td>
    </tr>
}
