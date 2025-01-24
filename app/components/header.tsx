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
    return (
        <header>

            <div className='logo'>
                <img src={companyInformation.logo} alt="logo" />
                <h3>{
                    activeLanguage?.language == 'arabic' ?
                    companyInformation.name.arabic :
                    companyInformation.name.english
                
                }</h3>
            </div>

            <div className='navigation'>
                <h5 style={{color: activePage.activePage == 'Statistics' ? companyInformation.primaryColor : ''}} onClick={() => activePage.setActivePage("Statistics")}>{activeLanguage?.StatisticsW}</h5>
                <h5 style={{color: activePage.activePage == 'productsManagement' ? companyInformation.primaryColor : ''}} onClick={() => activePage.setActivePage("productsManagement")}>{activeLanguage?.productsManagementW}</h5>
                <h5 style={{color: activePage.activePage == 'ordersManagement' ? companyInformation.primaryColor : ''}} onClick={() => activePage.setActivePage("ordersManagement")}>{activeLanguage?.ordersManagementW}</h5>
                <h5 style={{color: activePage.activePage == 'CustomersManagement' ? companyInformation.primaryColor : ''}} onClick={() => activePage.setActivePage("CustomersManagement")}>{activeLanguage?.CustomersManagementW}</h5>
                <h5 style={{color: activePage.activePage == 'AdminsManagement' ? companyInformation.primaryColor : ''}} onClick={() => activePage.setActivePage("AdminsManagement")}>{activeLanguage?.AdminsManagementW}</h5>
                <h5 style={{color: activePage.activePage == 'CompanyManagement' ? companyInformation.primaryColor : ''}} onClick={() => activePage.setActivePage("CompanyManagement")}>{activeLanguage?.CompanyManagementW}</h5>
            </div>

            <div className='setting-container'>
                <ThemeToggleIcon className='theme-toggle'/>
                <FontAwesomeIcon icon={faGear} style={styleFaGear} onClick={handleParamSection}/>
                <ParamSection id='param-section'/>
            </div>

        </header>
    )
}

export default Header;