
import { createContext } from "react";

export interface companyInformationsParams {
    name?: nameParams,
    logo?: string,
    primaryColor?: string,
    biggestDiscount?: number,
    offersDetails? : string,
    entities?: string[],
    originalProductsPercentage?: number,
    servises?: string[],
    backgroundOfRegisterPage?: string,
    registerRequiredData?: registerRequiredDataParams,
    email?: string,
    password?: string,
    activateAccountWhileSignin?: boolean,
    companyInformations?: string,
    currencyType?: string
    shippingCost: string
}

export type nameParams = {
    arabic: string,
    english: string
}

type registerRequiredDataParams = {
    dateOfBearth: {
        type: boolean,
    },
    phoneNumber: {
        type: boolean,
    },
    adress: {
        type: boolean,
    },
    interrestedAbout: {
        type: boolean,
    }
}

export const CompanyInformationContext = createContext<companyInformationsParams | undefined>(undefined);