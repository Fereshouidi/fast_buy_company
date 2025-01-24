import { createContext } from "react";

interface bannersParams{
    passwordsNotMatch: boolean,
    setPasswordsNotMatch: (value: boolean) => void,
    emailNotValide: boolean,
    setemailNotValide: (value: boolean) => void,
    verificatinEmailBanner: boolean,
    setVerificatinEmailBanner: (value: boolean) => void,
    loginStatusBanner : boolean,
    setLoginStatusBanner : (value: boolean) => void
    loginStatus : number,
    setLoginStatus : (value: number) => void,
    purchaseStatusBanner : boolean,
    setPurchaseStatusBanner : (value: boolean) => void,
    purchaseStatus : number,
    setPurchaseStatus : (value: number) => void 
}

export const BannersContext = createContext<bannersParams | undefined>(undefined)