"use client";
import { CSSProperties, useContext } from "react";
import Logo from "./components/logo/logo";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";

const Header = () => {
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;


    const headerStyle :CSSProperties = {
        position: 'fixed',
        top: '0',
        zIndex: '999',
        width: '100vw',
        height: 'var(--header-height)',
        backgroundColor: 'var(--white)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 2%',
        boxSizing: 'border-box',
        boxShadow: '0 5px 15px var(--black-almost-transparnt)',
        direction: activeLanguage?.language == 'english'? 'ltr':activeLanguage?.language == 'arabic'? 'rtl': 'ltr',
    }
    return(
        <>
            <header style={headerStyle} className="header">
                <Logo/>
                <div style={{width: '50%'}}></div>
            </header>
        </>
    )
}
export default  Header;

