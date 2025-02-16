import { createContext } from "react"
import { productParams } from "./productSelectForShowing"
import { purchaseParams } from "./purchaseData"
import { OrderParams } from "./order"

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
    historique: OrderParams[]
}

export interface shoppingCart {
    _id: string,
    customer: CustomerDataParams,
    products: productParams[],
    purchases: purchaseParams[]
}



export const CustomerDataContext = createContext<CustomerDataParams | undefined>(undefined)