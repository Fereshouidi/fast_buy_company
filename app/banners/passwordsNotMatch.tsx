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

const PasswordsNotMatchBanner = () => {

    const bannerExist = useContext(BannersContext)?.passwordsNotMatch;
    const setBannerExist = useContext(BannersContext)?.setPasswordsNotMatch;
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
                            arabic.passwordsDoNotMatch
                        :   english.passwordsDoNotMatch
                    }</p>
                </div>

            </div>
            
        </div>
    )
}
export default PasswordsNotMatchBanner;