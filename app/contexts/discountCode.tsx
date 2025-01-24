export interface discountCodeParams {
    _id: string | undefined,
    code?: string,
    target?: ['shoppingCart'?, 'product'?, 'categorie'?],
    categorie?: string | null,
    product?: string | null,
    shoppingCart?: string | null,
    discountPercent?: number | null,
    discount?: number | null
}


