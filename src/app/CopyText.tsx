import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import TimeoutComponent from './TimeoutComponent';

interface Props {
    text: string,
    toCopy?: string,
}

export default function CopyText(props: Props) {
    const toCopy = props.toCopy || props.text;
    const [isCopied, setCopied] = useState(false);

    return <div className="copy-text">
        <div className="text">
            {props.text}
        </div>
        <div className="button">
            <CopyToClipboard
                text={toCopy}
                onCopy={() => setCopied(true)}>
                <button>Copy</button>
            </CopyToClipboard>
        </div>
        {isCopied &&
            <div className="toast">
                <TimeoutComponent
                    onComplete={() => setCopied(false)}
                    timeoutSeconds={3} />
                URL copied
            </div>
        }
    </div>
}
