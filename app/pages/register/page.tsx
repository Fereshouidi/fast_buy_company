'use client';

import { CSSProperties, useContext} from "react";
import LoginForm from "./component/login/loginForm";
import SigninForm from "./component/signin/signinForm";
import HeaderForComputer from "@/app/pages/register/component/header/ForComputer/header";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import LoadingIcon_theHolePage from "@/app/svg/icons/loading/loadingHoleOfThePage";
import { useRouter } from "next/navigation";
import './component/style.css'
import { AdminDataParam } from "@/app/contexts/adminData";


type switchFormsParams = {
    logInExist?: boolean,
    setLogInExist?: (value: boolean) => void,
    signinExist?: boolean,
    setSignInExist?: (value: boolean) => void
    adminData?: AdminDataParam
    setAdminData?: (value: AdminDataParam) => void
}

const Register = ({logInExist, setLogInExist, signinExist, setSignInExist, adminData, setAdminData}: switchFormsParams) => {

    const router = useRouter();

    const conpanyInformations = useContext(CompanyInformationContext);

console.log(logInExist, signinExist);
 

    const styleRegesterPage: CSSProperties = {
        position: 'fixed',
        top: 'var(--header-height)',
        left: '0',
        zIndex: '990',
        width: '100vw',
        minHeight: '100vh',
        // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundImage: `url(${conpanyInformations?.backgroundOfRegisterPage})`,
        backdropFilter: 'blur(15px)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
    
    return (

        <div> hhh
            {/* <HeaderForComputer />
            <LoadingIcon_theHolePage/>
            <div id="regester-page" style={styleRegesterPage}>
                <LoginForm logInExist={logInExist} setLogInExist={setLogInExist} signinExist={signinExist} setSignInExist={setSignInExist}/>
                <SigninForm logInExist={logInExist} setLogInExist={setLogInExist} signinExist={signinExist} setSignInExist={setSignInExist} adminData={adminData} setAdminData={setAdminData} />
            </div> */}
        </div>
    )
}
export default Register;