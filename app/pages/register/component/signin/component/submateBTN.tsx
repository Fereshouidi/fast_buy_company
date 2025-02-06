'use client';
import english from '@/app/languages/english.json';
import arabic from '@/app/languages/arabic.json';
import { LanguageSelectorContext } from '@/app/contexts/LanguageSelectorContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties, use, useContext, useRef } from 'react';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';
import { formDataParams } from '@/app/contexts/signinFormData';
import { BannersContext } from '@/app/contexts/banners';
import { sendActivationToken, sendActivationTokenForAdmin, updateAdminById } from '@/app/crud';
import { createAccount } from '@/app/crud';
import { useRouter } from 'next/navigation';
import { LoadingIconContext } from '@/app/contexts/loadingIcon';
import { darken } from 'polished';
import { AdminDataParam } from '@/app/contexts/adminData';
import { BannerContext } from '@/app/contexts/bannerForEverything';
import { activeLanguageContext } from '@/app/contexts/activeLanguage';



type Params = {
    formData: AdminDataParam
    setFormData: (data: AdminDataParam | ((prev: AdminDataParam) => AdminDataParam)) => void;
    adminData: AdminDataParam
    setAdminData: (value: AdminDataParam) => void
}

const SubmateBTN = ({formData, adminData, setAdminData}: Params) => {

    const router = useRouter();
    
    //const activeLanguage = useContext(LanguageSelectorContext)?.activeLanguage;
    const companyInformationContext = useContext(CompanyInformationContext);
    const setPasswordsNotMatchExist = useContext(BannersContext)?.setPasswordsNotMatch;
    const setEmailNotValidBanner = useContext(BannersContext)?.setemailNotValide;
    const setVerificationBanner = useContext(BannersContext)?.setVerificatinEmailBanner;
    const loadingIconContext = useContext(LoadingIconContext);
    const setBanner = useContext(BannerContext)?.setBanner;
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;

    const btnRef = useRef<HTMLDivElement | null>(null);



    const randomActivationCode = Math.round(Math.random() * 10000);

    const handleClick = async() => {

        if(btnRef.current){
            btnRef.current.style.backgroundColor = darken(0.1,  companyInformationContext?.primaryColor || '');
            setTimeout(() => {
                if (btnRef.current) {
                    btnRef.current.style.backgroundColor = companyInformationContext?.primaryColor || '';
                }
            }, 100);
        }

        loadingIconContext?.setExist(true);

        if(formData.password !== formData.retypePassword){
            setBanner(true, activeLanguage?.passwordsDoNotMatch,'fail');
            //alert('PasswordsNotMatch')
            loadingIconContext?.setExist(false);
            return;
        }
        
        
        const isActivationTokenSended = await sendActivationTokenForAdmin(
            formData.email, 
            formData.name, 
            companyInformationContext?.email, 
            companyInformationContext?.password, 
            activeLanguage?.language, 
            randomActivationCode
        );

        if(!isActivationTokenSended){
            setBanner(true, activeLanguage?.emailNotValid,'fail');
            loadingIconContext?.setExist(false);
            return;
        }

        await updateAdminById({
            ...adminData, 
            ...formData,
            token: randomActivationCode
        })


        setBanner(true, activeLanguage?.verificationMessage,'fail');
        loadingIconContext?.setExist(false)
        return;
    
        
    }

    const style: CSSProperties = {
        backgroundColor: companyInformationContext?.primaryColor,
        margin: '10px'
    }
    
    return (
        <div style={style} className='submate-btn' onClick={handleClick} ref={btnRef}>

            <FontAwesomeIcon icon={faRightToBracket}/>

            <span>{english.confirmW}</span>

        </div>
    )
}
export default SubmateBTN