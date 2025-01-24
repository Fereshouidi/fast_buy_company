'use client';
import LightModeIcon from "./lightMode";
import DarkModeIcon from "./darkMode";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { LanguageSelectorContext } from "@/app/contexts/LanguageSelectorContext";
import { SideBarContext } from "@/app/contexts/SideBarContext";
import { CSSProperties, useContext, useEffect, useState } from "react";

type params = {
    className?: string
}
const ThemeToggleIcon = ({className}: params) => {

    const themeContext = useContext(ThemeContext);
    const languageContext = useContext(LanguageSelectorContext);
    const sideBarContext = useContext(SideBarContext);
    const [iconPlace, setIconPlace] = useState('');

    if(!themeContext){
        throw 'error themeContext !'
    }
    if(!languageContext){
        throw 'error languageContext !'
    }
    if(!sideBarContext){
        throw 'error sideBarContext !'
    }

    const {theme, setTheme} = themeContext;

    useEffect(() => {
        if(themeContext.theme == 'light'){
            setTheme('light');
        }else if(themeContext.theme == 'dark'){
            setTheme('dark');
        }else{
            setTheme('light');
        }
        localStorage.setItem('activeTheme', themeContext.theme)
    }, [themeContext])

    useEffect(() => {
        const storedTheme = localStorage.getItem('activeTheme');
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    const handleToggleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setTheme(theme == 'light' ? 'dark' : theme == 'dark' ? 'light' : 'light');
    }

    const styleToggle: CSSProperties = {
        width: 'var(--primary-width)',
        backgroundColor: 'var(--almost-white)',
        border: 'var(--border-width) solid var(--border-color)',
        borderRadius: '50px',
        opacity: sideBarContext.sideBarExist ? '1' : '0',
        transition: '0.3s',
    }

    useEffect(() => {
        
        if(languageContext.activeLanguage == 'arabic'){
             if(theme == 'light' ){
                setIconPlace('3px 3px 3px 3px') 
             }else if(theme == 'dark' ){
                setIconPlace('3px 19px 3px 3px') 
             } else{
                setIconPlace('3px 19px 3px 3px')
             }
        }else{
            if(theme == 'light' ){
                setIconPlace('3px') 
            }else if(theme == 'dark' ){
                setIconPlace('3px 3px 3px 19px') 
            }else{
                setIconPlace('3px 3px 3px 3px')
            }
        }

    }, [languageContext.activeLanguage, theme])
    
        


    const styleIcon: CSSProperties = {
        margin: iconPlace,
        backgroundColor: 'var(--white)',
        color: 'var(--black)',
        padding: '5px',
        width: '25px',
        height: '25px',
        border: 'var(--border-width) solid var(--border-color)',
        borderRadius: '50px',
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        objectFit: 'contain',
        transition: '0.3s ease',
    }

    return(
        <div  style={styleToggle} className={`toggle ${className}`} onClick={(e) => handleToggleClick(e)}>
            <div style={styleIcon}>{
                theme == 'light'? <LightModeIcon/>
                : theme == 'dark' ? <DarkModeIcon/>
                : <LightModeIcon/>    
            }</div>
        </div>
    )
}
export default ThemeToggleIcon;