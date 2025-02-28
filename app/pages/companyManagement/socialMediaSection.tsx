'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { BannerContext } from "@/app/contexts/bannerForEverything";
import { companyInformationsParams } from "@/app/contexts/companyInformation";
import { discountCodeParams } from "@/app/contexts/discountCode";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import YesNoToggle from "@/app/svg/icons/yes_no_toggle";
import { faFacebook, faFacebookMessenger, faInstagram, faWhatsapp, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCheck, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";

type Params = {
    exist: boolean
    setExist: (value: boolean) => void
    companyInformation: companyInformationsParams
    setCompanyInformation: (value: companyInformationsParams) => void
}
const SocialMediaSection = ({exist, setExist, companyInformation, setCompanyInformation}:Params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [changeHappen, setChangeHappen] = useState<boolean>(false);
    const [facebookLink, setFacebookLink] = useState<string>(companyInformation?.socialMediaLinks?.facebook?? '' );
    const [instagramLink, setInstagramLink] = useState<string>(companyInformation?.socialMediaLinks?.instagram?? '' );
    const [messangerLink, setMessangerLink] = useState<string>(companyInformation?.socialMediaLinks?.messanger?? '' );
    const [whatsAppLink, setWhatsAppLink] = useState<string>(companyInformation?.socialMediaLinks?.whatsApp?? '' );
    const [youtubeLink, setYoutubeLink] = useState<string>(companyInformation?.socialMediaLinks?.youtube?? '' );
    const [xLink, setXLink] = useState<string>(companyInformation?.socialMediaLinks?.x?? '' );

    
    // useEffect(() => {
    //     console.log(facebookLink, instagramLink, messangerLink, whatsAppLink, youtubeLink);
        
    // }, [facebookLink, instagramLink, messangerLink, whatsAppLink, youtubeLink])

    const handleDone = () => {

        setCompanyInformation({
            ...companyInformation,
            socialMediaLinks: {
                facebook: facebookLink,
                instagram: instagramLink,
                messanger: messangerLink,
                whatsApp: whatsAppLink,
                youtube: youtubeLink,
                x: xLink
            }
        })
        setExist(false);        

    }

    return (
        <div className={exist ? "social-media-section-container" : 'invisible'}>

            <div id="social-media-section">

                <header className="header"> 

                    <div className="handling">
                         
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

                    <h4>{activeLanguage?.socialMediaW}</h4>

                    <div className="cancel_" onClick={() => setExist(false)}>
                        <FontAwesomeIcon icon={faX}/>
                    </div>

                </header>
                
                <section id="social-media-management-section" className="scroll edit-social-media">
                    
                    <div className="item-div facebook-div">
                        <FontAwesomeIcon icon={faFacebook} className="facebook-icon icon"/>
                        <p className='p-text'>{activeLanguage?.socialMedia?.facebookW}</p>
                        <input type="text"
                            value={facebookLink} 
                            className='input-link pointer'
                            placeholder="link ..."
                            onChange={(e) => {setFacebookLink(e.target?.value); setChangeHappen(true)}}
                        />
                    </div>

                    <div className="item-div">
                        <FontAwesomeIcon icon={faInstagram} className="instagram-icon icon"/>
                        <p className='p-text'>{activeLanguage?.socialMedia?.instagramW}</p>
                        <input type="text"
                            value={instagramLink} 
                            className='input-link pointer'
                            placeholder="link ..."
                            onChange={(e) => {setInstagramLink(e.target?.value); setChangeHappen(true)}}
                        />

                    </div>

                    <div className="item-div">
                        <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon icon"/>
                        <p className='p-text'>{activeLanguage?.socialMedia?.whatsAppW}</p>
                        <input type="text"
                            value={whatsAppLink} 
                            className='input-link pointer'
                            placeholder="link ..."
                            onChange={(e) => {setWhatsAppLink(e.target?.value); setChangeHappen(true)}}
                        />

                    </div>

                    <div className="item-div">
                        <FontAwesomeIcon icon={faFacebookMessenger} className="messanger-icon icon"/>
                        <p className='p-text'>{activeLanguage?.socialMedia?.messangerW}</p>
                        <input type="text"
                            value={messangerLink} 
                            className='input-link pointer'
                            placeholder="link ..."
                            onChange={(e) => {setMessangerLink(e.target?.value); setChangeHappen(true)}}
                        />

                    </div>

                    <div className="item-div">
                        <FontAwesomeIcon icon={faYoutube} className="youtube-icon icon"/>
                        <p className='p-text'>{activeLanguage?.socialMedia?.youtubeW}</p>
                        <input type="text"
                            value={youtubeLink} 
                            className='input-link pointer'
                            placeholder="link ..."
                            onChange={(e) => {setYoutubeLink(e.target?.value), setChangeHappen(true)}}
                        />

                    </div>

                    <div className="item-div">
                        <FontAwesomeIcon icon={faXTwitter} className="x-icon icon"/>
                        <p className='p-text'>{activeLanguage?.socialMedia?.xW}</p>
                        <input type="text"
                            value={xLink} 
                            className='input-link pointer'
                            placeholder="link ..."
                            onChange={(e) => {setYoutubeLink(e.target?.value), setChangeHappen(true)}}
                        />

                    </div>

                </section>

            </div>
        </div>
    )
}
export default SocialMediaSection;