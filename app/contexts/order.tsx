import { CustomerDataParams } from "./customerData"
import { discountCodeParams } from "./discountCode"
import { productParams } from "./productSelectForShowing"
import { purchaseParams } from "./purchaseData"

export interface OrderParams {
    _id: string | undefined
    customer: CustomerDataParams | undefined
    products: productParams[] | undefined
    purchases: purchaseParams[]
    status?: 'cart'| 'processing'| 'packaged'| 'shipped'| 'delivered'| 'canceled'| 'failed'|'Being returned'| 'returned'| 'out_of_stock'| 'ready_for_pickup' | undefined;
    note: string | undefined,
    paymentMethod?: 'paypal' | 'masterCard' | 'cash' | undefined;
    totalPrice?: number,
    shippingCost?: number,
    discountCode?: discountCodeParams | undefined,
    createdAt: Date 
}
