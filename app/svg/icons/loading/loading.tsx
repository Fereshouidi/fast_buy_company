'use client';
import { CSSProperties, useContext } from 'react';
import './loading.css';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';

type params = {
    className?: string,
    style?: CSSProperties
}
const LoadingIcon = ({className}: params) => {

    
    const companyInformation = useContext(CompanyInformationContext);

    const styleLoadingIcon: CSSProperties = {
        borderTop: `2px solid ${companyInformation?.primaryColor}`,
        borderRight: `2px solid ${companyInformation?.primaryColor}`,
    }
    return (
        <div id='container' className={className} >
            <div id='loadingIcon' style={styleLoadingIcon}></div>
        </div>
    )
}
export default LoadingIcon;