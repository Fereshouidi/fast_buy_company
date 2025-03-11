'use client';
import React, {useContext, useEffect, useRef, useState } from 'react';
import './style.css';
import { AdminContext } from '@/app/contexts/adminData';
import { activeLanguageContext } from '@/app/contexts/activeLanguage';
import { CompanyInformationContext, companyInformationsParams } from '@/app/contexts/companyInformation';
import PasswordExplanSec from './passwordExplanSec';
import LoadingIcon from '@/app/svg/icons/loading/loading';
import { getAllBullentinBoard, getAllDiscountCodes, getSliderData, sendActivationToken, updateConpanyInformations, updateSlider, uploadImage } from '@/app/crud';
import { LoadingIconContext } from '@/app/contexts/loadingIcon';
import { BannerContext } from '@/app/contexts/bannerForEverything';
import DiscountCodeSection from './discountCodeSection';
import { discountCodeParams } from '@/app/contexts/discountCode';
import BackgroundsSection from './backgroundsSection';
import { BullentinBoard } from '@/app/contexts/BullentinBoard';
import BullentinBoardSection from './bullentinBoardSection';
import SignInConditionSection from './signInConditionSection';
import SocialMediaSection from './socialMediaSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faFacebookMessenger, faInstagram, faTwitter, faWhatsapp, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { sliderDataParams } from '@/app/contexts/slider';
import SliderSection from './sliderSection';
import CategoriesSection from './categoriesSection';
import MoreInformationSection from './moreInformationSection';
import defaultImage from '@/app/images/خلفية-رمادي-فاتح-سادة.jpg';

