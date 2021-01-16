import React from 'react';
import Localizer, { DEFAULT_LANG } from './Localizer';


interface Props {
    children: any,
}

interface LanguageContextData {
    lang: string,
    setLang: (newValue: string) => void,
}

const defaultLanguageContextData: LanguageContextData = {
    lang: DEFAULT_LANG,
    setLang: (newLang: string) => { console.warn(`Failed to change language to "${newLang}": No context was provided (and the app fell back to the default data)`) },
};

export const LanguageContext = React.createContext(defaultLanguageContextData);

export default function ContextLocalizer(props: Props) {
    const [lang, setLang] = React.useState(DEFAULT_LANG);
    const contextData: LanguageContextData = { lang, setLang };
    return <LanguageContext.Provider value={contextData}>
        <Localizer lang={lang}>
            {props.children}
        </Localizer>
    </LanguageContext.Provider>
}