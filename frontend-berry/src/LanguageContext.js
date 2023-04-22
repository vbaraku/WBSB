import React, { useState, useCallback, useEffect } from 'react';
import { albanianDict, serbianDict, englishDict } from 'utils/dictionaries';

// import contentful

import * as contentful from 'contentful';
import axios from 'axios';

const client = contentful.createClient({
    space: 'fhx9ruex8qil',
    environment: 'master', // defaults to 'master' if not set
    accessToken: 'm8zMuGqGsLqukyEk6vNttPNIA_KcpofbOpnbpQOd6W0'
});

const LanguageContext = React.createContext();
const LanguageUpdateContext = React.createContext();

// const fetchLanguage = async (language) => {
//     const dict =
//     return dict;
// };

export const useLanguage = () => {
    const context = React.useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const useLanguageUpdate = () => {
    const context = React.useContext(LanguageUpdateContext);
    if (context === undefined) {
        throw new Error('useLanguageUpdate must be used within a LanguageProvider');
    }
    return context;
};

const getLanguageFromLocalStorage = () => {
    const language = localStorage.getItem('language');
    // check if language is in ['ALB', 'SRB', 'ENG']
    if (language === 'ALB' || language === 'SRB' || language === 'ENG') {
        return language;
    }
    return 'ALB';
};

export default function ThemeProvider({ children }) {
    const [language, setLanguage] = useState(getLanguageFromLocalStorage());

    async function getDictionary(language) {
        console.log(language);
        // return fetchLanguage(language);
        const dataKeys = {
            ENG: '7gxtZA2NNgDmwQG5XWYeRF',
            ALB: '43tie8cUoFzsbQhm4IZ7Jm',
            SRB: '5qSorYzgu0O9Y8SLwj50SV'
        };

        const data = await (await client.getEntry(dataKeys[language])).fields.webContent;
        console.log(data);
        return data;
        // if (language === 'ALB') {
        //     console.log(fetchLanguage(language));
        //     return fetchLanguage(language);
        // }
        // if (language === 'SRB') {
        //     return serbianDict;
        // }
        // if (language === 'ENG') {
        //     return englishDict;
        // }
        // return albanianDict;
    }

    const [dictionary, setDictionary] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDictionary(language);
            setDictionary(data);
        };
        fetchData();
    }, [language]);

    const changeLanguage = useCallback((language) => {
        setLanguage(language);
        const dictionary = getDictionary(language);
        setDictionary(dictionary);
        localStorage.setItem('language', language);
        window.location.reload();
    }, []);

    if (!dictionary) {
        return null;
    }

    return (
        <LanguageContext.Provider value={{ language, dictionary }}>
            <LanguageUpdateContext.Provider value={changeLanguage}>{children}</LanguageUpdateContext.Provider>
        </LanguageContext.Provider>
    );
}
