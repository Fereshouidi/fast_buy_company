'use client';

import english from '@/app/languages/english.json';
import arabic from '@/app/languages/arabic.json';
import { LanguageSelectorContext } from '@/app/contexts/LanguageSelectorContext';import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, CSSProperties, useContext } from 'react';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';
import { formDataParams } from '@/app/contexts/signinFormData';
import { AdminDataParam } from '@/app/contexts/adminData';

type Params = {
    formData: AdminDataParam;
    setFormData: (data: AdminDataParam | ((prev: AdminDataParam) => AdminDataParam)) => void;
}
const DateOfBearthInput = ({setFormData}: Params) => {
    
    const activeLanguage = useContext(LanguageSelectorContext)?.activeLanguage;
    const companyInformationContext = useContext(CompanyInformationContext)

    const handleDateOfBirth = (event: ChangeEvent<HTMLInputElement>) => {
        const dateValue = event.target.value ? new Date(event.target.value) : undefined;
        setFormData((prev: formDataParams) => ({
            ...prev,
            dateOfBirth: dateValue,
        }));
    };
    
    
    const styleInput: CSSProperties = {
        border: '0.7px solid' + companyInformationContext?.primaryColor,
        direction: 'ltr',
        textAlign: activeLanguage !== 'arabic' ? 'left' : 'right',
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
        <div className="input">
            
            <input type='date' 
                placeholder= {
                    activeLanguage == 'english' ?
                        english.dateOfBorthW + ' ... '
                    : activeLanguage == "arabic" ?
                        arabic.dateOfBorthW + ' ... '
                    : english.dateOfBorthW + ' ... '
                }
                style={styleInput}
                className='input-date'
                onChange={(event) => {handleDateOfBirth(event)}}
            />

            <div className='icon-div' style={styleIconDiv}>
                <FontAwesomeIcon icon={faCalendar} className="icon fa-Phone" />
            </div>
        </div>
    )
}
export default DateOfBearthInput;