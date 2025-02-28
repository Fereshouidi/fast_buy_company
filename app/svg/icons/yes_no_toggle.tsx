'use client';
import LightModeIcon from "./lightMode";
import DarkModeIcon from "./darkMode";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { LanguageSelectorContext } from "@/app/contexts/LanguageSelectorContext";
import { CSSProperties, MouseEventHandler, useContext, useEffect, useState } from "react";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";

type params = {
    className?: string
    value: boolean
    setValue?: (value: boolean) => void
    onClick?: MouseEventHandler<HTMLDivElement>
}
const YesNoToggle = ({className, value, setValue, onClick}: params) => {

    const themeContext = useContext(ThemeContext);
    const languageContext = useContext(LanguageSelectorContext);
    const [iconPlace, setIconPlace] = useState('');
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    // const [value, setValue] = useState<boolean>(false);
    
    if(!themeContext){
        throw 'error themeContext !'
    }
    if(!languageContext){
        throw 'error languageContext !'
    }


    // const {theme, setTheme} = themeContext;

    // useEffect(() => {
    //     if(themeContext.theme == 'light'){
    //         setTheme('light');
    //     }else if(themeContext.theme == 'dark'){
    //         setTheme('dark');
    //     }else{
    //         setTheme('light');
    //     }
    //     localStorage.setItem('activeTheme', themeContext.theme)
    // }, [themeContext])

    // useEffect(() => {
    //     const storedTheme = localStorage.getItem('activeTheme');
    //     if (storedTheme) {
    //         setTheme(storedTheme);
    //     }
    // }, []);

    const handleToggleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        // setTheme(theme == 'light' ? 'dark' : theme == 'dark' ? 'light' : 'light');
        setValue(!value);
    }

    const styleToggle: CSSProperties = {
        width: 'var(--primary-width)',
        backgroundColor: 'var(--almost-white)',
        border: 'var(--border-width) solid var(--border-color)',
        borderRadius: '50px',
        opacity: true ? '1' : '0',
        //transition: '0.3s',
    }

    useEffect(() => {
        
        if(activeLanguage?.language == 'arabic'){
             if(value ){
                setIconPlace('3px 19px 3px 3px') 
             }else {
                setIconPlace('3px 3px 3px 3px') 
             } 
        }else{
            if(value ){
                setIconPlace('3px 3px 3px 19px') 
            }else {
                setIconPlace('3px') 
            }
        }

    }, [activeLanguage, value])
    
    useEffect(() => {
        // alert(value);
    }, [value])


    const styleIcon: CSSProperties = {
        margin: iconPlace,
        backgroundColor: value ? 'var(--black)' : 'var(--ashen-semi-transparent)',
        color:  value ? 'var(--white)' : 'black',
        padding: '5px',
        width: '25px',
        height: '25px',
        border: 'var(--border-width) solid var(--border-color)',
        borderRadius: '50px',
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        objectFit: 'contain',
        // transition: 'all 0.3s ease',
        transition: 'color 0s, background-color 0s, all 0.3s ease',
        fontSize: '10px'
    }

    return(
        <div  style={styleToggle} className={`toggle ${className}`} onClick={onClick}>
            <div style={styleIcon}>{
                value ? <div>{activeLanguage?.yesW}</div>
                :  <div>{activeLanguage?.noW}</div>
            }</div>
        </div>
    )
}
export default YesNoToggle;