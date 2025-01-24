import { createContext } from "react"
import { productParams } from "./productSelectForShowing"

export interface CustomerDataParams {
    _id: string,
    userName: string | undefined,
    email: string,
    phone: number | undefined,
    dateOfBirth: Date | undefined,
    adress: string | undefined,
    interrestedAbout: string,
    password: string,
    retypePassword: string,
    saveAccount: boolean,
    token: number | undefined,
    verification: boolean,
    ShoppingCart: shoppingCart
    favorite: productParams[] | undefined
}

export interface shoppingCart {
    _id: string,
    customer: string,
    products: string[],
    purchases: string[]
}



export const CustomerDataContext = createContext<CustomerDataParams | undefined>(undefined)