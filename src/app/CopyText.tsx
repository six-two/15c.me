import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import TimeoutComponent from './TimeoutComponent';
import * as C from './Config';
import { FormattedMessage } from 'react-intl';


interface Props {
    text: string,
    toCopy?: string,
}

export default function CopyText(props: Props) {
    const toCopy = props.toCopy || props.text;
    const [showToast, setShowToast] = useState(false);

    return <div className="copy-text">
        <CopyToClipboard
            text={toCopy}
            onCopy={() => setShowToast(true)}>
            <span className="text">
                {props.text}
            </span>
        </CopyToClipboard>

        {showToast &&
            <div className="toast">
                <TimeoutComponent
                    onComplete={() => setShowToast(false)}
                    timeoutSeconds={C.TOAST_TIMEOUT} />
                <FormattedMessage id="copied" />:<br />
                {props.toCopy}
            </div>
        }
    </div>
}