const CompanyManagement = () => {

    const admin = useContext(AdminContext)?.admin;
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const companyInformation = useContext(CompanyInformationContext);
    const [loadingImagePrincipal, setLoadingImagePrincipal] = useState<boolean>(false);
    const [passwordExplanSecExist, setPasswordExplanSecExist] = useState<boolean>(false);
    const [updatedCompanyInformation, setUpdatedCompanyInformation] = useState<companyInformationsParams | undefined>(companyInformation?? undefined);
    const inputLogoRef = useRef<HTMLInputElement>(null);
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    const setBanner = useContext(BannerContext)?.setBanner;
    const [discountCodeSectionExist, setDiscountCodeSectionExist] = useState<boolean>(false);
    const [backgroundsSectionExist, setBckgroundsSectionExist] = useState<boolean>(false);
    const [signInConditionSectionExist, setSignInConditionSectionExist] = useState<boolean>(false);
    const [moreInformationSectionExist, setMoreInformationSectionExist] = useState<boolean>(false);
    const [socialMediaSectionExist, setSocialMediaSectionExist] = useState<boolean>(false);
    const [bullentinBoardSectionExist, setBullentinBoardSectionExist] = useState<BullentinBoard | undefined>(undefined);
    const [sliderSectionExist, setSliderSectionExist] = useState<boolean>(false);
    const [categoriesSectionExist, setCategoriesSectionExist] = useState<boolean>(false);
    const [allDiscountCodes, setAllDiscountCodes] = useState<discountCodeParams[]>();
    const [allBullentinBoard, setAllBullentinBoard] = useState<BullentinBoard[]>();
    const [slider, setSlider] = useState<sliderDataParams | undefined>(undefined);
    const [updatedSlider, setUpdatedSlider] = useState<sliderDataParams | undefined>(undefined);
    const [changeHappen, setChangeHappen] = useState<boolean>(false);


    useEffect(() => {
        const fetchData = async () => {
            const discountCodes = await getAllDiscountCodes();
            const bullentinBoard = await getAllBullentinBoard();
            const slider = await getSliderData();
            
            setAllDiscountCodes(discountCodes);
            setAllBullentinBoard(bullentinBoard);
            setSlider(slider);
            setUpdatedSlider(slider);
        }
        fetchData();
    }, []);
    
    
    useEffect(() => {
        if (JSON.stringify(updatedCompanyInformation) !== JSON.stringify(companyInformation) || JSON.stringify(slider) !== JSON.stringify(updatedSlider)) {
            setChangeHappen(true);
        } else {
            setChangeHappen(false);
        }
    }, [updatedCompanyInformation, updatedSlider]);
    
    

    if (!admin?.permissions?.includes('companyManagement')) {
        return <div>you dont heve permission to be at this page !</div>
    }
    if (!companyInformation) {
        return 'something went wrong while getting companyInformation !'
    }
    

    const handleName = (e: React.ChangeEvent<HTMLInputElement>, language: 'eng' | 'ar') => { 
    
        if (e.target && language == 'eng') {
            setUpdatedCompanyInformation({
                ...updatedCompanyInformation,
                name: {
                    ...updatedCompanyInformation?.name,
                    english: e.target.value
                }
            })
        } else if (e.target && language == 'ar') {
            setUpdatedCompanyInformation({
                ...updatedCompanyInformation,
                name: {
                    ...updatedCompanyInformation?.name,
                    arabic: e.target.value
                }
            })
        }
    }
    const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => { 

        const file = e.target?.files[0];
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const result = event.target?.result;
                if (typeof result === "string") {
                    setLoadingImagePrincipal(true);
                    const uploadedImageUrl = await uploadImage(result);
                    if (uploadedImageUrl) {
                        setUpdatedCompanyInformation({
                            ...updatedCompanyInformation,
                            logo: uploadedImageUrl
                        })
                        setLoadingImagePrincipal(false)
                        console.log("Uploaded Image URL:", uploadedImageUrl);
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
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setUpdatedCompanyInformation({
            ...updatedCompanyInformation,
            email: e.target?.value
        })
    }
    const verifEmail = async() => {

        
        setLoadingIcon(true);
        
        const emailValid = await sendActivationToken(
            updatedCompanyInformation?.email?? companyInformation?.email, 
            companyInformation?.name, 
            companyInformation?.email?? updatedCompanyInformation?.email, 
            updatedCompanyInformation?.password?? companyInformation?.password, 
            activeLanguage?.language
        );

        if (emailValid) {
            setBanner(true, activeLanguage?.checkEmailP);
            setLoadingIcon(false);

        } else {
            setBanner(true, activeLanguage?.emailOrPasswordAreWrongP, 'fail');
            setLoadingIcon(false);
        }

    }
    const handlepassword = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setUpdatedCompanyInformation({
            ...updatedCompanyInformation,
            password: e.target?.value
        })
    }
    const handleCurrencyType = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setUpdatedCompanyInformation({
            ...updatedCompanyInformation,
            currencyType: e.target?.value
        })
    }
    const handleShippingCost = (e: React.ChangeEvent<HTMLInputElement>) => { 

        // let value = e.target?.value;
        // if (value[value.length -1] !== '$' || value[value.length -1] !== ' ') {
        //     value = value + ' $';
        // }
        // for (let i = 0 ; i < value.length ; i++) {
        //     if (value[i] == '$' && i != value.length -1) {

        //     }
        // }

        setUpdatedCompanyInformation({
            ...updatedCompanyInformation,
            shippingCost: e.target?.value
        })
    }
    const handlePrimaryColor = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setUpdatedCompanyInformation({
            ...updatedCompanyInformation,
            primaryColor: e.target?.value
        })
    }

    const handleCommitChange = async () => { 

        if (changeHappen) {
            setLoadingIcon(true);
            const updatedConpanyInformations_ = await updateConpanyInformations(updatedCompanyInformation);
            const updatedSlider_ = await updateSlider(updatedSlider);

            if (updatedConpanyInformations_.status == 200 && updatedSlider_.status == 200) {
                setBanner(true, activeLanguage?.modificationsSavedSuccessfully);
            } else {
                setBanner(true, activeLanguage?.someErrorHappen);
            }
            setLoadingIcon(false);
            setChangeHappen(false);
        }
    }

    
    useEffect(() => {
        console.log(updatedCompanyInformation);
        // console.log(slider);
        
    }, [updatedCompanyInformation])

    return(
        <div className="page companyManagement-page">

            <section className='edit-section scroll'>

                <div className="edit edit-logo">
                    <h4>{activeLanguage?.companyLogoW}</h4>
                    <div className='container'>
                        <p className='p-text'>{activeLanguage?.updateLogoW +' : '}</p>
                        <img id='logo' src={updatedCompanyInformation?.logo?? companyInformation?.logo} className='pointer' onClick={() => inputLogoRef?.current?.click()} />
                        <input type="file" className='invisible' ref={inputLogoRef} onChange={(e) => handleLogo(e)}/>
                        {loadingImagePrincipal && <LoadingIcon className='Loading-icon'/>}

                    </div>

                </div>

                <div className="edit edit-name">
                    <h4>{activeLanguage?.companyNameW}</h4>

                    <div className='container'>
                    <p className='p-text'>{activeLanguage?.updateNameW +' : '}</p>

                    <div className='input-multy-language-div'>
                        <h4>english :</h4>
                        <input type="text" 
                            defaultValue={companyInformation?.name?.english}
                            placeholder={'company name ...'}
                            maxLength={100}
                            onChange={(e) => {handleName(e, 'eng')}}
                    />
                    </div>
                    <div className='input-multy-language-div input-arabic-div'>
                        <h4>العربية :</h4>
                        <input type="text" 
                        defaultValue={companyInformation?.name?.arabic}
                        placeholder={'اسم الشركة ...'}
                        maxLength={100}
                        onChange={(e) => {handleName(e, 'ar')}}
                    />
                    </div>
                    </div>
                </div>

                <div className="edit edit-email">
                <h4>{activeLanguage?.emailW}</h4>
                    <div className='container'>
                        <p className='p-text'>{activeLanguage?.updateEmailP +' : '}</p>
                        <div className='inp-and-btn-div' >
                            <input type="text"  
                                defaultValue={companyInformation?.email} 
                                placeholder={activeLanguage?.emailW + ' ...'}
                                maxLength={50}
                                onChange={(e) => handleEmail(e)}
                            />
                            <button className='verif-email-btn' onClick={verifEmail} >{activeLanguage?.verif}</button>
                        </div>
                    </div>
                </div>

                <div className="edit password">
                    <h4>{activeLanguage?.passwordW}</h4>
                    <div className='container'>
                        <p className='p-text'>{activeLanguage?.updatePasswordW}</p>
                        <input type="text" 
                            placeholder={activeLanguage?.passwordW} 
                            defaultValue={companyInformation?.password}
                            onChange={(e) => handlepassword(e)}
                        />
                        <h6 className='explanation-w' onClick={() => setPasswordExplanSecExist(true)}>{activeLanguage?.ExplainW} 💡</h6>
                    </div>
                </div>

                <div className="edit currencyType">
                    <h4>{activeLanguage?.currencyTypeW}</h4>
                    <div className='container'>
                        <p className='p-text'>{activeLanguage?.updatecurrencyTypeW}</p>
                        <input type="text" 
                            placeholder={activeLanguage?.currencyTypeW + '...'}
                            defaultValue={companyInformation?.currencyType}
                            maxLength={10}
                            onChange={(e) => handleCurrencyType(e)}
                        />
                        
                    </div>
                </div>

                <div className="edit shippingCost">
                    <h4>{activeLanguage?.shippingCostW}</h4>
                    <div className='container'>
                        <p className='p-text'>{activeLanguage?.updateShippingCost}</p>
                        <input type="number" 
                            placeholder={activeLanguage?.shippingCostW + '...'}
                            defaultValue={ updatedCompanyInformation?.shippingCost?? companyInformation?.shippingCost}
                            maxLength={10}
                            onChange={(e) => handleShippingCost(e)}
                        />
                        
                    </div>
                </div>
                
                <div className="edit edit-discount-code">
                    <h4>{activeLanguage?.discountCodeW}</h4>
                    <div className='container'>
                        <p className='p-text'>{activeLanguage?.updateDiscountCode}</p>
                        <h6 className='p-text edit-discount-code-btn' 
                            onClick={() => setDiscountCodeSectionExist(!discountCodeSectionExist)}
                        >{activeLanguage?.modifyW}</h6>
                    </div>
                </div>

                <div className="edit edit-primary-color">
                    <h4>{activeLanguage?.primaryColorW}</h4>
                    <div className='container'>
                        <p className='p-text'>{activeLanguage?.updatePrimaryColor}</p>
                        <input type="color" 
                            className='input-color pointer'
                            defaultValue={companyInformation?.primaryColor}
                            onChange={(e) => handlePrimaryColor(e)}
                        />
                        
                    </div>
                </div>

                <div className="edit edit-backgrouds" onClick={() => setBckgroundsSectionExist(true)}>
                    <h4>{activeLanguage?.backgroundsW}</h4>
                    <div className='container'>
                        <p className='p-text'>{activeLanguage?.updateBackgrounds +' : '}</p>
                        <div className='images-container pointer'>
                            <img className='backgrounds' src={updatedCompanyInformation?.backgroundsPages?.homePage.length > 0 ?updatedCompanyInformation?.backgroundsPages?.homePage : defaultImage?.src} alt="" />
                            <img className='backgrounds' src={updatedCompanyInformation?.backgroundsPages?.accountPage.length > 0 ?updatedCompanyInformation?.backgroundsPages?.accountPage : defaultImage?.src} alt="" />
                            <img className='backgrounds' src={updatedCompanyInformation?.backgroundsPages?.registerPage.length > 0 ?updatedCompanyInformation?.backgroundsPages?.registerPage : defaultImage?.src} alt="" />
                            <img className='backgrounds' src={updatedCompanyInformation?.backgroundsPages?.shoppingCartPage.length > 0 ?updatedCompanyInformation?.backgroundsPages?.shoppingCartPage : defaultImage?.src} alt="" />
                            <img className='backgrounds' src={updatedCompanyInformation?.backgroundsPages?.ordersPage.length > 0 ?updatedCompanyInformation?.backgroundsPages?.ordersPage : defaultImage?.src} alt="" />
                        </div>
                    </div>
                </div>

                <div className="edit edit-bullentin-boards" >
                    <h4>{activeLanguage?.bullentinBoardsW}</h4>
                    <div className='container'>
                        <p className='p-text'>{activeLanguage?.updateBullentinBoards +' : '}</p>
                        <div className='images-container pointer'>
                            {allBullentinBoard?.map((bullentinBoard, index) => {
                                return <img 
                                    key={index} 
                                    className='backgrounds' 
                                    src={bullentinBoard.images[0]} 
                                    onClick={() => setBullentinBoardSectionExist(bullentinBoard)}
                                />
                            })}
                        </div>
                    </div>
                </div>

                <div className="edit edit-slider">
                    <h4>{activeLanguage?.sliderW}</h4>
                    <div className='container'>
                        <p className='p-text'>{activeLanguage?.updateSlider +' : '}</p>
                        <div className='images-container pointer'>
                            {updatedSlider?.products?.slice(0, 6).map((products, index) => {
                                return <img 
                                    key={index} 
                                    className='backgrounds' 
                                    src={products.imagePrincipal} 
                                    onClick={() => setSliderSectionExist(true)}
                                />
                            })}
                        </div>
                    </div>
                </div>
                
                <div className="edit edit-categories-section">
                    <h4>{activeLanguage?.theCategoriesW}</h4>
                    <div className='container'> 
                       <p className='p-text'>{activeLanguage?.editCategoriesForHomePage}</p>
                       <h6 
                            className='p-text edit-sign-in-btn'
                            onClick={() => setCategoriesSectionExist(true)}
                        >{activeLanguage?.editW}</h6>
                    </div>
                </div>
                
                <div className="edit edit-social-media" onClick={() => setSocialMediaSectionExist(true)}>
                    <h4>{activeLanguage?.socialMediaW}</h4>
                    <div className='container'>
                        <p className='p-text'>{activeLanguage?.updateSocialMedia +' : '}</p>
                        <div className='images-container pointer'>
                            <FontAwesomeIcon icon={faFacebook} className='backgrounds facebook-icon'/>
                            <FontAwesomeIcon icon={faInstagram} className='backgrounds instagram-icon'/>
                            <FontAwesomeIcon icon={faFacebookMessenger} className='backgrounds messanger-icon'/>
                            <FontAwesomeIcon icon={faWhatsapp} className='backgrounds whatsapp-icon'/>
                            <FontAwesomeIcon icon={faYoutube} className='backgrounds youtube-icon'/>
                            <FontAwesomeIcon icon={faXTwitter} className='backgrounds x-icon'/>
                        </div>
                    </div>
                </div>

                <div className="edit activate-Account-While-Signin">
                    <h4>{activeLanguage?.activateCustomerAccountW}</h4>
                    <div className='container'> 
                       <p className='p-text'>{activeLanguage?.activateCustomerAccountConditionW}</p>
                       <h6 
                            className='p-text edit-sign-in-btn'
                            onClick={() => setSignInConditionSectionExist(true)}
                        >{activeLanguage?.modifyW}</h6>
                    </div>
                </div>

                <div className="edit activate-Account-While-Signin">
                    <h4>{activeLanguage?.moreW}</h4>
                    <div className='container'> 
                       <p className='p-text'>{activeLanguage?.updateinformationAboutTheCompany}</p>
                       <h6 
                            className='p-text edit-sign-in-btn'
                            onClick={() => setMoreInformationSectionExist(true)}
                        >{activeLanguage?.modifyW}</h6>
                    </div>
                </div>


                <h4 className='commit-btn' 
                    onClick={handleCommitChange}
                    style={{
                        backgroundColor: changeHappen ? 'var(--black)' : 'var(--ashen-semi-transparent)',
                        color: changeHappen ? 'var(--white)' : 'var(--almostblack)',
                        opacity:  changeHappen ? 1 : 0.5,
                    }}
                >
                        {activeLanguage?.commitChange}
                </h4>

            </section>

            <PasswordExplanSec exist={passwordExplanSecExist} setExist={setPasswordExplanSecExist}/>
            <DiscountCodeSection exist={discountCodeSectionExist} setExist={setDiscountCodeSectionExist} importFrom={'companyManagementPage'} allDiscountCodes={allDiscountCodes} setAllDiscountCodes={setAllDiscountCodes}/>
            <BackgroundsSection exist={backgroundsSectionExist} setExist={setBckgroundsSectionExist} companyInformation={updatedCompanyInformation} setCompanyInformation={setUpdatedCompanyInformation}/>
            <BullentinBoardSection activeBullentinBoard={bullentinBoardSectionExist} setActiveBullentinBoard={setBullentinBoardSectionExist} companyInformation={updatedCompanyInformation} setCompanyInformation={setUpdatedCompanyInformation}/>
            <SignInConditionSection exist={signInConditionSectionExist} setExist={setSignInConditionSectionExist} companyInformation={updatedCompanyInformation} setCompanyInformation={setUpdatedCompanyInformation}/>
            <SocialMediaSection exist={socialMediaSectionExist} setExist={setSocialMediaSectionExist} companyInformation={updatedCompanyInformation} setCompanyInformation={setUpdatedCompanyInformation}/>
            <SliderSection exist={sliderSectionExist} setExist={setSliderSectionExist} slider={updatedSlider} setSlider={setUpdatedSlider}/>
            <CategoriesSection exist={categoriesSectionExist} setExist={setCategoriesSectionExist}/>
            <MoreInformationSection exist={moreInformationSectionExist} setExist={setMoreInformationSectionExist} companyInformation={updatedCompanyInformation} setCompanyInformation={setUpdatedCompanyInformation}/>
        </div>
    )
}
export default CompanyManagement;








