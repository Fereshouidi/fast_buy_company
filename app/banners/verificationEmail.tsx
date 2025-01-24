'use client';
import english from "@/app/languages/english.json";
import arabic from "@/app/languages/arabic.json";
import { LanguageSelectorContext } from "../contexts/LanguageSelectorContext";
import { useContext } from "react";
import { BannersContext } from "../contexts/banners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import '@/app/banners/style.css';

const VerificatinEmailBanner = () => {

    const bannerExist = useContext(BannersContext)?.verificatinEmailBanner;
    const setBannerExist = useContext(BannersContext)?.setVerificatinEmailBanner;
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
                    <p className="verification-p">{
                        activeLanguage == 'arabic' ?
                            arabic.verificationMessage
                        :   english.verificationMessage
                    }</p>
                </div>

            </div>
            
        </div>
    )
}
export default VerificatinEmailBanner;