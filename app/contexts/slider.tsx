import { nameParams } from "./companyInformation";
import { productParams } from "./productSelectForShowing";

export interface sliderDataParams {
    _id?: string;
    tittle?: nameParams;
    products?: productParams[];
    changingTime?: number;
};