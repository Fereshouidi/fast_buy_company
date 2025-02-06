'use client';

import { CSSProperties, useEffect, useState } from "react";
import LoginForm from "./component/login/loginForm";
import SigninForm from "./component/signin/signinForm";
import HeaderForComputer from "@/app/pages/register/component/header/ForComputer/header";
import { CompanyInformationContext, companyInformationsParams } from "@/app/contexts/companyInformation";
import LoadingIcon_theHolePage from "@/app/svg/icons/loading/loadingHoleOfThePage";
import { getConpanyInformations } from "@/app/crud";
import { CustomerDataParams } from "@/app/contexts/customerData";
import { useRouter } from "next/navigation";
import './component/style.css'
import { AdminDataParam, AdminParam } from "@/app/contexts/adminData";


type switchFormsParams = {
    logInExist: boolean,
    setLogInExist?: (value: boolean) => void,
    signinExist: boolean,
    setSignInExist?: (value: boolean) => void
    adminData: AdminDataParam
    setAdminData: (value: AdminDataParam) => void
}

const Register = ({logInExist, setLogInExist, signinExist, setSignInExist, adminData, setAdminData}: switchFormsParams) => {

    const router = useRouter();

    const [conpanyInformations, setConpanyInformations] = useState<companyInformationsParams | undefined>();

console.log(logInExist, signinExist);

// useEffect(() => {
//     const fetchData = async() => {
//         const conpanyInformationsData = await getConpanyInformations();
//         setConpanyInformations(conpanyInformationsData);
        
//     }
//     fetchData();
// }, [])    

    const styleRegesterPage: CSSProperties = {
        position: 'fixed',
        top: 'var(--header-height)',
        left: '0',
        zIndex: '1000',
        width: '100vw',
        minHeight: '100vh',
        //backgroundColor: 'var(--almost-white)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        // backgroundImage: `url(${conpanyInformations?.backgroundOfRegisterPage})`,
        backdropFilter: 'blur(15px)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
    
    return (

        <div>
            <HeaderForComputer />
            <LoadingIcon_theHolePage/>
            <div id="regester-page" style={styleRegesterPage}>
                <LoginForm logInExist={logInExist} setLogInExist={setLogInExist} signinExist={signinExist} setSignInExist={setSignInExist}/>
                <SigninForm logInExist={logInExist} setLogInExist={setLogInExist} signinExist={signinExist} setSignInExist={setSignInExist} adminData={adminData} setAdminData={setAdminData} />
            </div>
        </div>
    )
}
export default Register;