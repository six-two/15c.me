import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { encrypt } from 'sjcl';


interface TextFieldProps {
    label: string,
    value: string,
    setValue: (newValue: string) => void,
}

function TextField(props: TextFieldProps) {
    return <div className="text-field">
        <div className="label">
            {props.label}
        </div>
        <div className="value">
            <div className="wrapper">
                <input
                    value={props.value}
                    onChange={e => props.setValue(e.target.value)} />
            </div>
        </div>
    </div>
}

interface OutputRowProps {
    url: string,
    password: string,
}

const OutputRow = (props: OutputRowProps) => {
    let valueDom;
    if (!props.password) {
        valueDom = <span className="red">
            {'ERROR: Password can not be empty'}
        </span>
    } else if (!props.url) {
        valueDom = <span className="red">
            {'ERROR: URL can not be empty'}
        </span>
    } else {
        const encrypted = encrypt(props.password, props.url);
        // dont use base64, since it requires more space
        // use single quotes to prevent ugly escaping of quotes (which also takes space)
        const outputString = 'crypto|' + encrypted.toString().replace(/"/g, '\'');
        valueDom = <span>{outputString}</span>
    }
    return <div className="output">
        <div className="label"><FormattedMessage id="encrypted_url" /></div>
        <div className="value">
            {valueDom}
        </div>
    </div>
}


export default function EncryptLink() {
    const [password, setPassword] = useState('monkey123');
    const [url, setUrl] = useState('https://example.com');
    const intl = useIntl();

    return <>
        <h1><FormattedMessage id="encrypt_link_page" /></h1>
        <div className="encrypt-link">
            <TextField
                label={intl.formatMessage({ id: "password" })}
                value={password}
                setValue={setPassword} />
            <TextField
                label={intl.formatMessage({ id: "url" })}
                value={url}
                setValue={setUrl} />
            <OutputRow
                password={password}
                url={url.trim()} />
        </div>
    </>
}
