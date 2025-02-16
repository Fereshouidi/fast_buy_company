'use client';

import english from '@/app/languages/english.json';
import arabic from '@/app/languages/arabic.json';
import { LanguageSelectorContext } from '@/app/contexts/LanguageSelectorContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { ChangeEvent, CSSProperties, useContext } from 'react';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';
import { formDataParams } from '@/app/contexts/signinFormData';
import { AdminDataParam } from '@/app/contexts/adminData';

type Params = {
    formData: AdminDataParam;
    setFormData: (data: AdminDataParam | ((prev: AdminDataParam) => AdminDataParam)) => void;
    adminData: AdminDataParam
    setAdminData: (value: AdminDataParam) => void
}
const UserNameInput = ({adminData, setAdminData, setFormData}: Params) => {
    
    const activeLanguage = useContext(LanguageSelectorContext)?.activeLanguage;
    const companyInformationContext = useContext(CompanyInformationContext)

    const handleUserName = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev, 
            userName: event.target.value
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
                        english.userNameW + ' ... '
                    : activeLanguage == "arabic" ?
                        arabic.userNameW + ' ... '
                    : english.userNameW + ' ... '
                }
                defaultValue={adminData?.name?? null}
                style={styleInput}
                onChange={(event) =>  handleUserName(event)}
                maxLength={15}
            />

            <div className='icon-div' style={styleIconDiv}>
                <FontAwesomeIcon icon={faUser} className="icon fa-user" />
            </div>
        </div>
    )
}
export default UserNameInput