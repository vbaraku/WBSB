import React, { useState, useCallback, useEffect } from 'react';
import { albanianDict, serbianDict, englishDict } from 'utils/dictionaries';

const LanguageContext = React.createContext();
const LanguageUpdateContext = React.createContext();

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

export default function ThemeProvider({ children }) {
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'ALB');

    function getDictionary(language) {
        if (language === 'ALB') {
            return albanianDict;
        }
        if (language === 'SRB') {
            return serbianDict;
        }
        if (language === 'ENG') {
            return englishDict;
        }
        return albanianDict;
    }

    const [dictionary, setDictionary] = useState(getDictionary(language));

    const changeLanguage = useCallback((language) => {
        setLanguage(language);
        const dictionary = getDictionary(language);
        setDictionary(dictionary);
        localStorage.setItem('language', language);
        window.location.reload();
    }, []);

    return (
        <LanguageContext.Provider value={{ language, dictionary }}>
            <LanguageUpdateContext.Provider value={changeLanguage}>{children}</LanguageUpdateContext.Provider>
        </LanguageContext.Provider>
    );
}
