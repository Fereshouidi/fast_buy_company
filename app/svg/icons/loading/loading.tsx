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
        borderTopColor: companyInformation?.primaryColor,
        borderRightColor: companyInformation?.primaryColor,
    }
    return (
        <div  className={className} >
            <div id='loadingIcon' style={styleLoadingIcon}></div>
        </div>
    )
}
export default LoadingIcon;