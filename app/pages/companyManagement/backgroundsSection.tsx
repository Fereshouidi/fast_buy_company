'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { backgroundsPages, companyInformationsParams } from "@/app/contexts/companyInformation";
import { faCheck, faPen, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { uploadImage } from "@/app/crud";
import LoadingIcon from "@/app/svg/icons/loading/loading";
import defaultImage from '@/app/images/خلفية-رمادي-فاتح-سادة.jpg';

type Params = {
    exist: boolean
    setExist: (value: boolean) => void
    companyInformation: companyInformationsParams
    setCompanyInformation: (value: companyInformationsParams) => void
}


const BackgroundsSection = ({exist, setExist, companyInformation, setCompanyInformation}: Params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [changeHappen, setChangeHappen] = useState<boolean>(false);
    const [loadingImage, setLoadingImage] = useState<{homePage: Boolean, ordersPage: Boolean, accountPage: Boolean, registerPage: Boolean, shoppingCartPage: boolean}>({homePage: false, ordersPage: false, accountPage: false, registerPage: false, shoppingCartPage: false});
    const [backgrouds, setBackgrounds] = useState<backgroundsPages | undefined>(companyInformation?.backgroundsPages?? undefined);
    const imagesRef = useRef<(HTMLInputElement | null)[]>(Array(5).fill(null));
    const [imageSelected, setImageSelected] = useState<number>(NaN);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'homePage' | 'ordersPage' | 'accountPage' | 'registerPage' | 'shoppingCartPage') => {
                
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

    const handleDeleteBtn = () => {
    
        if (!backgrouds || isNaN(imageSelected)) return;
    
        const keys = ['homePage', 'registerPage', 'ordersPage', 'accountPage', 'shoppingCartPage'];
        setBackgrounds((prev) => ({
            ...prev!,
            [keys[imageSelected]]: '',
        }));

        setChangeHappen(true);
    };
    

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

                    <div className="handling">
                    
                    <div className="handling-item" 
                        style={{
                            backgroundColor: imageSelected >= 0? 'red' : '',
                            color: imageSelected >= 0? 'white' : ''
                        }}
                        onClick={handleDeleteBtn}
                    >
                        {activeLanguage?.deleteW}
                            <FontAwesomeIcon 
                            icon={faTrash} 
                            className="delete-icon"
                        />
                    </div>

                    <div 
                        className="handling-item"
                        style={{
                            backgroundColor: imageSelected >= 0 ? 'var(--black)' : '',
                            color: imageSelected >= 0 ? 'var(--white)' : ''
                        }}  
                        onClick={() => imageSelected >= 0 && imagesRef.current[imageSelected].click()}
                    >
                        {activeLanguage?.editW}
                            <FontAwesomeIcon 
                            icon={faPen} 
                            className="add-icon"
                        />
                    </div>
                    
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

                    </div>

                    <h4>{activeLanguage?.BackgroundsW}</h4>

                    <div className="x" onClick={() => setExist(false)}>
                        <FontAwesomeIcon icon={faX}/>
                    </div>

                </header>

                <section id="backgrounds-management-section" className="scroll">
                    
                    <div className="backgrounds-div" 
                        onClick={() => setImageSelected(0)}
                        style={{
                            border: imageSelected == 0 ? `2px solid ${companyInformation?.primaryColor}` : ''
                        }}
                    >   
                        <img src={backgrouds?.homePage.length > 0 ? backgrouds?.homePage : defaultImage?.src} alt="" />
                        <h4 className="sub-tittle">{activeLanguage?.homePageW}</h4>
                        <input
                            type="file"
                            className='input-file' 
                            ref={(el) => { imagesRef.current[0] = el; }}
                            onChange={(e) => handleImageChange(e, 'homePage')}
                        />
                        {loadingImage?.homePage && <LoadingIcon className={'Loading-icon-'}/>}
                    </div>

                    <div className="backgrounds-div" 
                        onClick={() => setImageSelected(1)}
                        style={{
                            border: imageSelected == 1 ? `2px solid ${companyInformation?.primaryColor}` : ''
                        }}
                    >                       
                        <img src={backgrouds?.registerPage.length > 0 ? backgrouds?.registerPage : defaultImage?.src} alt="" />
                        <h4 className="sub-tittle">{activeLanguage?.registerPageW}</h4>
                        <input
                            type="file"
                            className='input-file' 
                            ref={(el) => { imagesRef.current[1] = el; }}
                            onChange={(e) => handleImageChange(e, 'registerPage')}
                        />
                        {loadingImage?.registerPage && <LoadingIcon className={'Loading-icon-'}/>}
                    </div>
                    
                    <div className="backgrounds-div" 
                        onClick={() => setImageSelected(2)}
                        style={{
                            border: imageSelected == 2 ? `2px solid ${companyInformation?.primaryColor}` : ''
                        }}
                    >                       
                        <img src={backgrouds?.ordersPage.length > 0 ? backgrouds?.ordersPage : defaultImage?.src} alt="" />
                        <h4 className="sub-tittle">{activeLanguage?.ordersPageW}</h4>
                        <input
                            type="file"
                            className='input-file' 
                            ref={(el) => { imagesRef.current[2] = el; }}
                            onChange={(e) => handleImageChange(e, 'ordersPage')}
                        />
                        {loadingImage?.ordersPage && <LoadingIcon className={'Loading-icon-'}/>}
                    </div>

                    <div className="backgrounds-div" 
                        onClick={() => setImageSelected(3)}
                        style={{
                            border: imageSelected == 3 ? `2px solid ${companyInformation?.primaryColor}` : ''
                        }}
                    >
                        <img src={backgrouds?.accountPage.length > 0 ? backgrouds?.accountPage : defaultImage?.src} alt="" />
                        <h4 className="sub-tittle">{activeLanguage?.accountPageW}</h4>
                        <input 
                            type="file" 
                            className='input-file' 
                            ref={(el) => { imagesRef.current[3] = el; }}
                            onChange={(e) => handleImageChange(e, 'accountPage')}
                        />
                        {loadingImage?.accountPage && <LoadingIcon className={'Loading-icon-'}/>}
                    </div>

                    <div className="backgrounds-div" 
                        onClick={() => setImageSelected(4)}
                        style={{
                            border: imageSelected == 4 ? `2px solid ${companyInformation?.primaryColor}` : ''
                        }}
                    >
                        <img src={backgrouds?.shoppingCartPage.length > 0 ? backgrouds?.shoppingCartPage : defaultImage?.src} alt="" />
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