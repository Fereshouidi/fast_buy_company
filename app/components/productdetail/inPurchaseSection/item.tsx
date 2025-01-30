'use client';

import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { CSSProperties, useContext } from "react";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { purchaseParams } from "@/app/contexts/purchaseData";

type params = {
    purchase: purchaseParams | undefined
}
const Item = ({purchase}: params) => {
    
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const companyInformation = useContext(CompanyInformationContext);


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
                <p>{purchase?.buyer?.userName}</p>
            </div>

            <div className="componnent quantity">
                <h4>{activeLanguage?.quantityW + ' :'}</h4>
                <p>{purchase?.quantity}</p>
            </div>

            <div className="componnent duration">
                <h4>{activeLanguage?.durationW + ' :'}</h4>
                <p>{getDuration(purchase?.createdAt)}</p>
            </div>

        </div>
    )
}
export default Item;