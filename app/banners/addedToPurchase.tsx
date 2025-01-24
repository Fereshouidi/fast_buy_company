'use client';
import english from "@/app/languages/english.json";
import arabic from "@/app/languages/arabic.json";
import { LanguageSelectorContext } from "../contexts/LanguageSelectorContext";
import { useContext } from "react";
import { BannersContext } from "../contexts/banners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import '@/app/banners/style.css';


const PurchaseStatusBanner = () => {

    const bannerExist = useContext(BannersContext)?.purchaseStatusBanner;
    const setBannerExist = useContext(BannersContext)?.setPurchaseStatusBanner;
    const status = useContext(BannersContext)?.purchaseStatus;
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
                    {status == 201 ? <FontAwesomeIcon icon={faCheck} className="fa-check"/> : <FontAwesomeIcon icon={faBan} className="fa-ban"/>}
                    <p>{
                        activeLanguage == 'arabic' ?

                            status == 201 ?
                                arabic.addedToPurChaseSuccessP
                            : status == 404 ?
                                arabic.accountNotExistP
                            : status == 401 ?
                                arabic.passwordWrongP
                            : status == 0 ?
                                arabic.accountNotVerificateP
                            : ''
                            
                        : activeLanguage == 'english' ?

                            status == 201 ?
                                english.addedToPurChaseSuccessP
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
export default PurchaseStatusBanner;