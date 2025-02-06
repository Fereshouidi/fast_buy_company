'use client';
import english from '@/app/languages/english.json';
import arabic from '@/app/languages/arabic.json';
import { LanguageSelectorContext } from '@/app/contexts/LanguageSelectorContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties, useContext, useRef } from 'react';
// import { CompanyInformationContext } from '@/app/contexts/companyInformation';
import { adminLogIn } from '@/app/crud';
import { formParams } from '../loginForm';
// import { BannersContext } from '@/app/contexts/banners';
import { useRouter } from 'next/navigation';
import { darken } from 'polished';
import { LoadingIconContext } from '@/app/contexts/loadingIcon';
import '@/app/pages/register/component/style.css';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';
import { BannerContext } from '@/app/contexts/bannerForEverything';

const SubmateBTN = ({form}: {form: formParams}) => {
    
    const activeLanguage = useContext(LanguageSelectorContext)?.activeLanguage;
    const setBanner = useContext(BannerContext)?.setBanner;
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    // const companyInformationContext = useContext(CompanyInformationContext)
    // const bannersContext = useContext(BannersContext);

    const companyInformationContext = useContext(CompanyInformationContext);
    
    const router = useRouter();

    const btnRef = useRef<HTMLDivElement | null>(null);


    const handleClick = async() => {

        if(btnRef.current){
            btnRef.current.style.backgroundColor = darken(0.1,  companyInformationContext?.primaryColor || '');
            setTimeout(() => {
                if (btnRef.current) {
                    btnRef.current.style.backgroundColor = companyInformationContext?.primaryColor || '';
                }
            }, 100);
        }
        setLoadingIcon(true);

        const adminData = await adminLogIn(form.userName, form.password);

        if(adminData.status == 400){

            setLoadingIcon(false);
            setBanner(true, 'account not found !');
            return;

        }if(adminData.status == 404){

            setLoadingIcon(false);
            setBanner(true, 'account not found !');
            return;

        }else if(adminData.status == 401){

            setLoadingIcon(false);
            setBanner(true, 'password is wrong !');
            return;

        }else if(adminData){

            localStorage.setItem('adminData', adminData._id);
            console.log(localStorage.getItem('adminData'));
            router.push('/');
            //return;

        }

        
        //localStorage.setItem('adminData', JSON.stringify(adminData.data));
        setLoadingIcon(false);

        
    }



    const style: CSSProperties = {
        backgroundColor: companyInformationContext?.primaryColor
    }
    
    return (
        <div style={style} className='submate-btn' onClick={handleClick} ref={btnRef}>

            <FontAwesomeIcon icon={faRightToBracket}/>

            <span>{
                activeLanguage == 'english' ?
                    english.loginW
                : activeLanguage == 'arabic' ?
                    arabic.loginW
                : english.loginW
            }</span>

        </div>
    )
}
export default SubmateBTN