import { CustomerDataParams } from "./customerData";
import { discountCodeParams } from "./discountCode";
import { productParams } from "./productSelectForShowing";
import { purchaseParams } from "./purchaseData";

export interface shoppingCartParams {
    purchases?: purchaseParams[] | undefined;
    customer?: CustomerDataParams | undefined;
    products?: productParams[] | undefined;
    status?: string | null | undefined;
    paymentMethod?: 'paypal' | 'masterCard' | 'cash' | undefined;
    totalPrice?: number,
    shippingCost?: number,
    discountCode?: discountCodeParams | undefined,

}
