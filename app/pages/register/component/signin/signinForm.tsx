'use client';
import english from '@/app/languages/english.json';
import arabic from '@/app/languages/arabic.json';
import { LanguageSelectorContext } from '@/app/contexts/LanguageSelectorContext';
import UserNameInput from './component/usernameInput';
import PasswordInput from "./component/passwordInput";
import SubmateBTN from './component/submateBTN';
import SwitchToSignin from './component/switchToSignin';
import { useContext, useEffect, useState } from "react";
import '@/app/pages/register/component/style.css';
import EmailInput from './component/emailInput';
import PhoneNumberInput from './component/phoneNumber';
import RetypePasswordInput from './component/retypePassword';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';
import DateOfBearthInput from './component/dateOfBirth';
import { formDataParams } from '@/app/contexts/signinFormData';
import { activeLanguageContext } from '@/app/contexts/activeLanguage';
import { AdminDataParam, AdminParam } from '@/app/contexts/adminData';

type switchFormsParams = {
    logInExist: boolean,
    setLogInExist?: (value: boolean) => void,
    signinExist: boolean,
    setSignInExist?: (value: boolean) => void
    adminData: AdminDataParam
    setAdminData: (value: AdminDataParam) => void
}
const SigninForm = ({logInExist, setLogInExist, signinExist, setSignInExist, adminData, setAdminData}: switchFormsParams) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const registerRequiredData = useContext(CompanyInformationContext)?.registerRequiredData;

    const [passwordType, setPasswordType] = useState<'text' | 'password'>('text');
    const [formData, setFormData] = useState<AdminDataParam>({
        name: adminData?.name, 
        email: adminData?.email, 
        password: null, 
        retypePassword: null, 
        dateOfBirth: adminData?.dateOfBirth, 
        phone: adminData?.phone
    });

    useEffect(() => {
        console.log(formData);
    }, [formData])

    
    return (
        <div className={signinExist ? 'form signin-form' : 'invisible'}>

            <h4 className='form-name'>{'confirm your account'}</h4>

            <UserNameInput formData={formData} setFormData={setFormData} adminData={adminData} setAdminData={setAdminData} />
            <EmailInput formData={formData} setFormData={setFormData}/>
            <PhoneNumberInput formData={formData} setFormData={setFormData}/>
            <DateOfBearthInput formData={formData} setFormData={setFormData}/>

            <PasswordInput passwordType={passwordType} setPasswordType={setPasswordType} setFormData={setFormData}/>
            <RetypePasswordInput passwordType={passwordType} setPasswordType={setPasswordType} setFormData={setFormData}/>
            {/* <RememberMe formData={formData} setFormData={setFormData}/>  */}
            <SubmateBTN formData={formData} setFormData={setFormData} adminData={adminData} setAdminData={setAdminData}/> 
            {/* <SwitchToSignin logInExist={logInExist} setLogInExist={setLogInExist} signinExist={signinExist} setSignInExist={setSignInExist} /> */}

        </div>
    )
}
export default SigninForm;