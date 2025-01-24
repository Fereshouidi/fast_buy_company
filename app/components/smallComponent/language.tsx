'use client';
import english from '@/app/languages/english.json';
import arabic from '@/app/languages/arabic.json';
import { useEffect, useState, useContext, CSSProperties } from 'react';
import { LanguageSelectorContext } from '@/app/contexts/LanguageSelectorContext';
import { SideBarContext } from '@/app/contexts/SideBarContext';
import LanguageIcon from '@/app/svg/icons/language';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';
import { ActiveLanguageContext } from '@/app/contexts/activeLanguage';

const LanguageSelector = () => {


    const companyInformation = useContext(CompanyInformationContext)
    const context = useContext(LanguageSelectorContext);
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);
    const [isHover, setIsHover] = useState<boolean>(false)

    const activeLanguage_ = useContext(ActiveLanguageContext);

    const sideBarContext = useContext(SideBarContext);

    if (!context) {
        throw new Error("LanguageSelector must be used within a LanguageSelectorContext.Provider");
    }
    if (!sideBarContext) {
        throw new Error("error sideBarContext !");
    }

    const { activeLanguage, setActiveLanguage } = context;

    const handleLanguage = (value: React.ChangeEvent<HTMLSelectElement>) => {
        const languageSelected = value.target.value;
        localStorage.setItem('activeLanguage', languageSelected);
        setActiveLanguage(languageSelected);
        activeLanguage_?.setAtiveLanguage(languageSelected === 'arabic' ? arabic : english);
        localStorage.setItem('activeLanguage_', JSON.stringify(languageSelected === 'arabic' ? arabic : english));
    }

    useEffect(() => {
        const storedLanguage = localStorage.getItem('activeLanguage');
        if (storedLanguage) {
            setActiveLanguage(storedLanguage);
        }
    }, []);

    const handleMouseEnter = (value: string) => {
        setHoveredOption(value);
    };

    const handleMouseLeave = () => {
        setHoveredOption(null);
    };


    const styleLi: CSSProperties = {
        display: sideBarContext.sideBarExist? 'flex': 'none',
        alignItems: 'center',
        fontWeight: 'var(--font-weight-semi-bold)',
    }

    const styleSelector: CSSProperties = {
        width: '100%',
        height: '100%',
        outline: 'none',
        border: 'none',
        cursor: 'pointer',
        margin: 'var(--small-margin)',
        color: 'var(--black)',
        backgroundColor: 'var(--whie)',
    }

    const getOptionStyle = (optionValue: string): CSSProperties => ({
        backgroundColor: hoveredOption === optionValue ? `${companyInformation?.primaryColor}` : 'var(--white)',
        outline: 'none',
    });

    const styleHover: CSSProperties = {
        ...styleLi,
        backgroundColor: companyInformation?.primaryColor,
        color: 'var(--white)',

    }
    return(
        <li style={isHover? styleHover : styleLi} 
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        > 
            <LanguageIcon/>
            <select name="languageSelector" 
            id="languageSelector" 
            value={activeLanguage} 
            onChange={(event) => handleLanguage(event)}
            style={styleSelector}
        >
            <option 
                style={getOptionStyle('english')} 
                onMouseEnter={() => handleMouseEnter('english')} 
                onMouseLeave={handleMouseLeave} 
                value="english">english
            </option>
            <option 
                style={getOptionStyle('arabic')} 
                onMouseEnter={() => handleMouseEnter('arabic')} 
                onMouseLeave={handleMouseLeave} 
                value="arabic">العربية
            </option>
        </select>
        </li>
    )
}
export default LanguageSelector;