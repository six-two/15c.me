import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import TimeoutComponent from './TimeoutComponent';
import * as C from './Config';


interface Props {
    text: string,
    toCopy?: string,
}

export default function CopyText(props: Props) {
    const toCopy = props.toCopy || props.text;
    const [showToast, setShowToast] = useState(false);

    return <div className="copy-text">
        <div className="text">
            {props.text}
        </div>
        <div className="button">
            <CopyToClipboard
                text={toCopy}
                onCopy={() => setShowToast(true)}>
                <button>Copy</button>
            </CopyToClipboard>
        </div>
        {showToast &&
            <div className="toast">
                <TimeoutComponent
                    onComplete={() => setShowToast(false)}
                    timeoutSeconds={C.TOAST_TIMEOUT} />
                URL copied
            </div>
        }
    </div>
}
