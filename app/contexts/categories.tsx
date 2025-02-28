import { discountCodeParams } from "./discountCode";


export type CategorieParams = {
    _id?: string,
    name?: LanguageParams,
    parentCategorie?: string,
    childrenCategories?: CategorieParams[],
    childOpen?: boolean,
    margin?: number
    discountCode?: discountCodeParams
};

type LanguageParams = {
    english: string,
    arabic: string
}