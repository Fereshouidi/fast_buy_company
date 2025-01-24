import { CustomerDataParams } from "./customerData"
import { productParams } from "./productSelectForShowing"

export interface reviewParams {
    _id?: string | undefined
    customer: CustomerDataParams | undefined,
    product: productParams | undefined,
    customerRating: number | undefined
    customerNote: string | undefined
}