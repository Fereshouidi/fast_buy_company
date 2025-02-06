'use client';

import english from '@/app/languages/english.json';
import arabic from '@/app/languages/arabic.json';
import { LanguageSelectorContext } from '@/app/contexts/LanguageSelectorContext';import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, CSSProperties, useContext } from 'react';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';
import { formDataParams } from '@/app/contexts/signinFormData';
import { AdminDataParam } from '@/app/contexts/adminData';

type Params = {
    formData: AdminDataParam;
    setFormData: (data: AdminDataParam | ((prev: AdminDataParam) => AdminDataParam)) => void;
}
const EmailInput = ({formData, setFormData}: Params) => {
    
    const activeLanguage = useContext(LanguageSelectorContext)?.activeLanguage;
    const companyInformationContext = useContext(CompanyInformationContext)

    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev: formDataParams) => ({
            ...prev, 
            email: event.target.value
        }));
    }

    const styleInput: CSSProperties = {
        border: '0.7px solid' + companyInformationContext?.primaryColor,
    }
    const styleIconDiv: CSSProperties = {
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

    return (
        <div className="input userName-input">
            
            <input type='text' 
                placeholder= {
                    activeLanguage == 'english' ?
                        english.emailW + ' ... '
                    : activeLanguage == "arabic" ?
                        arabic.emailW + ' ... '
                    : english.emailW + ' ... '
                }
                defaultValue={formData.email?? null}
                style={styleInput}
                onChange={(event) => {handleEmail(event)}}
            />

            <div className='icon-div' style={styleIconDiv}>
                <FontAwesomeIcon icon={faEnvelope} className="icon fa-email" />
            </div>
        </div>
    )
}
export default EmailInput