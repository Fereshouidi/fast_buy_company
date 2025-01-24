'use client';
import english from "@/app/languages/english.json";
import arabic from "@/app/languages/arabic.json";
import { LanguageSelectorContext } from "../contexts/LanguageSelectorContext";
import { useContext } from "react";
import { BannersContext } from "../contexts/banners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import '@/app/banners/style.css';

type statusParams = {
    status: number,
}
const LoginStatusBanner = ({status}: statusParams) => {

    const bannerExist = useContext(BannersContext)?.loginStatusBanner;
    const setBannerExist = useContext(BannersContext)?.setLoginStatusBanner;
    const activeLanguage = useContext(LanguageSelectorContext)?.activeLanguage;

    if(typeof bannerExist == 'undefined' || typeof setBannerExist == 'undefined'){
        return;
    }


    return (
        <div 
            className={bannerExist? ' banner-exist' : 'banner-not-exist'} 
            onClick={() => setBannerExist(false)}
        >
            
            <div className="banner">

                <div className="header"> <FontAwesomeIcon icon={faX} className="icon"/> </div>

                <div className="content"> 
                    <FontAwesomeIcon icon={faBan} className="fa-ban"/>
                    <p>{
                        activeLanguage == 'arabic' ?

                            status == 400 ?
                                arabic.formEmptyP
                            : status == 404 ?
                                arabic.accountNotExistP
                            : status == 401 ?
                                arabic.passwordWrongP
                            : status == 0 ?
                                arabic.accountNotVerificateP
                            : ''
                            
                        : activeLanguage == 'english' ?

                            status == 400 ?
                                english.formEmptyP
                            : status == 404 ?
                                english.accountNotExistP
                            : status == 401 ?
                                english.passwordWrongP
                                : status == 0 ?
                                english.accountNotVerificateP
                            : '' : ''
                        
                    }</p>
                </div>

            </div>
            
        </div>
    )
}
export default LoginStatusBanner;