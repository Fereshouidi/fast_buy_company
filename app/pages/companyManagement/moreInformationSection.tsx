'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { companyInformationsParams } from "@/app/contexts/companyInformation";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import english from '@/app/languages/english.json';
import arabic from '@/app/languages/arabic.json';

type parmas = {
    exist: boolean
    setExist: (value: boolean) => void
    companyInformation: companyInformationsParams
    setCompanyInformation: (value: companyInformationsParams) => void
}
const MoreInformationSection = ({exist, setExist, companyInformation, setCompanyInformation}: parmas) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [changeHappen, setChangeHappen] = useState<boolean>(false);
    const [exceptionalServices, setExceptionalServices] = useState<{english: string, arabic: string}>(companyInformation?.servises);
    const [qualityAssurance, setQualityAssurance] = useState<{english: string, arabic: string}>(companyInformation?.qualityAssurance);
    const [exclusiveOffers, setExclusiveOffers] = useState<{english: string, arabic: string}>(companyInformation.offersDetails);

    const handleExceptionalServices = (e: React.ChangeEvent<HTMLTextAreaElement>, language: 'eng' | 'ar') => {

        if (language == 'ar') {
            setExceptionalServices({
                english: exceptionalServices?.english,
                arabic: e.target?.value
            })
        } else {
            setExceptionalServices({
                english: e.target?.value, 
                arabic: exceptionalServices?.arabic
            })
        }


        // if (language == 'ar') {
        //     setCompanyInformation({
        //         ...companyInformation,
        //         servises: {
        //             english: companyInformation?.servises?.english || '',
        //             arabic: e.target?.value
        //         }
        //     })
        // } else {
        //     setCompanyInformation({
        //         ...companyInformation,
        //         servises: {
        //             english: e.target?.value,
        //             arabic: companyInformation?.servises?.arabic || '',
        //         }
        //     })
        // }

        setChangeHappen(true);

    }
    const handleQualityAssurance = (e: React.ChangeEvent<HTMLTextAreaElement>, language: 'eng' | 'ar') => {

        if (language == 'ar') {
            setQualityAssurance({
                english: qualityAssurance?.english,
                arabic: e.target?.value
            })
        } else {
            setQualityAssurance({
                english: e.target?.value, 
                arabic: qualityAssurance?.arabic
            })
        }

        // if (language == 'ar') {
        //     setCompanyInformation({
        //         ...companyInformation,
        //         qualityAssurance: {
        //             english: companyInformation?.qualityAssurance?.english || '',
        //             arabic: e.target?.value
        //         }
        //     })
        // } else {
        //     setCompanyInformation({
        //         ...companyInformation,
        //         qualityAssurance: {
        //             english: e.target?.value,
        //             arabic: companyInformation?.qualityAssurance?.arabic || '',
        //         }
        //     })
        // }

        setChangeHappen(true);

    }
    const handleExclusiveOffers = (e: React.ChangeEvent<HTMLTextAreaElement>, language: 'eng' | 'ar') => {
        
        if (language == 'ar') {
            setExclusiveOffers({
                english: exclusiveOffers?.english,
                arabic: e.target?.value
            })
        } else {
            setExclusiveOffers({
                english: e.target?.value, 
                arabic: exclusiveOffers?.arabic
            })
        }

        // if (language == 'ar') {
        //     setCompanyInformation({
        //         ...companyInformation,
        //         offersDetails: {
        //             english: companyInformation?.offersDetails?.english || '',
        //             arabic: e.target?.value
        //         }
        //     })
        // } else {
        //     setCompanyInformation({
        //         ...companyInformation,
        //         offersDetails: {
        //             english: e.target?.value,
        //             arabic: companyInformation?.offersDetails?.arabic || '',
        //         }
        //     })
        // }

        setChangeHappen(true);

    }


    const handleDone = () => {

        if (changeHappen) {
            setCompanyInformation({
                ...companyInformation,
                servises: exceptionalServices,
                offersDetails: exclusiveOffers,
                qualityAssurance: qualityAssurance
            })
            setExist(false),
            setChangeHappen(false)
        }

    }

    return (
        <div className={exist ? 'moreInformation-section-container' : 'invisible'} onClick={() => setExist(false)}>

            <div id="more-information-section" onClick={(e) => e.stopPropagation()}>

                                
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

                <h4>{activeLanguage?.moreInformationAboutTheCompany}</h4>

                <div className="cancel_" onClick={() => setExist(false)}>
                    <FontAwesomeIcon icon={faX}/>
                </div>

            </header>

            <section id="moreInformation-management-section" className="scroll">

                <div className="input-div">
                    <h4>{activeLanguage?.exceptionalServices}</h4>

                    <div className='text-area-div'>
                        <textarea  className="textarea textArea-english"
                            placeholder={english?.exceptionalServices + ' ... '} 
                            onChange={(e) => handleExceptionalServices(e, 'eng')}
                            defaultValue={companyInformation?.servises?.english}
                        ></textarea>

                        <textarea 
                            placeholder={arabic?.exceptionalServices + ' ... '} 
                            className="textarea textArea-arabic"
                            onChange={(e) => handleExceptionalServices(e, 'ar')}
                            defaultValue={companyInformation?.servises?.arabic}
                        ></textarea>

                    </div>

                </div>

                <div className="input-div">
                    <h4>{activeLanguage?.qualityAssurance}</h4>

                    <div className='text-area-div'>
                    <textarea 
                        placeholder={english?.qualityAssurance + ' ... '} 
                        className="textarea textArea-english"
                        onChange={(e) => handleQualityAssurance(e, 'eng')}
                        defaultValue={companyInformation?.qualityAssurance?.english}
                    ></textarea>

                    <textarea 
                        placeholder={arabic?.qualityAssurance + ' ... '} 
                        className="textarea textArea-arabic"
                        onChange={(e) => handleQualityAssurance(e, 'ar')}
                        defaultValue={companyInformation?.qualityAssurance?.arabic}
                    ></textarea>
                    </div>

                </div>

                <div className="input-div">
                    <h4>{activeLanguage?.exclusiveOffers}</h4>

                    <div className='text-area-div'>
                    <textarea 
                        placeholder={english?.exclusiveOffers + ' ... '} 
                        className="textarea textArea-english"
                        onChange={(e) => handleExclusiveOffers(e, 'eng')}
                        defaultValue={companyInformation?.offersDetails?.english}
                    ></textarea>

                    <textarea 
                        placeholder={arabic?.exclusiveOffers + ' ... '} 
                        className="textarea textArea-arabic"
                        onChange={(e) => handleExclusiveOffers(e, 'ar')}
                        defaultValue={companyInformation?.offersDetails?.arabic}
                    ></textarea>

                    </div>
                </div>


            </section>

            </div>
            
        </div>
    )
}
export default MoreInformationSection;