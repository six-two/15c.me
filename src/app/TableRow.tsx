import React from 'react';
import { Row } from 'react-table';
import CopyText from './CopyText';
import { ShortcutData } from './ShortcutPage';
import * as C from './Config';


interface Props {
    row: Row<ShortcutData>,
}

export default function TableRow(props: Props) {
    const cells = props.row.cells;
    const shortcutKeys = cells[0].value as string[];
    const shortcutUrls = shortcutKeys.map(key => C.REDIRECT_BASE_URL + '/' + key);
    const shortcutValue = cells[1].value as string;
    let shortcutValueLink;
    if (shortcutValue.startsWith('http://') || shortcutValue.startsWith('https://')) {
        // It is a direct link, so the value can be used directly
        shortcutValueLink = shortcutValue;
    } else {
        // Might need special handling (like for 'crypto|'-links), so link to the shortcut
        shortcutValueLink = shortcutUrls[0];
    }

    return <tr {...props.row.getRowProps()}>
        <td {...cells[0].getCellProps()}>
            {shortcutKeys.map((text, index) =>
                <CopyText
                    key={index}
                    text={text}
                    toCopy={shortcutUrls[index]} />
            )}
        </td>
        <td className="shortcut-url" {...cells[1].getCellProps()}>
            <a href={shortcutValueLink}>
                {shortcutValue}
            </a>
        </td>
    </tr>
}
