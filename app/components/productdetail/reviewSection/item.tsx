'use client';

import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { CSSProperties, useContext } from "react";
import ReactStars from "react-stars";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { reviewParams } from "@/app/contexts/reviews";

type params = {
    review: reviewParams | undefined
}
const Item = ({review}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const companyInformation = useContext(CompanyInformationContext);

    const style: CSSProperties = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    }
    const style_div_customer_and_rate: CSSProperties = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    }
    const stylerate: CSSProperties = {
        margin: '0 var(--medium-margin)'
    }
    const styleNote: CSSProperties = {
        fontSize: 'calc(var(--primary-size) /1.2)',
        padding: 'var(--medium-padding) 0',
        marginLeft: activeLanguage?.language == "arabic" ? '' : 'var(--large-margin)'
    }
    return (
        <div style={style}> 
            <div style={style_div_customer_and_rate}>

                <h5 >{review?.customer?.userName}</h5>

                <div style={stylerate}>
                    <ReactStars
                        count={5}
                        size={20} 
                        value={review?.customerRating}
                        edit={false} 
                        color2={`${companyInformation?.primaryColor}`} 
                        className='react-stars'
                    />
                </div>

            </div>

            <p style={styleNote}>{review?.customerNote}</p>
        </div>
    )
}
export default Item;