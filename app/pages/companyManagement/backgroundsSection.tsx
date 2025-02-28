'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { BannerContext } from "@/app/contexts/bannerForEverything";
import { backgroundsPages, companyInformationsParams } from "@/app/contexts/companyInformation";
import { discountCodeParams } from "@/app/contexts/discountCode";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import { faCheck, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useRef, useState } from "react";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { uploadImage } from "@/app/crud";
import LoadingIcon from "@/app/svg/icons/loading/loading";

type Params = {
    exist: boolean
    setExist: (value: boolean) => void
    companyInformation: companyInformationsParams
    setCompanyInformation: (value: companyInformationsParams) => void
}


const BackgroundsSection = ({exist, setExist, companyInformation, setCompanyInformation}: Params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [changeHappen, setChangeHappen] = useState<boolean>(false);
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    const setBanner = useContext(BannerContext)?.setBanner;
    const [loadingImage, setLoadingImage] = useState<{homePage: Boolean, ordersPage: Boolean, profile: Boolean, registerPage: Boolean, shoppingCartPage: boolean}>({homePage: false, ordersPage: false, profile: false, registerPage: false, shoppingCartPage: false});
    // const companyInformation = useContext(CompanyInformationContext);
    const [backgrouds, setBackgrounds] = useState<backgroundsPages | undefined>(companyInformation?.backgroundsPages?? undefined);
    const imagesRef = useRef<(HTMLInputElement | null)[]>(Array(5).fill(null));


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'homePage' | 'ordersPage' | 'profile' | 'registerPage' | 'shoppingCartPage') => {
        
        const file = e.target.files?.[0]; 
        if (!file) return;
    
        if (!file.type.startsWith("image/")) {
            alert("The selected file is not an image!");
            return;
        }
    
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const result = event.target?.result;
                if (typeof result === "string") {
                    setLoadingImage({...loadingImage, [target]: true});
                    const uploadedImageUrl = await uploadImage(result);
                    if (uploadedImageUrl) {
                        setBackgrounds({
                            ...backgrouds,
                            [target]: uploadedImageUrl
                        })
                        setLoadingImage({...loadingImage, [target]: false});
                        setChangeHappen(true);
                    }
                } else {
                    alert("The type of this picture is unsuitable!");
                }
            } catch (error) {
                console.error("Error loading image:", error);
            }
        };
    
        reader.readAsDataURL(file);
        
    }
    
    const handleDone = () => {
        setCompanyInformation({
            ...companyInformation,
            backgroundsPages: backgrouds
        })
        setExist(false)
    }

    return (
        <div className={exist ? 'backgrouns-container-section' : 'invisible'}>
             
            <div id="backgrouns-section">

                <header className="header"> 

                    <div className="handling-item" 
                        style={{
                            backgroundColor: changeHappen? 'green' : '',
                            color: changeHappen? 'white' : ''
                        }}
                        onClick={handleDone}
                    >
                        {activeLanguage?.doneW}
                            <FontAwesomeIcon 
                            icon={faCheck} 
                            className="done-icon"
                        />
                    </div>

                    <h4>{activeLanguage?.BackgroundsW}</h4>

                    <div className="x" onClick={() => setExist(false)}>
                        <FontAwesomeIcon icon={faX}/>
                    </div>

                </header>

                <section id="backgrounds-management-section" className="scroll">
                    
                    <div className="backgrounds-div" onClick={() => imagesRef.current[0]?.click()}>
                        <img src={backgrouds?.homePage} alt="" />
                        <h4 className="sub-tittle">{activeLanguage?.homePageW}</h4>
                        <input
                            type="file"
                            className='input-file' 
                            ref={(el) => { imagesRef.current[0] = el; }}
                            onChange={(e) => handleImageChange(e, 'homePage')}
                        />
                        {loadingImage?.homePage && <LoadingIcon className={'Loading-icon-'}/>}
                    </div>

                    <div className="backgrounds-div" onClick={() => imagesRef.current[1]?.click()}>
                        <img src={backgrouds?.registerPage} alt="" />
                        <h4 className="sub-tittle">{activeLanguage?.registerPageW}</h4>
                        <input
                            type="file"
                            className='input-file' 
                            ref={(el) => { imagesRef.current[1] = el; }}
                            onChange={(e) => handleImageChange(e, 'registerPage')}
                        />
                        {loadingImage?.registerPage && <LoadingIcon className={'Loading-icon-'}/>}
                    </div>
                    
                    <div className="backgrounds-div" onClick={() => imagesRef.current[2]?.click()}>
                        <img src={backgrouds?.ordersPage} alt="" />
                        <h4 className="sub-tittle">{activeLanguage?.ordersPageW}</h4>
                        <input
                            type="file"
                            className='input-file' 
                            ref={(el) => { imagesRef.current[2] = el; }}
                            onChange={(e) => handleImageChange(e, 'ordersPage')}
                        />
                        {loadingImage?.ordersPage && <LoadingIcon className={'Loading-icon-'}/>}
                    </div>

                    <div className="backgrounds-div" onClick={() => imagesRef.current[3]?.click()}>
                        <img src={backgrouds?.accountPage} alt="" />
                        <h4 className="sub-tittle">{activeLanguage?.accountPageW}</h4>
                        <input
                            type="file"
                            className='input-file' 
                            ref={(el) => { imagesRef.current[3] = el; }}
                            onChange={(e) => handleImageChange(e, 'profile')}
                        />
                        {loadingImage?.profile && <LoadingIcon className={'Loading-icon-'}/>}
                    </div>

                    <div className="backgrounds-div" onClick={() => imagesRef.current[4]?.click()}>
                        <img src={backgrouds?.shoppingCartPage} alt="" />
                        <h4 className="sub-tittle">{activeLanguage?.shoppingCartPageW}</h4>
                        <input 
                            type="file" 
                            className='input-file' 
                            ref={(el) => { imagesRef.current[4] = el; }}
                            onChange={(e) => handleImageChange(e, 'shoppingCartPage')}
                        />
                        {loadingImage?.shoppingCartPage && <LoadingIcon className={'Loading-icon-'}/>}
                    </div>

                </section>
                

            </div>

        </div>
    )
}
export default BackgroundsSection;