'use client';
import english from '@/app/languages/english.json';
import arabic from '@/app/languages/arabic.json';
// import { LanguageSelectorContext } from '@/app/contexts/LanguageSelectorContext';
import { activeLanguageContext } from '@/app/contexts/activeLanguage';
import { faEye,faEyeSlash ,faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, CSSProperties, useContext } from 'react';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';
import { formParams } from '../loginForm';

type Params = {
    passwordType: 'text' | 'password'; 
    setPasswordType: (value: 'text' | 'password') => void; 
    form: formParams,
    setForm: (value: formParams) => void
}

const PasswordInput = ({passwordType, setPasswordType, form, setForm}: Params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const companyInformationContext = useContext(CompanyInformationContext)


    const handlePasswordType = () => {
        setPasswordType(passwordType === 'text' ? 'password' : 'text');
    };
    
    const handlechange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, password: event.target.value})
    };

    const styleInput: CSSProperties = {
        border: '0.7px solid' + companyInformationContext?.primaryColor,
    }
    const styleIconsDiv: CSSProperties = {
        position: 'absolute',
        right: activeLanguage?.language == 'arabic' ? '': '0',
        left: activeLanguage?.language == 'arabic' ? '0': '',
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
        marginRight: activeLanguage?.language == 'arabic' ? 'var(--small-margin)': '',
        marginLeft: activeLanguage?.language == 'arabic' ? '': 'var(--small-margin)',
    }
    const styleFaEye: CSSProperties = {
        cursor: 'pointer'
    }

    return (
        <div className="input password-input">

            <input type={passwordType} placeholder= {
                    activeLanguage?.language == 'english' ?
                        english.passwordW + ' ... '
                    : activeLanguage?.language == "arabic" ?
                        arabic.passwordW + ' ... '
                    : english.passwordW + ' ... '
                }
                style={styleInput}
                onChange={(event) => handlechange(event)}
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