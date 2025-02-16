'use client';

import { CSSProperties, useContext } from "react";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import SearchBar_ from "@/app/components/smallComponent/searchBar_forOrders";
import { OrderParams } from "@/app/contexts/order";

type params = {
    activeSection: 'processingSection' | 'failseSection' | 'successSection',
    setActiveSection: (value: 'processingSection' | 'failseSection' | 'successSection') => void
    allOrders: OrderParams[]
    setAllOrders: (value: OrderParams[]) => void
}
const SwitchSections = ({activeSection, setActiveSection, allOrders, setAllOrders}: params)=> {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;


    const style: CSSProperties = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 'var(--large-padding)',
        //paddingBottom: 0,
        borderRadius: '20px',
        //backgroundColor: 'red'
    }
    const styleSwitchControll: CSSProperties = {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //padding: 'var(--medium-padding)',
        paddingBottom: 0,
        borderRadius: '20px',
        //backgroundColor: 'blue'
    }
    
    const styleProcessing: CSSProperties = {
        width: 'calc(var(--double-width) /1.2)',
        textAlign: 'center',
        margin: 'var(--small-margin)',
        backgroundColor: activeSection == 'processingSection' ? primaryColor : 'var(--ashen-semi-transparent)',
        color: 'white',
        padding: 'var(--medium-padding) 0',
        borderRadius: '50px',
        cursor: 'pointer'
    }
    const styleFailed: CSSProperties = {
        width: 'calc(var(--double-width) /1.2)',
        textAlign: 'center',
        margin: 'var(--small-margin)',
        backgroundColor: activeSection == 'failseSection' ? primaryColor : 'var(--ashen-semi-transparent)',
        color: 'white',
        padding: 'var(--medium-padding) 0',
        borderRadius: '50px',
        cursor: 'pointer'
    }
    const styleSuccess: CSSProperties = {
        width: 'calc(var(--double-width) /1.2)',
        textAlign: 'center',
        margin: 'var(--small-margin)',
        backgroundColor: activeSection == 'successSection' ? primaryColor : 'var(--ashen-semi-transparent)',
        color: 'white',
        padding: 'var(--medium-padding) 0',
        borderRadius: '50px',
        cursor: 'pointer'
    }
    return (
        <div style={style}>

            <div style={styleSwitchControll}>
                <h5 style={styleProcessing} onClick={() => setActiveSection('processingSection')}>{activeLanguage?.orderStatus.processingW}</h5>
                <h5 style={styleFailed} onClick={() => setActiveSection('failseSection')}>{activeLanguage?.orderStatus?.failedW}</h5>
                <h5 style={styleSuccess} onClick={() => setActiveSection('successSection')}>{activeLanguage?.orderStatus?.deliveredW}</h5>
            </div>

            <SearchBar_ allOrders={allOrders} setAllOrders={setAllOrders} activeSection={activeSection} />

        </div>
    )
}
export default SwitchSections;