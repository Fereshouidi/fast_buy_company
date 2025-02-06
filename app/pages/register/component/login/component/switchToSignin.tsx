'use client';
import english from '@/app/languages/english.json';
import arabic from '@/app/languages/arabic.json';
import { LanguageSelectorContext } from '@/app/contexts/LanguageSelectorContext';
import { CSSProperties, useContext } from "react";
import '@/app/pages/register/component/style.css';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';

type switchFormsParams = {
    logInExist: boolean,
    setLogInExist: (value: boolean) => void,
    signinExist: boolean,
    setSignInExist: (value: boolean) => void
}
const SwitchToSignin = ({ setLogInExist, setSignInExist}: switchFormsParams) => {

    const activeLanguage = useContext(LanguageSelectorContext)?.activeLanguage;
    const companyInformationContext = useContext(CompanyInformationContext)

    const handleSwitchForms = () => {
        setLogInExist(false);
        setSignInExist(true)
    }

    const styleSpan: CSSProperties = {
        margin: '0 var(--small-margin)',
        color: companyInformationContext?.primaryColor
    }
    
    return (
        <div className='switch-forms'>
            <p>{
                activeLanguage == 'english' ? 
                    english.dontHaveAccountW
                : activeLanguage == 'arabic' ?
                    arabic.dontHaveAccountW
                : english.dontHaveAccountW
            }</p>

            <span style={styleSpan} onClick={handleSwitchForms}>{
                activeLanguage == 'english' ? 
                    english.signinW 
                : activeLanguage == 'arabic' ?
                    arabic.signinW 
                : english.signinW  
            }</span>

        </div>
    )
}
export default SwitchToSignin