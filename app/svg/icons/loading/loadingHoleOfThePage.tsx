'use client';
import { CSSProperties, useContext } from 'react';
import './loading.css';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';
import { LoadingIconContext } from '@/app/contexts/loadingIcon';

const LoadingIcon_theHolePage = () => {

    
    const companyInformation = useContext(CompanyInformationContext);
    const exist = useContext(LoadingIconContext)?.exist;

    const styleLoadingIcon: CSSProperties = {
        borderTop: `5px solid ${companyInformation?.primaryColor}`,
        // borderRight: `5px solid ${companyInformation?.primaryColor}`,
    }
    return (
        <div id='x' className={exist? 'container-of-loading-icon-hole-page' : 'invisible'} >
            <div id='loadingIcon' style={styleLoadingIcon}></div>
        </div>
    )
}
export default LoadingIcon_theHolePage;