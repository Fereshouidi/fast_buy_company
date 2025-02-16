'use client';
import { CSSProperties, useContext } from 'react';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';
import { useRouter } from 'next/navigation';
import { activeLanguageContext, activeLanguageParams } from '@/app/contexts/activeLanguage';

const Logo = () => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const companyInformations = useContext(CompanyInformationContext);
    const router = useRouter();

    const goToHomePage = () => {
        router.push('/')
    }

    const style: CSSProperties = {
        cursor: 'pointer',
        color: 'var(--black)',
        fontSize: 'var(--small-size)'

    }
    return (
        <div style={style} className='logo' onClick={goToHomePage}>
            <img 
                src={companyInformations?.logo}
                alt="Logo"   
            />
            <h1>{companyInformations ? activeLanguage?.language == 'arabic' ? companyInformations.name?.arabic : companyInformations.name?.english : null}</h1>
        </div>
    )
}
export default Logo;
