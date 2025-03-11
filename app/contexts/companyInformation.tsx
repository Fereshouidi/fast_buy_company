
import { createContext } from "react";

export interface companyInformationsParams {
    name?: nameParams,
    logo?: string,
    primaryColor?: string,
    biggestDiscount?: number,
    entities?: string[],
    originalProductsPercentage?: number,
    servises?: nameParams,
    qualityAssurance?: nameParams,
    offersDetails? : nameParams,
    backgroundsPages: backgroundsPages,
    registerRequiredData?: registerRequiredDataParams,
    email?: string,
    password?: string,
    activateAccountWhileSignin?: boolean,
    companyInformations?: string,
    currencyType?: string
    shippingCost: string
    socialMediaLinks?: socialMediaParams
}

export type nameParams = {
    arabic: string,
    english: string
}

type registerRequiredDataParams = {
    dateOfBearth: boolean,
    phoneNumber: boolean
    adress: boolean
    interrestedAbout: boolean
}

export type backgroundsPages = {
    homePage: string,
    registerPage: string
    accountPage: string
    ordersPage: string
    shoppingCartPage: string
}

export type socialMediaParams = {
    facebook?: string
    instagram?: string
    messanger?: string
    whatsApp?: string
    youtube?: string
    x?: string
}
export const CompanyInformationContext = createContext<companyInformationsParams | undefined>(undefined);