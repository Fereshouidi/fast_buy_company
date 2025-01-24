'use client';
import { useContext } from "react";
import { BannerContext } from "../contexts/bannerForEverything";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import '@/app/banners/style.css';

const Banner = () => {

    const bannerExist = useContext(BannerContext)?.bannerexist;
    const bannerText = useContext(BannerContext)?.bannerText;
    const bannerStatus = useContext(BannerContext)?.bannerStatus;
    const setBanner = useContext(BannerContext)?.setBanner;

    if(!bannerExist || !bannerText || !setBanner){
        return;
    }

    return (
        <div 
            className={bannerExist? 'banner-exist' : 'banner-exist'}
            onClick={() => setBanner(false, '')}
        >
            <div className="banner">

            <div className="header"> <FontAwesomeIcon icon={faX} className="icon"/> </div>

            <div className="content"> 
                <p className="verification-p">
                    {bannerStatus == 'success' ? 
                        <FontAwesomeIcon icon={faCheck}/> :
                    bannerStatus == 'fail' ?
                        <FontAwesomeIcon icon={faBan}/> :
                    null
                    }
                    {bannerText}
                </p>
            </div>

            </div>
        </div>
    )
}
export default Banner;