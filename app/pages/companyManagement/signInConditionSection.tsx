'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { companyInformationsParams } from "@/app/contexts/companyInformation";
import YesNoToggle from "@/app/svg/icons/yes_no_toggle";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";

type Params = {
    exist: boolean
    setExist: (value: boolean) => void
    companyInformation: companyInformationsParams
    setCompanyInformation: (value: companyInformationsParams) => void
}
const SignInConditionSection = ({exist, setExist, companyInformation, setCompanyInformation}:Params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [changeHappen, setChangeHappen] = useState<boolean>(false);
    const [isUserNameRequired, setIsUserNameRequired] = useState<boolean>(true);
    const [isEmailRequired, setIsEmailRequired] = useState<boolean>(true);
    const [isPasswordRequired, setIsPasswordRequired] = useState<boolean>(true);
    const [snackbarForUserName, setSnackbarForUserName] = useState<boolean>(false);
    const [snackbarForEmail, setSnackbarForEmail] = useState<boolean>(false);
    const [snackbarForPassword, setSnackbarForPassword] = useState<boolean>(false);

    const [isAdressRequired, setIsAdressRequired] = useState<boolean>(companyInformation?.registerRequiredData?.adress || false);
    const [isAreaOfInterestRequired, setIsAreaOfInterestRequired] = useState<boolean>(companyInformation?.registerRequiredData?.interrestedAbout || false);
    const [isPhoneRequired, setIsPhoneRequired] = useState<boolean>(companyInformation?.registerRequiredData?.phoneNumber || false);
    const [isDateOfBirthRequired, setIsDateOfBirthRequired] = useState<boolean>(companyInformation?.registerRequiredData?.dateOfBearth || false);
    const [verifWhileSingIn, setVerifWhileSingIn] = useState<boolean>(companyInformation?.activateAccountWhileSignin || false);

    const handleStuffCantBeChange = (stuff: 'userName' | 'email' | 'password') => {
        if (stuff == 'userName') {
            
            setIsUserNameRequired(false);
            setSnackbarForUserName(true);
            setTimeout(() => {
                setIsUserNameRequired(true);
            }, 200)
            setTimeout(() => {
                setSnackbarForUserName(false);
            }, 3000)

        } else if (stuff == 'email') {

            setIsEmailRequired(false);
            setSnackbarForEmail(true)
            setTimeout(() => {
                setIsEmailRequired(true);
            }, 200)
            setTimeout(() => {
                setSnackbarForEmail(false);
            }, 3000)

        }else if (stuff == 'password') {

            setIsPasswordRequired(false);
            setSnackbarForPassword(true)
            setTimeout(() => {
                setIsPasswordRequired(true);
            }, 200)
            setTimeout(() => {
                setSnackbarForPassword(false);
            }, 3000)

        }
    }

    const handleDone = () => {

        setCompanyInformation({
            ...companyInformation,
            registerRequiredData: {
                adress: isAdressRequired,
                dateOfBearth: isDateOfBirthRequired,
                phoneNumber: isPhoneRequired,
                interrestedAbout: isAreaOfInterestRequired,
            },
            activateAccountWhileSignin: verifWhileSingIn
        })
        setExist(false);        

    }

    return (
        <div className={exist ? "sing-in-condition-section-container" : 'invisible'}>
            <div id="sing-in-condition-section">

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

                    <h4>{activeLanguage?.signInConditionW}</h4>

                    <div className="cancel_" onClick={() => setExist(false)}>
                        <FontAwesomeIcon icon={faX}/>
                    </div>

                </header>
                
                <section id="sing-in-condition-management-section" className="scroll">
                    
                    <div className="item-div">
                        <p className='p-text'>{activeLanguage?.userNameW}</p>
                        <YesNoToggle value={isUserNameRequired} onClick={() => handleStuffCantBeChange('userName')} className='pointer'/>
                        {snackbarForUserName && <p className="p-text Snackbar">{activeLanguage?.userNameIsNecessary}</p>}
                    </div>

                    <div className="item-div">
                        <p className='p-text'>{activeLanguage?.emailW}</p>
                        <YesNoToggle value={isEmailRequired} onClick={() => handleStuffCantBeChange('email')} className='pointer'/>
                        {snackbarForEmail && <p className="p-text Snackbar">{activeLanguage?.emailIsNecessary}</p>}

                    </div>

                    <div className="item-div">
                        <p className='p-text'>{activeLanguage?.passwordW}</p>
                        <YesNoToggle value={isPasswordRequired} onClick={() => handleStuffCantBeChange('password')} className='pointer'/>
                        {snackbarForPassword && <p className="p-text Snackbar">{activeLanguage?.passwordIsNecessary}</p>}

                    </div>


                    <div className="item-div">
                        <p className='p-text'>{activeLanguage?.dateOfBorthW}</p>
                        <YesNoToggle value={isDateOfBirthRequired} 
                            onClick={() => {
                                setIsDateOfBirthRequired(!isDateOfBirthRequired), 
                                setChangeHappen(true)
                            }} 
                            className='pointer'/>
                    </div>

                    <div className="item-div">
                        <p className='p-text'>{activeLanguage?.PhoneNumberW}</p>
                        <YesNoToggle value={isPhoneRequired} 
                            onClick={() => {
                                setIsPhoneRequired(!isPhoneRequired),
                                setChangeHappen(true)
                            }} 
                            className='pointer'/>
                    </div>

                    <div className="item-div">
                        <p className='p-text'>{activeLanguage?.fullAdressW}</p>
                        <YesNoToggle value={isAdressRequired} onClick={() => {
                            setIsAdressRequired(!isAdressRequired),
                            setChangeHappen(true)
                        }} 
                        className='pointer'/>
                    </div>

                    <div className="item-div">
                        <p className='p-text'>{activeLanguage?.areaOfInterest}</p>
                        <YesNoToggle value={isAreaOfInterestRequired} onClick={() => {
                            setIsAreaOfInterestRequired(!isAreaOfInterestRequired);
                            setChangeHappen(true)
                        }} 
                        className='pointer'/>
                    </div>

                    <div className="item-div">
                        <p className='p-text'>{activeLanguage?.updateActivateAccountWhileSingIn}</p>
                        <YesNoToggle value={verifWhileSingIn} onClick={() => {
                            setVerifWhileSingIn(!verifWhileSingIn);
                            setChangeHappen(true)
                        }} 
                        className='pointer'/>
                    </div>

                </section>

            </div>
        </div>
    )
}
export default SignInConditionSection;