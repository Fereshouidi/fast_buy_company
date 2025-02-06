'use client';

import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { CSSProperties, useContext } from "react";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { purchaseParams } from "@/app/contexts/purchaseData";
import { CustomerDataParams } from "@/app/contexts/customerData";
import { buyingDataParams } from "../productDetail";

type params = {
    buyingData: buyingDataParams | undefined
}
// type buyingDataParams = {
//     customer: CustomerDataParams | undefined, 
//     quantity: number, 
//     lastBuyingDate: Date
// }
const Item = ({buyingData}: params) => {
    
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const companyInformation = useContext(CompanyInformationContext);

    console.log(buyingData);
    

    const getDuration = (time: Date) => {
        
        const date = new Date(time);
        const now = new Date();
        const diff = now.getTime() - date.getTime();        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);
        if (years > 0) return `${years} ${activeLanguage?.time.yearW}`;
        if (months > 0) return `${months} ${activeLanguage?.time.monthW}`;
        if (days > 0) return `${days} ${activeLanguage?.time.dayW}`;
        if (hours > 0) return `${hours} ${activeLanguage?.time.hourW}`;
        return `${Math.floor(diff / (1000 * 60))} ${activeLanguage?.time.muniteW}`;
        
    }

    const style: CSSProperties = {
        width: '100%',
        display: 'flex',
    }
    // const style_div_customer_and_rate: CSSProperties = {
    //     width: '100%',
    //     display: 'flex',
    //     alignItems: 'center',
    // }
    const stylerate: CSSProperties = {
        margin: '0 var(--medium-margin)'
    }

    return (
        <div style={style} className="item"> 

            <div className="componnent name">
                <h4>{activeLanguage?.customerW + ' :'}</h4>
                <p>{buyingData?.customer?.userName}</p>
            </div>

            <div className="componnent quantity">
                <h4>{activeLanguage?.quantityW + ' :'}</h4>
                <p>{buyingData?.quantity}</p>
            </div>

            <div className="componnent duration">
                <h4>{activeLanguage?.durationW + ' :'}</h4>
                <p>{getDuration(buyingData?.lastBuyingDate)}</p>
            </div>

        </div>
    )
}
export default Item;