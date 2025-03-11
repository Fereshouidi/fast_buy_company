'use client';
import './style.css';
import { CompanyInformationContext } from '../contexts/companyInformation';
import { activeLanguageContext } from '../contexts/activeLanguage';
import { CSSProperties, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import ThemeToggleIcon from '../svg/icons/themeToggle';
import ParamSection from './paramSection';
import { paramSectionContext } from '../contexts/paramSection';
import { ActivePageContext } from '../contexts/activePage';
import english from '@/app/languages/english.json';
import LanguageSelector from './smallComponent/language';


const Header = () => {

    const companyInformation = useContext(CompanyInformationContext);
    const activePage = useContext(ActivePageContext);
    const paramSection = useContext(paramSectionContext);
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage || english;

    const handleParamSection = () => {
        paramSection.setContainerExist(!paramSection.containerExist);
        paramSection.setExist(!paramSection.exist);
    }

    const styleFaGear: CSSProperties = {
        fontSize: 'calc(var(--big-size) /1.2)',
        margin: 'var(--medium-margin)',
        color: 'var(--almost-black)',
    }
    return (
        <header>

            <div className='logo'>
                <img src={companyInformation.logo} alt="logo" />
                <h3>{
                    activeLanguage?.language == 'arabic' ?
                    companyInformation.name?.arabic ?? '' :
                    companyInformation.name?.english?? ''?? ''
                
                }</h3>
            </div>

            <div className='navigation'>
                <h5 style={{color: activePage.activePage == 'statistics' ? companyInformation.primaryColor : ''}} onClick={() => activePage.setActivePage("statistics")}>{activeLanguage?.StatisticsW}</h5>
                <h5 style={{color: activePage.activePage == 'productsManagement' ? companyInformation.primaryColor : ''}} onClick={() => activePage.setActivePage("productsManagement")}>{activeLanguage?.productsManagementW}</h5>
                <h5 style={{color: activePage.activePage == 'ordersManagement' ? companyInformation.primaryColor : ''}} onClick={() => activePage.setActivePage("ordersManagement")}>{activeLanguage?.ordersManagementW}</h5>
                <h5 style={{color: activePage.activePage == 'customersManagement' ? companyInformation.primaryColor : ''}} onClick={() => activePage.setActivePage("customersManagement")}>{activeLanguage?.CustomersManagementW}</h5>
                <h5 style={{color: activePage.activePage == 'adminsManagement' ? companyInformation.primaryColor : ''}} onClick={() => activePage.setActivePage("adminsManagement")}>{activeLanguage?.AdminsManagementW}</h5>
                <h5 style={{color: activePage.activePage == 'companyManagement' ? companyInformation.primaryColor : ''}} onClick={() => activePage.setActivePage("companyManagement")}>{activeLanguage?.CompanyManagementW}</h5>
            </div>

            <div className='setting-container'>
                {/* <FontAwesomeIcon icon={faGear} style={styleFaGear} onClick={handleParamSection}/> */}

                <ThemeToggleIcon className='theme-toggle'/>
                <div style={{width: '10px'}}></div>
                <LanguageSelector/>


                {/* <ParamSection id='param-section'/> */}
            </div>

        </header>
    )
}

export default Header;