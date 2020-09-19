import React, { useState } from 'react';
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


export default function EncryptLink() {
    const [password, setPassword] = useState('password');
    const [url, setUrl] = useState('https://example.com');

    const encrypted = encrypt(password, url);
    // dont use base64, since it requires more space
    // use single quotes to prevent ugly escaping of quotes (which also takes space)
    const useThisValue = 'crypto|' + encrypted.toString().replace(/"/g, '\'');


    return (
        <div className="encrypt-link">
            <TextField
                label="Password"
                value={password}
                setValue={setPassword} />
            <TextField
                label="URL"
                value={url}
                setValue={setUrl} />
            <div className="output">
                <div className="label">Encrypted URL</div>
                <div className="value">
                    {useThisValue}
                </div>
            </div>
        </div>
    )
}
