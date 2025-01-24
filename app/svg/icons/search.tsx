import React, { useState, useContext, CSSProperties } from 'react';
import { LanguageSelectorContext } from '@/app/contexts/LanguageSelectorContext';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';


const SearchIcon = () => {

    const [hover, setHover] = useState(false);

    const context = useContext(LanguageSelectorContext);
    const companyInformation = useContext(CompanyInformationContext)

    if (!context) {
        throw new Error("LanguageSelector must be used within a LanguageSelectorContext.Provider");
    }

    const { activeLanguage } = context;

    

    const style: CSSProperties = {
        position: 'absolute',
        right: activeLanguage === 'english' ? '5px' : activeLanguage === 'arabic'? 'calc(100% - 45px)': '5px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--white)',
        backgroundColor: 'var(--black)',
        width: 'calc(var(--primary-height) - 10px)',
        height: 'calc(var(--primary-height) - 10px)',
        padding: '5px 7px 5px 3px',
        fontSize: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: '0.3s ease',
    }
    
    const styleHover = {
        ... style,
        backgroundColor: `${companyInformation?.primaryColor}`,
    }

    return(
        <svg 
            className="search-icon primary-border" 
            style={hover? styleHover: style} 
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 18 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round">
            <circle cx="10" cy="10" r="7" />
            <line x1="15" y1="15" x2="22" y2="22" />
        </svg>




    )
}
export default SearchIcon;
