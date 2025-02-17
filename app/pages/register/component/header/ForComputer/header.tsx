"use client";
import { CSSProperties, useContext } from "react";
import Logo from "./components/logo/logo";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeToggleIcon from "@/app/svg/icons/themeToggle";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import ParamSection from "@/app/components/paramSection";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { ActivePageContext } from "@/app/contexts/activePage";
import { paramSectionContext } from "@/app/contexts/paramSection";

const Header = () => {
    const companyInformation = useContext(CompanyInformationContext);
    const activePage = useContext(ActivePageContext);
    const paramSection = useContext(paramSectionContext);
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;

    const handleParamSection = () => {
        paramSection.setContainerExist(!paramSection.containerExist);
        paramSection.setExist(!paramSection.exist);
    }

    const styleFaGear: CSSProperties = {
        fontSize: 'calc(var(--big-size) /1.2)',
        margin: 'var(--medium-margin)',
        color: 'var(--almost-black)',
    }
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

                <div className='setting-container'>
                <ThemeToggleIcon className='theme-toggle'/>
                {/* <FontAwesomeIcon icon={faGear} style={styleFaGear} onClick={handleParamSection}/> */}
                {/* <ParamSection id='param-section'/> */}
            </div>
            
            </header>
        </>
    )
}
export default  Header;

