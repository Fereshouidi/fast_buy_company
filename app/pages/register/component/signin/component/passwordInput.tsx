'use client';
import english from '@/app/languages/english.json';
import arabic from '@/app/languages/arabic.json';
import { LanguageSelectorContext } from '@/app/contexts/LanguageSelectorContext';
import { faEye,faEyeSlash ,faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, CSSProperties, useContext } from 'react';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';
import { formDataParams } from '@/app/contexts/signinFormData';
import { AdminDataParam } from '@/app/contexts/adminData';

type Params = {
    passwordType: 'text' | 'password'; 
    setPasswordType: (value: 'text' | 'password') => void; 
    setFormData: (data: AdminDataParam | ((prev: AdminDataParam) => AdminDataParam)) => void;
}

const PasswordInput = ({setFormData, passwordType, setPasswordType}: Params) => {

    const activeLanguage = useContext(LanguageSelectorContext)?.activeLanguage;
    const companyInformationContext = useContext(CompanyInformationContext)


    const handlePasswordType = () => {
        setPasswordType(passwordType === 'text' ? 'password' : 'text');
    };
    
    const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            password: event.target.value,
        }));
        
    }

    const styleInput: CSSProperties = {
        border: '0.7px solid' + companyInformationContext?.primaryColor,
    }
    const styleIconsDiv: CSSProperties = {
        position: 'absolute',
        right: activeLanguage == 'arabic' ? '': '0',
        left: activeLanguage == 'arabic' ? '0': '',
        margin: '0 var(--medium-margin)',
        borderRadius: '50%',
        padding: "0 var(--medium-padding)",
        backgroundColor: 'var(--almost-white)',
        height: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    const styleFaLock: CSSProperties = {
        marginRight: activeLanguage == 'arabic' ? 'var(--small-margin)': '',
        marginLeft: activeLanguage == 'arabic' ? '': 'var(--small-margin)',
    }
    const styleFaEye: CSSProperties = {
        cursor: 'pointer'
    }

    return (
        <div className="input password-input">

            <input type={passwordType} placeholder= {
                    activeLanguage == 'english' ?
                        english.passwordW + ' ... '
                    : activeLanguage == "arabic" ?
                        arabic.passwordW + ' ... '
                    : english.passwordW + ' ... '
                }
                style={styleInput}
                onChange={(event) => handlePasswordInput(event)}
            />

            <div className="icons-div" style={styleIconsDiv}>
                {passwordType == 'text' ? 
                    <FontAwesomeIcon icon={faEye} className=" icon fa-eye" style={styleFaEye} onClick={handlePasswordType}/> 
                    : <FontAwesomeIcon icon={faEyeSlash} className="icon fa-eye" style={styleFaEye} onClick={handlePasswordType}/>
                }

                <FontAwesomeIcon icon={faLock} 
                    className="icon fa-lock"
                    style={styleFaLock}
                />
            </div>
        </div>
    )
}
export default PasswordInput